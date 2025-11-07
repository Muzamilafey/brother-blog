// backend/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // Protect routes
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// ----------------------
// Email Transporter
// ----------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ----------------------
// REGISTER
// ----------------------
router.post("/register", async (req, res) => {
  const { email, password, username, isAdmin } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ 
      email, 
      passwordHash, 
      username: username || email.split('@')[0], // Use email username as default if no username provided
      isAdmin: !!isAdmin 
    });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------
// LOGIN
// ----------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // For admin login, check against environment variables
    if (user.isAdmin) {
      if (email !== process.env.ADMIN_EMAIL) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // For admin, we'll hash the environment password and compare
      const adminPasswordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const isMatch = await bcrypt.compare(password, adminPasswordHash);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
    } else {
      // For non-admin users, check against stored password hash
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------
// CHANGE PASSWORD (Admin Only)
// ----------------------
router.put("/admin/change-password", verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.isAdmin) return res.status(403).json({ message: "Access denied" });

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// ----------------------
// FORGOT PASSWORD
// ----------------------
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    const tempPassword = Math.random().toString(36).slice(-8);
    user.passwordHash = await bcrypt.hash(tempPassword, 10);
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `Hello ${user.username},\n\nYour temporary password is: ${tempPassword}\n\nPlease login and change it.`,
    });

    res.json({ message: "Temporary password sent to your email" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

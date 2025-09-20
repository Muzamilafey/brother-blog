import express from "express";
import crypto from "crypto";
import Admin from "../models/User.js"; // your admin schema
import sendEmail from "../utils/sendEmail.js"; // a helper to send emails

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.json({ message: "Email not found" });

  // Generate a reset token
  const token = crypto.randomBytes(20).toString("hex");
  admin.resetPasswordToken = token;
  admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await admin.save();

  const resetUrl = `http://localhost:3000/reset-password/${token}`;
  await sendEmail(admin.email, "Reset Your Password", `Click: ${resetUrl}`);

  res.json({ message: "Password reset link sent to your email." });
});

export default router;

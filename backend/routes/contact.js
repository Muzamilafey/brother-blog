import express, { text } from "express";
import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    // Save to DB
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Send email to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Muzamilafey Blog E-mail Systemm Received Message from ${name}`,
      text: `This email is sent from Muzamilafey Blog System\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

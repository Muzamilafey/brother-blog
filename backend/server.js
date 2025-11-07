// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();

// ✅ Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/contact", contactRoutes);

// ✅ Serve frontend (React build)
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// MongoDB connection + start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });

    // Handle server 'error' events (e.g., EADDRINUSE)
    server.on("error", (err) => {
      if (err && err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} already in use. Exiting.`);
        // Exit with non-zero code so process managers detect failure
        process.exit(1);
      }
      console.error("❌ Server error:", err);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Graceful logging for uncaught exceptions / unhandled rejections
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
  process.exit(1);
});

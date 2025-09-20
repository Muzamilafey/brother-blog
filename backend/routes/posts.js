// backend/routes/posts.js
import express from "express";
import multer from "multer";
import Post from "../models/Post.js";
import path from "path";

const router = express.Router();

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ publishedDate: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ CREATE post (with image)
router.post("/", upload.single("coverImage"), async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = new Post({
      title,
      content,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      coverImage: req.file ? `/uploads/${req.file.filename}` : null, // ✅ store path
      publishedDate: new Date(),
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ UPDATE post (with image)
router.put("/:id", upload.single("coverImage"), async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const updated = {
      title,
      content,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
    };
    if (req.file) updated.coverImage = `/uploads/${req.file.filename}`; // ✅ store path

    const post = await Post.findByIdAndUpdate(req.params.id, updated, {
      new: true,
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ DELETE post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

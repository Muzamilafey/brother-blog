// backend/models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String }, // ✅ unified field name
  tags: [String],
  publishedDate: { type: Date, default: Date.now },
});

export default mongoose.model("Post", postSchema);

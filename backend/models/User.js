// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: false }, // Make username optional
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, // hashed password
  isAdmin: { type: Boolean, default: false }, // add this to identify admins
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);

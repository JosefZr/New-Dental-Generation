import mongoose from "mongoose";
const { Schema } = mongoose;

export const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["text", "image", "video", "file"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  file: {
    type: String, // URL to the file, if a file is sent
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

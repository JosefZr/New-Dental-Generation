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
  images: [{
    type: String,
    required : false
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

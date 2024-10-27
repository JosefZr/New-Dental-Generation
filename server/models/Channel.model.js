import mongoose from "mongoose";
import { MessageSchema } from "./ChannelMessages.model.js";

const { Schema } = mongoose;

const ChannelSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    enum: ["channel", "room"],
    required: true,
  },
  locked: {
    type: Boolean,
    default: false,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [MessageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Channel", ChannelSchema);

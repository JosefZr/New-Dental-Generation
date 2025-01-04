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
    enum: ["channel", "room", "control","algeria","russia"],
    required: true,
  },
  locked: {
    type: Boolean,
    default: false,
  },
  allowedUsers: {
    type: String,
    enum: ["lab", "store", "dentist", "ADMD","all"],
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  picture: {
    type: String, // URL to the picture, if a picture is sent
  },
  messages: [MessageSchema],
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Channel", ChannelSchema);

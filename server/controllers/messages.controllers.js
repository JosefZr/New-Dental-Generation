import expressAsyncHandler from "express-async-handler";
import { successResponse } from "../utils/Response.js";
import {
  getMessages,
  getMissedMessages,
  getChats,
} from "../services/privateMessages.services.js";

export const getChatHistory = expressAsyncHandler(async (req, res) => {
  const { userId, page } = req.params;
  const userSender = req.user._id;

  const messages = await getMessages(userSender, userId, page);
  successResponse(res, messages, "chat history successfully retrieved");
});

// Get unread messages for a user
export const getUnreadMessages = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const unreadMessages = await getMissedMessages(userId);
  successResponse(
    res,
    unreadMessages,
    "unread messages successfully retrieved"
  );
});

// Get All chat messages for a user
export const getAllChatMessages = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const allChats = await getChats(userId);
  successResponse(res, allChats, "all private chats successfully retrieved");
});


export const storePrivateMessageImages = expressAsyncHandler((req, res) => {

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded." });
    }

    // Generate full URLs for each file
    const uploadedFiles = req.files.map((file) => ( `http://localhost:3000/uploads/privateChats/${file.filename}`));

    // Send response maintaining the original order
    res.status(200).json({
      message: "Images uploaded successfully.",
      files: uploadedFiles,
    });
});
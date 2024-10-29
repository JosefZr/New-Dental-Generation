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

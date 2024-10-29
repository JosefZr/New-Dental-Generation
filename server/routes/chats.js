import express from "express";
import {
  getChatHistory,
  getUnreadMessages,
  getAllChatMessages,
} from "../controllers/messages.controllers.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();
router.use(authenticateToken);
// Route to get chat history between two users
router.get("/history/:userId/:page", getChatHistory);

// Route to get unread messages for the authenticated user
router.get("/unread", getUnreadMessages);

// Route to get all chat messages for the authenticated user
router.get("/all", getAllChatMessages);

export default router;

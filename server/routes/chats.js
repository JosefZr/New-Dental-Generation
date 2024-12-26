import express from "express";
import {
  getChatHistory,
  getUnreadMessages,
  getAllChatMessages,
  storePrivateMessageImages
} from "../controllers/messages.controllers.js";
import { authenticateToken } from "../middlewares/auth.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/privateChats"); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG and PNG are allowed."));
    }
  },
});


const router = express.Router();
router.use(authenticateToken);
// Route to get chat history between two users
router.get("/history/:userId/:page", getChatHistory);

router.post("/storeMessageImages", upload.array("images", 5)  , storePrivateMessageImages);

// Route to get unread messages for the authenticated user
router.get("/unread", getUnreadMessages);

// Route to get all chat messages for the authenticated user
router.get("/all", getAllChatMessages);

export default router;

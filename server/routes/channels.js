import express from "express";
import * as ChannelController from "../controllers/channels.controllers.js";
import { authenticateToken } from "../middlewares/auth.js";
import { authorizedRoles } from "../middlewares/role.js";
import multer from "multer";
const router = express.Router();
import ChannelModel from "../models/Channel.model.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/channelsChat"); 
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


router.use(authenticateToken);
router.patch("/pin", async (req, res) => {
  const { locked, channel } = req.body;

  if (!channel) {
    return res.status(400).json({ message: "Channel is required" });
  } else if (locked === undefined) {
    return res.status(400).json({ message: "isPinned is required" });
  }

  try {
    // Assuming you have a Channel model to update the pin status
    const updatedChannel = await ChannelModel.findByIdAndUpdate(
      channel,
      { locked },
      { new: true } // Return the updated document
    );

    if (!updatedChannel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    return res.status(201).json({ message: "Channel pin status updated", updatedChannel });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});


router.get("/:id", ChannelController.getChannelById); // Get a specific channel by ID
router.get("/", ChannelController.getAllChannels); // Get all channels

router.post("/storeMessageImages", upload.array("images", 5) ,ChannelController.storeMessageImages)

router.put(
  "/:id",
  // authorizedRoles("admin", "moderator"),
  ChannelController.updateChannel
)
router.patch(
  "/:id/lock",
  authorizedRoles("admin", "moderator"),
  ChannelController.lockChannel
); // Lock/unlock channel

router.post("/",
  //  authorizedRoles("admin"),
    ChannelController.createChannel
  ); // Create a new channel

router.delete(
  "/:id",
  // authorizedRoles("admin"),
  ChannelController.deleteChannel
); // Delete a channel

router.patch("/:id/join", ChannelController.joinChannel); // Join a channel

export default router;

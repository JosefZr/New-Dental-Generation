import express from "express";
import * as ChannelController from "../controllers/channels.controllers.js";

const router = express.Router();

// TODO: middlewares (admin and moderators)

router.post("/", ChannelController.createChannel); // Create a new channel
router.put("/:id", ChannelController.updateChannel); // Update channel name and description
router.patch("/:id/lock", ChannelController.lockChannel); // Lock or unlock a channel
router.delete("/:id", ChannelController.deleteChannel); // Delete a channel
// router.get("/:id", ChannelController.getChannelById); // Get a specific channel by ID
router.get("/", ChannelController.getAllChannels); // Get all channels

export default router;

import express from "express";
import * as ChannelController from "../controllers/channels.controllers.js";
import { authenticateToken } from "../middlewares/auth.js";
import { authorizedRoles } from "../middlewares/role.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/:id", ChannelController.getChannelById); // Get a specific channel by ID
router.get("/", ChannelController.getAllChannels); // Get all channels

router.put(
  "/:id",
  authorizedRoles("admin", "moderator"),
  ChannelController.updateChannel
); // Update channel
router.patch(
  "/:id/lock",
  authorizedRoles("admin", "moderator"),
  ChannelController.lockChannel
); // Lock/unlock channel

router.post("/", authorizedRoles("admin"), ChannelController.createChannel); // Create a new channel
router.delete(
  "/:id",
  authorizedRoles("admin"),
  ChannelController.deleteChannel
); // Delete a channel

export default router;

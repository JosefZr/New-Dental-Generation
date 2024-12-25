import express from "express";
import * as ChannelController from "../controllers/channels.controllers.js";
import { authenticateToken } from "../middlewares/auth.js";
import { authorizedRoles } from "../middlewares/role.js";
import multer from "multer";
const router = express.Router();


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

router.get("/:id", ChannelController.getChannelById); // Get a specific channel by ID
router.get("/", ChannelController.getAllChannels); // Get all channels

router.post("/storeMessageImages", upload.array("images", 5) ,ChannelController.storeMessageImages)

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

router.patch("/:id/join", ChannelController.joinChannel); // Join a channel

export default router;

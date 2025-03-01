import expressAsyncHandler from "express-async-handler";
import ChannelService from "../services/channels.services.js";
import { successResponse } from "../utils/Response.js";
import { ApiError } from "../utils/ApiError.js";

// Create a new channel
export const createChannel = expressAsyncHandler(async (req, res) => {
  console.log(req.body)
  const newChannel = await ChannelService.createChannel(req.body);
  successResponse(res, newChannel, "Channel created successfully", 201);
});

// Update channel name and description
export const updateChannel = expressAsyncHandler(async (req, res) => {
  const updatedChannel = await ChannelService.updateChannel(
    req.params.id,
    req.body
  );
  if (!updatedChannel) {
    throw new ApiError("Channel not found", 404);
  }
  successResponse(res, updatedChannel, "Channel updated successfully");
});

// Lock or unlock a channel
export const lockChannel = expressAsyncHandler(async (req, res) => {
  const lockStatus = req.body.locked; // true or false
  const updatedChannel = await ChannelService.lockChannel(
    req.params.id,
    lockStatus
  );
  if (!updatedChannel) {
    throw new ApiError("Channel not found", 404);
  }
  successResponse(
    res,
    updatedChannel,
    "Channel lock status updated successfully"
  );
});

// Delete a channel
export const deleteChannel = expressAsyncHandler(async (req, res) => {
  const result = await ChannelService.deleteChannel(req.params.id);
  if (!result) {
    throw new ApiError("Channel not found", 404);
  }
  successResponse(res, null, "Channel deleted successfully", 204); // No content, just a message
});

//Get a single channel by ID
export const getChannelById = expressAsyncHandler(async (req, res) => {
  const channel = await ChannelService.getChannelById(
    req.params.id,
    req.query.page,
    req.body.limit
  );
  if (!channel) {
    throw new ApiError("Channel not found", 404);
  }
  successResponse(res, channel, "Channel retrieved successfully");
});

// Get all channels
export const getAllChannels = expressAsyncHandler(async (req, res) => {
  const { type } = req.query;
  const channels = await ChannelService.getAllChannels(type);
  successResponse(res, channels, "Channels retrieved successfully");
});

// Join a channel by the user
export const joinChannel = expressAsyncHandler(async (req, res) => {
  const channelId = req.params.id;
  const updatedChannel = await ChannelService.joinChannel(
    req.user._id,
    channelId
  );
  successResponse(res, updatedChannel, "User joined the channel successfully");
});



export const storeMessageImages = expressAsyncHandler((req, res) => {

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded." });
    }

    // Generate full URLs for each file
    const uploadedFiles = req.files.map((file) => ( `${process.env.SERVER_URL}/uploads/channelsChat/${file.filename}`));

    // Send response maintaining the original order
    res.status(200).json({
      message: "Images uploaded successfully.",
      files: uploadedFiles,
    });
});

//================================ THIS SERVICES USED ONLY BY THE ADMIN OR ITS MODERATORS =================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import Channel from "../models/Channel.model.js";
import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";

class ChannelService {
  // Create a new channel
  async createChannel(data) {
    const { title, description, type, locked = false, allowed } = data;
    const newChannel = new Channel({
      title,
      description,
      type,
      locked,
      allowedUsers: allowed,
    });
    return await newChannel.save();
  }

  // Update channel name and description
  async updateChannel(channelId, data) {
    const { title, description } = data;
    return await Channel.findByIdAndUpdate(
      channelId,
      { title, description },
      { new: true }
    );
  }

  // Lock or unlock a channel
  async lockChannel(channelId, lockStatus) {
    return await Channel.findByIdAndUpdate(
      channelId,
      { locked: lockStatus },
      { new: true }
    );
  }

  // Delete a channel
  async deleteChannel(channelId) {
    return await Channel.findByIdAndDelete(channelId);
  }

  //===================================================================================//
  //////////////////////////////////////////////////////////////////////////////////////

  // Get a single channel by ID with pagination for messages
  async getChannelById(channelId, page = 1, limit = 100) {
    const skip = (page - 1) * limit; // Calculate how many messages to skip

    const channel = await Channel.findById(channelId)
      .select("title description type locked createdAt") // Select other channel fields as necessary
      .populate({
        path: "messages",
        options: {
          sort: { createdAt: -1 }, // Sort messages by createdAt in descending order
          limit: limit, // Limit to the specified number of messages
          skip: skip, // Skip the messages for pagination
        },
        populate: {
          path: "sender", // Populate the sender field in messages
          model: "User",
        },
      })
      .exec();

    if (!channel) {
      return null; // Channel not found
    }

    // Format messages to include necessary details
    const messagesWithSenderInfo = channel.messages.map((message) => ({
      _id: message._id,
      type: message.type,
      content: message.content,
      file: message.file,
      createdAt: message.createdAt,
      sender: message.sender, // This will now include all data about the sender
    }));

    // Return the channel with formatted messages
    return {
      channelId: channel._id,
      title: channel.title,
      description: channel.description,
      type: channel.type,
      locked: channel.locked,
      createdAt: channel.createdAt,
      messages: messagesWithSenderInfo,
      currentPage: page,
      totalMessages: channel.messages.length,
    };
  }

  // Get all channels
  async getAllChannels() {
    const channels = await Channel.find({})
      .select("title description type locked createdAt updatedAt messages")
      .exec();

    // Map through the channels to structure the data as required
    return channels.map((channel) => {
      // Extract the last message by getting the last element of the `messages` array
      const lastMessage = channel.messages[channel.messages.length - 1] || null;

      return {
        _id: channel._id,
        title: channel.title,
        description: channel.description,
        type: channel.type,
        locked: channel.locked,
        createdAt: channel.createdAt,
        updatedAt: channel.updatedAt,
        lastMessage: lastMessage
          ? {
              content: lastMessage.content,
              sender: lastMessage.sender,
              type: lastMessage.type,
              createdAt: lastMessage.createdAt,
            }
          : null,
      };
    });
  }

  // Join a channel
  async joinChannel(userId, channelId) {
    const user = await User.findById(userId);
    const channel = await Channel.findById(channelId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    if (!channel) {
      throw new ApiError("Channel not found", 404);
    }

    // Check if the user type matches the channel type
    if (
      channel.allowedUsers !== user.role &&
      user.role !== "admin" &&
      user.role !== "moderator"
    ) {
      throw new ApiError("User type does not match channel type", 403);
    }

    // Check if the user is already a member
    if (channel.members.includes(userId)) {
      throw new ApiError("User is already a member of this channel", 400);
    }

    // Add user to channel members
    channel.members.push(userId);
    await channel.save();

    return channel;
  }
}

export async function saveChannelMessage(senderId, channelId, content, type) {
  const channel = await Channel.findById(channelId);
  if (!channel) {
    throw new Error("Channel not found");
  }

  // Create the message object
  const message = {
    sender: senderId,
    type,
    content,
    createdAt: new Date(),
  };

  // Add the message to the channel's messages array
  channel.messages.push(message);
  await channel.save();

  return message;
}

export default new ChannelService();

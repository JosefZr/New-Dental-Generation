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
  async getChannelById(channelId, page = 1, limit = 30) {
    const skip = (page - 1) * limit;

    const channel = await Channel.findById(channelId).select(
      "title description type owner locked createdAt messages"
    );

    if (!channel) return null;

    // Manually paginate messages
    const totalMessages = channel.messages.length;
    const paginatedMessages = channel.messages
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(skip, skip + limit)
      .sort((a, b) => a.createdAt - b.createdAt);

    // Format messages
    const messagesWithSenderInfo = await Promise.all(
      paginatedMessages.map(async (message) => {
        const sender = await User.findById(message.sender); // Manually populate sender
        return {
          ...message.toObject(),
          sender, // Add sender info
        };
      })
    );

    return {
      channelId: channel._id,
      title: channel.title,
      description: channel.description,
      type: channel.type,
      locked: channel.locked,
      owner:channel.owner,
      createdAt: channel.createdAt,
      messages: messagesWithSenderInfo,
      currentPage: page,
      totalMessages,
    };
  }

  // Get all channels
  async getAllChannels(chanType) {
    if (chanType === "control") {
      const controlChannel = await Channel.find({ where: { type: "control" } })
        .select(
          "title description type locked createdAt allowedUsers updatedAt messages"
        )
        .populate("owner", "name email") // Populate owner
        .exec();
      return {
        _id: controlChannel._id,
        title: controlChannel.title,
        description: controlChannel.description,
        type: controlChannel.type,
        owner:controlChannel.owner,
        locked: controlChannel.locked,
        createdAt: controlChannel.createdAt,
        updatedAt: controlChannel.updatedAt,
        allowedUsers: controlChannel.allowedUsers,
      };
    }
    const channels = await Channel.find({})
      .select(
        "title description type locked createdAt allowedUsers updatedAt messages"
      )
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
        owner:channel.owner,
        locked: channel.locked,

        createdAt: channel.createdAt,
        updatedAt: channel.updatedAt,
        allowedUsers: channel.allowedUsers,
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

  const sender = await User.findById(senderId);

  // Add the message to the channel's messages array
  channel.messages.push(message);
  await channel.save();

  const { password, ...senderNoPass } = sender._doc;
  message.sender = senderNoPass;

  return message;
}

export default new ChannelService();

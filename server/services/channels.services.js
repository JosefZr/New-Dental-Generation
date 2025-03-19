//================================ THIS SERVICES USED ONLY BY THE ADMIN OR ITS MODERATORS =================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import mongoose from "mongoose";
import Channel from "../models/Channel.model.js";
import Message from "../models/Message.js";
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
    const { title } = data;
    return await Channel.findByIdAndUpdate(
      channelId,
      { title },
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

    console.log(channel);

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
        "title description type locked owner createdAt allowedUsers updatedAt messages"
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

export async function saveChannelMessage(senderId, channelId, content, type, images) {
  console.log(senderId,channelId, content , type , images)
  console.log("1")
  const channel = await Channel.findById(channelId);
  if (!channel) {
    throw new Error("Channel not found");
  }
  console.log("2")

  // Create the message object
  const message = {
    sender: senderId,
    type,
    content,
    images,
    createdAt: new Date(),
  };
  console.log("3")

  const sender = await User.findById(senderId);
  console.log("4")

  // Add the message to the channel's messages array
  channel.messages.push(message);
  await channel.save();
  console.log("5")

  const { password, ...senderNoPass } = sender._doc;
  message.sender = senderNoPass;

  return message;
}
// channels.services.js
import { deleteMessageImages } from '../utils/fileUtils.js';

export async function deleteMessage(sender,content, createdAt, channelId) {
  const channel = await Channel.findById(channelId);
  if (!channel) throw new Error("Channel not found");

  
console.log("aaa")
  if (sender && channel.type === "journey") {
    console.log("aaa 1")
    const user = await User.findById(sender)
    if (!user) throw new Error("User not found");
    console.log("aaa 2")
    // Verify message exists in journey before deletion
   // 1. Compare string representations of IDs
   const channelIdStr = channelId.toString();
   const userIdStr = sender.toString(); // Assuming sender is the user ID string

   const journeyEntry = user.journey.find(entry => 
    entry.chanId.toString() === channelIdStr && 
    entry.content.trim() === content.trim()
  );
    console.log("aaa 3")
    if (!journeyEntry) {
      console.log("Journey entries:", user.journey);
      throw new Error("Journey entry not found for message");
    }
    console.log("aaa 4")
   
    await User.updateOne(
      { _id: userIdStr },
      { $pull: { 
        journey: { 
          chanId: new mongoose.Types.ObjectId(channelIdStr),
          content: content.trim()
        } 
      }},
    );
  }

    // Compare dates without milliseconds
    const targetDate = new Date(createdAt);
    const targetTime = targetDate.setMilliseconds(0);

    const messageIndex = channel.messages.findIndex(msg => {
      const msgTime = new Date(msg.createdAt).setMilliseconds(0);
      return msg.content === content && msgTime === targetTime;
    });

    if (messageIndex === -1) {
      console.log("Actual messages:", channel.messages.map(m => ({
        content: m.content,
        createdAt: m.createdAt.toISOString()
      })));
      return socket.emit("error", { message: "Message not found." });
    }  
    const deletedMessage = channel.messages[messageIndex];
  
  try {
    // Delete associated images first
    await deleteMessageImages(deletedMessage.images);
    
    // Remove message from channel
    channel.messages.splice(messageIndex, 1);
    await channel.save();
    
    return deletedMessage;
  } catch (error) {
    // Rollback message deletion if image deletion fails
    channel.messages.splice(messageIndex, 0, deletedMessage);
    await channel.save();
    throw error;
  }
}
export default new ChannelService();

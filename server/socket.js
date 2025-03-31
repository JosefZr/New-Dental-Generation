import { Server } from "socket.io";
import {
  saveMessage,
  getMissedMessages,
  deletePrivateMessage,
} from "./services/privateMessages.services.js";
import logger from "./utils/logger.js";
import { authenticateSocket } from "./middlewares/socket.auth.js";
import Channel from "./models/Channel.model.js";
import { deleteMessage, saveChannelMessage } from "./services/channels.services.js";
import Message from "./models/Message.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin:  ["http://localhost:5173","http://localhost:80","http://165.227.148.145","http://165.227.148.145:80","https://buildydn.com","https://buildydn.com:80","https://buildydn.com:3000"],
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
	allowEIO3:true,
  });

  io.on('connect_error', (error) => {
     console.error('Socket.IO server error:', error);
  });
  // Apply authentication middleware
  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    socket.on("joinRoom", async ({ recipientId }) => {
      try {
        const roomId = [socket.user.userId, recipientId].sort().join("_");
        socket.join(roomId);

        logger.info("joined");
        logger.info(socket.id);

        const missedMessages = await getMissedMessages(socket.user.userId);
        const updatePromises = missedMessages.map(async (message) => {
          message.status = "read";
          return message.save();
        });
        await Promise.all(updatePromises);
      } catch (error) {
        logger.error(`Error joining room: ${error.message}`);
        socket.emit("error", { message: "Failed to join room." });
      }
    });

    socket.on("privateMessage", async ({ recipient, content, images }) => {
      const roomId = [socket.user.userId, recipient].sort().join("_");
      console.log("pppp",recipient, content, images)
      // Check if the recipient is currently in the room
      const isRecipientInRoom = io.sockets.adapter.rooms.get(roomId)?.size > 1;
      logger.info("sockets in the room ! :");
      logger.info(io.sockets.adapter.rooms.get(roomId)?.size);
      console.log("pppp1")

      // Save the message to the database with appropriate status
      const message = await saveMessage(
        socket.user.userId,
        recipient,
        content,
        images, 
        isRecipientInRoom ? "read" : "sent"
      );
      console.log("pppp5")

      // Emit the message to both sender and recipient
      io.to(roomId).emit("message", message);
    });
    socket.on("updatePrivateMessage", async ({ originalContent, originalDate, newContent, senderId }) => {
      try {
        // 1. Find the private message directly
        const message = await Message.findOne({ 
          content: originalContent,
          createdAt: originalDate,
          sender: senderId 
        });
        
        if (!message) {
          throw new Error("Private message not found");
        }
    
        // 2. Update message content
        message.content = newContent;
        message.updatedAt = new Date();
        await message.save();
    
        // 3. Get room ID for participants
        const roomId = [message.sender.toString(), message.recipient.toString()]
          .sort()
          .join("_");
    
        // 4. Emit update to both participants
        io.to(roomId).emit("PrivateMessageUpdated", {
          messageId: message._id,
          newContent: message.content,
          updatedAt: message.updatedAt
        });
    
      } catch (error) {
        console.error("Error updating private message:", error);
        socket.emit("error", { 
          message: "Failed to update private message",
          details: error.message 
        });
      }
    });
    // Add to your existing socket initialization
    socket.on("deletePrivateMessage", async ({ content, createdAt, senderId }, callback) => {
      console.log(content, createdAt, senderId);
      try {
        const deletionResult = await deletePrivateMessage(content, createdAt, senderId);
        
        // Convert sender and recipient to strings and construct roomId
        const roomId = [deletionResult.sender.toString(), deletionResult.recipient.toString()]
          .sort()
          .join("_");

        // Convert _id to string to match client side ids
        const messageId = deletionResult._id.toString();
        console.log("sjsqjq", messageId);
        
        io.to(roomId).emit("privateMessageDeleted", { 
          messageId 
        });

        callback({ success: true });
      } catch (error) {
        logger.error(`Error deleting private message: ${error.message}`);
        callback({ success: false, error: error.message });
      }
    });
    // Join a specific group channel
    socket.on("joinGroup", async (channelId) => {
      const channel = await Channel.findById(channelId);
      if (!channel) return socket.emit("error", "Channel not found");

      socket.join(channelId);
      socket.emit("joinedGroup", `Joined group ${channel.title}`);
    });
    // Send a message to a specific channel
    socket.on("channelMessage", async ({ channelId, content, type, images }) => {
      try {
        console.log(channelId, content , type , images)
        console.log("test 1")
        const channel = await Channel.findById(channelId);
        if (!channel) {
          return socket.emit("error", { message: "Channel not found." });
        }
        console.log("test 2")

        // Save the message to the database
        const channelMessage = await saveChannelMessage(
          socket.user.userId,
          channel._id,
          content,
          type , 
          images
        );
        console.log("test 3")

        // Emit the message to all members in the channel
        io.to(channelId).emit("channelMessage", {
          ...channelMessage,
          channelId: channelId,
        });
      } catch (error) {
        logger.error(`Error sending channel message: ${error.message}`);
        socket.emit("error", { message: "Failed to send message." });
      }
    });
    socket.on("deleteMessage", async ({sender, content, createdAt, channelId }) => {
      console.log("socket",sender,content, createdAt, channelId)
      try {
        const channel = await Channel.findById(channelId);
        if (!channel) {
          return socket.emit("error", { message: "Channel not found." });
        }
        try {
          // This will throw if image deletion fails
          const deletedMessage = await deleteMessage(sender,content, createdAt, channelId);
          io.to(channelId).emit("messageDeleted", { 
            content: deletedMessage.content,
            createdAt: deletedMessage.createdAt,
            channelId 
          });
        } catch (error) {
          logger.error(`Error deleting message: ${error.message}`);
          return socket.emit("error", { message: error.message });
        }
      } catch (error) {
        logger.error(`Error deleting message: ${error.message}`);
        socket.emit("error", { message: "Failed to delete message." });
      }
    });
    
    socket.on("updateMessage", async (data) => {
      try {
        // 1. Find the channel first
        const channel = await Channel.findById(data.channelId);
        if (!channel) {
          throw new Error("Channel not found");
        }

        // 2. Find the message in the channel's messages array
        const messageIndex = channel.messages.findIndex(msg => 
          msg.content === data.originalContent &&
          msg.createdAt.getTime() === new Date(data.originalDate).getTime()
        );

        if (messageIndex === -1) {
          throw new Error("Message not found in channel");
        }

        // 3. Update the message content
        channel.messages[messageIndex].content = data.newContent;
        channel.messages[messageIndex].updatedAt = new Date();

        // 4. Save the updated channel document
        await channel.save();

        // 5. Broadcast the update to all channel members
        io.to(data.channelId).emit("messageUpdated", {
          originalContent: data.originalContent,
          originalDate: data.originalDate,
          newContent: data.newContent,
          updatedAt: channel.messages[messageIndex].updatedAt
        });

      } catch (error) {
        console.error("Error updating message:", error);
        socket.emit("error", { 
          message: "Failed to update message",
          details: error.message 
        });
      }
    });
    socket.on("disconnect", () => {
      logger.info(`User disconnected: ${socket.user.userId}`);
    });
  });
};


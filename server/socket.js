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

      // Check if the recipient is currently in the room
      const isRecipientInRoom = io.sockets.adapter.rooms.get(roomId)?.size > 1;
      logger.info("sockets in the room ! :");
      logger.info(io.sockets.adapter.rooms.get(roomId)?.size);

      // Save the message to the database with appropriate status
      const message = await saveMessage(
        socket.user.userId,
        recipient,
        content,
        images, 
        isRecipientInRoom ? "read" : "sent"
      );

      // Emit the message to both sender and recipient
      io.to(roomId).emit("message", message);
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

        const channel = await Channel.findById(channelId);
        if (!channel) {
          return socket.emit("error", { message: "Channel not found." });
        }

        // Save the message to the database
        const channelMessage = await saveChannelMessage(
          socket.user.userId,
          channel._id,
          content,
          type , 
          images
        );

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
    socket.on("deleteMessage", async ({ content, createdAt, channelId }) => {
      try {
        const channel = await Channel.findById(channelId);
        if (!channel) {
          return socket.emit("error", { message: "Channel not found." });
        }
    
        const messageIndex = channel.messages.findIndex(msg => 
          msg.content === content && 
          new Date(msg.createdAt).getTime() === new Date(createdAt).getTime()
        );
    
        if (messageIndex === -1) {
          return socket.emit("error", { message: "Message not found." });
        }
    
        const deletedMessage = channel.messages[messageIndex];
        
        try {
          // This will throw if image deletion fails
          await deleteMessage(content, createdAt, channelId);
        } catch (error) {
          logger.error(`Error deleting message: ${error.message}`);
          return socket.emit("error", { message: error.message });
        }
    
        io.to(channelId).emit("messageDeleted", { 
          content: deletedMessage.content,
          createdAt: deletedMessage.createdAt,
          channelId 
        });
    
      } catch (error) {
        logger.error(`Error deleting message: ${error.message}`);
        socket.emit("error", { message: "Failed to delete message." });
      }
    });
    socket.on("disconnect", () => {
      logger.info(`User disconnected: ${socket.user.userId}`);
    });
  });
};


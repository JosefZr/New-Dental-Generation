import { Server } from "socket.io";
import {
  saveMessage,
  getMissedMessages,
} from "./services/privateMessages.services.js";
import logger from "./utils/logger.js";
import { authenticateSocket } from "./middlewares/socket.auth.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, { cors: { origin: "*" } });

  // Apply authentication middleware
  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    logger.info(`User connected: ${socket.user.id}`);

    socket.on("joinRoom", async ({ recipientId }) => {
      try {
        const roomId = [socket.user.id, recipientId].sort().join("_");
        socket.join(roomId);

        const missedMessages = await getMissedMessages(socket.user.id);
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

    socket.on("privateMessage", async ({ recipient, content }) => {
      const roomId = [socket.user.id, recipient].sort().join("_");

      // Check if the recipient is currently in the room
      const isRecipientInRoom = io.sockets.adapter.rooms.get(roomId)?.size > 1;

      // Save the message to the database with appropriate status
      const message = await saveMessage(
        socket.user.id,
        recipient,
        content,
        isRecipientInRoom ? "read" : "sent"
      );

      // Emit the message to both sender and recipient
      io.to(roomId).emit("message", message);
    });

    socket.on("disconnect", () => {
      logger.info(`User disconnected: ${socket.user.id}`);
    });
  });
};

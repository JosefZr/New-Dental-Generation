import express from "express";
import dotenv from "dotenv";
import { connectDB, closeDB } from "./lib/db.js";
import authRoutes from "./routes/auth.js";
import chanRoutes from "./routes/channels.js";
import userRoutes from "./routes/users.js";
import chatRoutes from "./routes/chats.js";
import logger from "./utils/logger.js";
import cors from "cors";
import { ApiError } from "./utils/ApiError.js";
import { initializeSocket } from "./socket.js";
import http from "http";

// Load environment variables
dotenv.config();

// Express app instance
const app = express();

// Parse json
app.use(express.json());

// Enable Corse
app.use(cors()); // Apply CORS middleware

//ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/channels", chanRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/chats", chatRoutes);

// Wrong Api Route handler
app.use((req, res, next) => {
  const error = new Error("API route not found");
  error.status = 404;
  next(error);
});

// Centralized error handler
app.use((err, req, res, next) => {
  if (err instanceof ApiError || err.status === 404) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  logger.error(err.stack); // Log for internal server error
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

(async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });

    // Initialize Socket.IO with the HTTP server
    initializeSocket(server);

    server.keepAliveTimeout = 3000;

    process.on("SIGTERM", () => {
      logger.info("SIGTERM signal received: closing HTTP server");
      server.close(async () => {
        logger.info("HTTP server closed");
        // Close the database connection
        await closeDB();
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error("Failed to start server");
    logger.error(error.stack);
    process.exit(1);
  }
})();

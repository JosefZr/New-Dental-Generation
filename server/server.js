import express from "express";
import dotenv from "dotenv";
import { connectDB, closeDB } from "./lib/db.js";
import authRoutes from "./routes/auth.js";
import logger from "./utils/logger.js";
import cors from "cors";

// Load environment variables
dotenv.config();

// Express app instance
const app = express();

// Parse json
app.use(express.json());

// Enable Corse
app.use(cors()); // Apply CORS middleware

app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });

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
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
})();

import express from "express";
import dotenv from "dotenv";
import { connectDB, closeDB } from "./lib/db.js";
import authRoutes from "./routes/auth.js";
import logger from "./utils/logger.js";
import cors from "cors";
import { ApiError } from "./utils/ApiError.js";

// Load environment variables
dotenv.config();

// Express app instance
const app = express();

// Parse json
app.use(express.json());

// Enable Corse
app.use(cors()); // Apply CORS middleware

app.use("/api/v1/auth", authRoutes);

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

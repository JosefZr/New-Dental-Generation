import express from "express";
import dotenv from "dotenv";
import { connectDB, closeDB } from "./lib/db.js";
import authRoutes from "./routes/auth.js";
import chanRoutes from "./routes/channels.js";
import userRoutes from "./routes/users.js";
import chatRoutes from "./routes/chats.js";
import paymentRoutes from "./routes/payment.js";
import mediaRoutes from "./routes/instructor.js"
import instructorCourseRoute from "./routes/course.js"
import studentCourseRoute from "./routes/studentCourseRoute.js"
import courseProgression from "./routes/CourseProgression.js"
import useruserSignleRoute from "./routes/storeLab.js"
import friendsRoute from "./routes/friends.js"
import tasksRoutes from "./routes/Task.js"
import inventoryRoute from "./routes/inventory.js";
import quoteRoute from "./routes/quotes.js"
import paymentManagmentRoute from "./routes/paymentManagment.js"
import SettingsRoute from "./routes/Settings.js"
import analyseRoute from "./routes/analyse.js"
import JobRoute from "./routes/Job.js"
import IstighfarRoute from "./routes/Istighfar.js"
import rolesRoute from "./routes/roles.js"
import logger from "./utils/logger.js";
import cors from "cors";
import { ApiError } from "./utils/ApiError.js";
import { initializeSocket } from "./socket.js";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Express app instance
const app = express();


// Parse json
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/course", express.static(path.join(__dirname, "course")));


// Enable Corse
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:80","http://165.227.148.145","http://165.227.148.145:80"],   // Allow only this origin
  credentials: true,                 // Allow credentials (cookies, etc.)
  allowedHeaders: [
    "Content-Type", 
    "Authorization", 
    "Access-Control-Allow-Origin"     // Add any other headers your app might use
  ],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods

}));

app.options("*", cors()); // Handle preflight requests for all routes

//ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/channels", chanRoutes);
app.use("/api/v1/channel/single", useruserSignleRoute);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/madia", mediaRoutes);
app.use("/api/v1/instructor/course", instructorCourseRoute);
app.use("/api/v1/student/course", studentCourseRoute);
app.use("/api/v1/student/progression",courseProgression);
app.use("/api/v1/friends",friendsRoute);
app.use("/api/v1/tasks",tasksRoutes);
app.use("/api/v1/inventory",inventoryRoute);
app.use("/api/v1/quoate",quoteRoute);
app.use("/api/v1/payment/managment",paymentManagmentRoute);
app.use("/api/v1/settings",SettingsRoute)
app.use("/api/v1/analyse",analyseRoute)
app.use("/api/v1/job",JobRoute)
app.use("/api/v1/istighfar",IstighfarRoute)
app.use("/api/v1/roles",rolesRoute)

// Wrong Api Route handler
app.use((req, res, next) => {
  const error = new ApiError("API route not found", 404);
  next(error);
});

// Centralized error handler
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      code: err.statusCode,
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

    server.listen(PORT, "0.0.0.0",() => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });

    // Initialize Socket.IO with the HTTP server
    initializeSocket(server);

    server.keepAliveTimeout = 3000;

    process.on('unhandledRejection', (reason, promise) => {
  		console.error('Unhandled Promise Rejection:', reason);
    });

    process.on("uncaughtException", (err) => {
  	console.error("Uncaught Exception:", err);
    });
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

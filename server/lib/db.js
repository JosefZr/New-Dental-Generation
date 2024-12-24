import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URl,{
    });
    logger.info(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    logger.error("Error connecting to MongoDB", error.message);
    process.exit(1);
  }
};

export const closeDB = async () => {
  try {
    await mongoose.connection.close();
    logger.info("Database connection closed");
  } catch (error) {
    logger.info("Database connection closed");
  }
};

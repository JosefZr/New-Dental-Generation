import express from "express";
import { createStoreLabChannel } from "../controllers/storeLab.js";
const router = express.Router();

router.post("/create",createStoreLabChannel); // Create a new channel

export default router;

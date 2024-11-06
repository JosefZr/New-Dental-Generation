import express from "express";
import { makePayment } from "../controllers/payment";
const router = express.Router();


router.post("/create-checkout-session", makePayment);

export default router;
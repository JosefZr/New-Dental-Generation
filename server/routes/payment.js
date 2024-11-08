import express from "express";
import { makePayment, markAsPaid } from "../controllers/payment.js";
const router = express.Router();

router.post("/create-checkout-session", makePayment);
router.post("/validate-subscription", markAsPaid);

export default router;

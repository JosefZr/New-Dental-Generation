import express from "express";
import { makePayment, markAsPaid,updateSubscription } from "../controllers/payment.js";
const router = express.Router();

router.post("/create-checkout-session", makePayment);
router.post("/validate-subscription", markAsPaid);
router.post("/create-subscription-session", updateSubscription);

export default router;

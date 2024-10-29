import express from "express";
import { signup, login, refresh, logout } from "../controllers/auth.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", authenticateToken, logout);
router.get("/test", (req, res) => {
  res.send("Auth route is working!");
});

export default router;

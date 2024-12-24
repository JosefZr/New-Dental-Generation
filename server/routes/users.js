import express from "express";
import * as UserController from "../controllers/users.controllers.js";
import { authenticateToken } from "../middlewares/auth.js";
import { authorizedRoles } from "../middlewares/role.js";

const router = express.Router();
router.use(authenticateToken);

//===================== ADMIN OR MODERATOR ONLY =====================//
//////////////////////////////////////////////////////////////////////
// Grant moderator role to a user
router.patch(
  "/:id/grant-moderator",
  authorizedRoles("admin"),
  UserController.grantModerator
);

// Ban a user
router.patch(
  "/:id/ban",
  authorizedRoles("admin", "moderator"),
  UserController.banUser
);

// Set trial duration for a user
router.patch(
  "/:id/set-trial-duration",
  authorizedRoles("admin"),
  UserController.setTrialDuration
);

//========================= ADMIN ONLY =============================//
// Grant a free subscription to a user
router.patch(
  "/:id/grant-free-subscription",
  authorizedRoles("admin"),
  UserController.grantFreeSubscription
);

//======================== USER ACTIONS ============================//
// Block another user
router.patch("/:id/block", UserController.blockUser);

// Unblock another user
router.patch("/:id/unblock", UserController.unblockUser);

//======================= GENERAL ROUTES ===========================//
// Get a specific user by ID
router.get("/:id", UserController.getUserById);

// Get all users
router.get("/", UserController.getAllUsers);

// Update user details
router.put("/:id", UserController.updateUserDetails);

// Delete a user
router.delete("/:id", UserController.deleteUser);

// Search users
router.get("/search", UserController.searchUsers);



export default router;

import expressAsyncHandler from "express-async-handler";
import * as UserService from "../services/users.services.js";
import { successResponse } from "../utils/Response.js";
import { ApiError } from "../utils/ApiError.js";

//===================== ADMIN Or MODERATOR ONLY =================//
///////////////////////////////////////////////////////////////////
// Grant moderator role
export const grantModerator = expressAsyncHandler(async (req, res) => {
  const user = await UserService.grantModerator(req.params.id);
  successResponse(res, user, "User granted moderator role successfully");
});

// Ban a user
export const banUser = expressAsyncHandler(async (req, res) => {
  const user = await UserService.banUser(req.params.id);
  successResponse(res, user, "User banned successfully");
});

// Set trial duration for a user
export const setTrialDuration = expressAsyncHandler(async (req, res) => {
  const { trialEndDate } = req.body; // Expecting a date string in request body
  const user = await UserService.setTrialDuration(
    req.params.id,
    new Date(trialEndDate)
  );
  successResponse(res, user, "Trial duration set successfully");
});

// ======================= ADMIN ONLY ===========================//
// Grant free subscription
export const grantFreeSubscription = expressAsyncHandler(async (req, res) => {
  const user = await UserService.grantFreeSubscription(req.params.id);
  successResponse(res, user, "User marked as paid by admin");
});
//===============================================================//

// User Block User
export const blockUser = expressAsyncHandler(async (req, res) => {
  const userIdToBlock = req.params.id;
  const user = await UserService.blockUser(req.user._id, userIdToBlock);
  successResponse(res, user, "User blocked successfully");
});

// User Unblock User
export const unblockUser = expressAsyncHandler(async (req, res) => {
  const { userIdToUnblock } = req.body;
  const user = await UserService.unblockUser(req.params.id, userIdToUnblock);
  successResponse(res, user, "User unblocked successfully");
});

// Get user by ID
export const getUserById = expressAsyncHandler(async (req, res) => {
  const user = await UserService.getUserById(req.params.id);
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  successResponse(res, user, "User retrieved successfully");
});

// Get all users
export const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await UserService.getAllUsers();
  successResponse(res, users, "Users retrieved successfully");
});

// Update user details
export const updateUserDetails = expressAsyncHandler(async (req, res) => {
  // check if the same user
  if (req.user._id === req.params.id) throw new ApiError("Not Allowed", 401);
  const updatedUser = await UserService.updateUserDetails(
    req.params.id,
    req.body
  );
  successResponse(res, updatedUser, "User details updated successfully");
});

// Delete user
export const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await UserService.deleteUser(req.params.id);
  successResponse(res, user, "User deleted successfully");
});

// Search users
export const searchUsers = expressAsyncHandler(async (req, res) => {
  const { searchQuery } = req.query;
  const users = await UserService.searchUsers(searchQuery);
  successResponse(res, users, "Users retrieved successfully");
});

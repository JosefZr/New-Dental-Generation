import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Grant moderator role to a user (for admin or moderator only)
 */
export const grantModerator = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError("User not found", 404);

  user.role = "moderator";
  user.isPaid = true;
  await user.save();
  return user;
};

/**
 * Ban a user (for admin or moderator only)
 */
export const banUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError("User not found", 404);

  user.isBanned = true;
  await user.save();
  return user;
};

/**
 * Set trial duration for a user (for admin or moderator only)
 */
export const setTrialDuration = async (userId, trialEndDate) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError("User not found", 404);

  user.trialEndDate = trialEndDate; // Assuming this is a Date object
  await user.save();
  return user;
};

/**
 * Grant free subscription to a user (admin only)
 */
export const grantFreeSubscription = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError("User not found", 404);

  user.isPaid = true;
  await user.save();
  return user;
};

/**
 * Block a user for another user
 */
export const blockUser = async (userId, userIdToBlock) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError("User not found", 404);

  if (!user.blocklist.includes(userIdToBlock)) {
    user.blockedUsers.push(userIdToBlock);
  }
  await user.save();
  return user;
};

/**
 * Unblock a previously blocked user
 */
export const unblockUser = async (userId, userIdToUnblock) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError("User not found", 404);

  user.blockedUsers = user.blockedUsers || [];
  user.blockedUsers = user.blockedUsers.filter(
    (id) => id.toString() !== userIdToUnblock
  );
  await user.save();
  return user;
};

/**
 * Get user by ID
 */
export const getUserById = async (userId) => {
  const user = await User.findById(userId);
  let { password, ...userData } = user._doc;
  return userData || null;
};

/**
 * Get all users
 */
export const getAllUsers = async () => {
  const users = await User.find();
  users.forEach((user) => {
    delete user._doc.password;
  });
  return users;
};

/**
 * Update user details
 */
export const updateUserDetails = async (userId, updatedDetails) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError("User not found", 404);

  Object.assign(user, updatedDetails);
  await user.save();
  return user;
};

/**
 * Delete a user
 */
export const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  return user || null;
};

/**
 * Search users by a query
 */
export const searchUsers = async (searchQuery) => {
  const users = await User.find({
    $or: [
      { username: { $regex: searchQuery, $options: "i" } },
      { email: { $regex: searchQuery, $options: "i" } },
    ],
  });
  return users;
};

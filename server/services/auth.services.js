import bcrypt from "bcrypt";
import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";

export const createUser = async (data) => {
  const {
    firstName,
    lastName,
    proofOfProfession,
    email,
    password: pass,
    role,
  } = data;

  console.log(data);

  // Check if proofOfProfession is provided
  if (!proofOfProfession) {
    throw new ApiError(400, "Proof of Profession is required");
  }

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, "User already exists");
  }

  // Ensure only one admin exists
  if (role === "admin") {
    throw new ApiError(400, "This role is not allowed");
  }

  // Hash the password before saving the user
  // const hashedPassword = await bcrypt.hash(pass, 10);

  // Create new user
  try {
  const user = await User.create({
    firstName,
    lastName,
    proofOfProfession,
    email,
    password: pass,
    role,
  });
  
  console.log("user created:", user);
  const { password, ...safeUser } = user._doc;
  return safeUser;
} catch (error) {
  console.error("Error creating user:", error);
}
};

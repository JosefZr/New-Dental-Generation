import bcrypt from "bcrypt";
import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";

export const createUser = async (data) => {

 try {
  const {
    firstName,
    lastName,
    proofOfProfession,
    email,
    password: pass,
    role,
    region,
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
  console.log("new user object")
  const user = new User({
    firstName,
    lastName,
    proofOfProfession,
    email,
    region,
    password: pass,
    role,
  });

 console.log("validation")
  await user.validate();
 console.log("saving the user")
  const savedUser = await user.save();

  console.log("user created:", savedUser);
  const { password, ...safeUser } = savedUser._doc;
  return safeUser;
 } catch (error) {
    if (error.name === "ValidationError") {
      throw new ApiError(400, `validation error: ${error.message}`); 
    }
     console.error("❌ Error in createUser:", error);
    throw new ApiError(500, `Failed to create user: ${error.message}`);  
 }
};

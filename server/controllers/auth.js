import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";

// Generate Access Token (short-lived)
export const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id,role:user.role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

// Generate Refresh Token (long-lived)
export const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id,role:user.role }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, proofOfProfession, email, password, role } = req.body;
    console.log("Request Body:", req.body);
    if(!proofOfProfession){
      throw new ApiError(400, "Proof of Profession is required");
    } // Add this line
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Only one admin exists
    if (role === "admin") {
      throw new Error("This role is not allowed");
    }

    try {
      const user = await User.create({
        firstName,
        lastName,
        proofOfProfession,
        email,
        password,
        role,
      });
    
      // Fetch the saved user to verify it has been saved correctly
      const savedUser = await User.findById(user._id);
      console.log("Saved User:", savedUser); // Check if proofOfProfession is here
      if (!proofOfProfession) {
        throw new ApiError(400, "Proof of Profession is required");
      }
      res.status(201).json({
        user: {
          _id: user._id,
          firstName: user.firstName,
          email: user.email,
          role: user.role,
          proofOfProfession: user.proofOfProfession,
        },
        message: "User created successfully",
      });
    } catch (error) {
      console.error("Error creating user:", error); // Log the error for debugging
      res.status(500).json({ message: error.message });
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Refresh Token Route
export const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  const user = await User.findOne({ refreshToken });
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
};
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const user = await User.findOneAndUpdate(
      { refreshToken },
      { refreshToken: null }
    );

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

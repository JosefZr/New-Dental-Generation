import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { createUser } from "../services/auth.services.js";

// Generate Access Token (short-lived)
export const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

// Generate Refresh Token (long-lived)
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, proofOfProfession, email, password, role } =
      req.body;

    // Create user using the service
    const user = await createUser({
      firstName,
      lastName,
      proofOfProfession,
      email,
      password,
      role,
    });

    // Respond with the created user details
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
    // Log and respond with errors
    console.error("Error in signup:", error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: "An unexpected error occurred" });
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

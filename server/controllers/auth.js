import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { createUser } from "../services/auth.services.js";

const tokenExpirations = {
  freeTrial: { access: "1d", refresh: "7d" },
  monthly: { access: "1d", refresh: "30d" },
  quarterly: { access: "1d", refresh: "120d" }, // Added 'd' for days
  yearly: { access: "1d", refresh: "365d" },
};

// Generate Access Token (short-lived)
export const generateAccessToken = (user) => {
  const plan = user.subscriptionPlan || "freeTrial"; // Default to freeTrial
  const accessExp = tokenExpirations[plan]?.access || "1d"; // Fallback to 1 day if undefined

  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: accessExp }
  );
};

// Generate Refresh Token (long-lived)
export const generateRefreshToken = (user) => {
  let refreshExp;

  if (user.subscriptionPlan === "freeTrial") {
    // Role-based expiration for freeTrial plan
    refreshExp = user.role === "dentist" ? "6d" : "40d";
  } else {
    const plan = user.subscriptionPlan || "freeTrial"; // Default to freeTrial
    refreshExp = tokenExpirations[plan]?.refresh || "7d"; // Fallback to 7 days if undefined
  }

  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: refreshExp }
  );
};

export const signup = async (req, res) => {
  try {
    const { name, userData } = req.body;
    console.log(userData);
    const isFreeTrial = name === "freeTrial";
    const subscriptionDuration = userData.role === "dentist" ? 6 : 40;

    const user = await createUser({
      firstName: userData.firstName,
      lastName: userData.lastName,
      proofOfProfession: "test here for pass the check",
      email: userData.email,
      password: userData.password,
      role: "role",
      isPaid: !isFreeTrial,
      subscriptionPlan: isFreeTrial ? "freeTrial" : name,
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(
        new Date().setDate(new Date().getDate() + subscriptionDuration)
      ),
    });

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
    // console.log("Login attempt with email:", email);

    const user = await User.findOne({ email });
    // console.log("User found:", user);
    if (!user) {
      // console.log("User not found with email:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // Compare the password
    // console.log(password);
    // const isMatch = await user.comparePassword(password);
    // console.log("Password match result:", isMatch);
    // if (!isMatch) {
    //   console.log("Invalid credentials for email:", email);
    //   return res.status(401).json({ error: "Invalid credentials" });
    // }
    if (!user || !(await user.comparePassword(password))) {
      console.log("Invalid credentials for email:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Refresh Token Route
export const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;
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

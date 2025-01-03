import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt"
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
    { userId: user._id, role: user.role, firstName:user.firstName, lastName:user.lastName, email:user.email },
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
export const userData = async (req, res)=>{
  try{
  const {id} = req.body;

  const user = await User.findOne({_id:id});
  if(!user){
    console.log( "User not found with id :",id);
    return res.status(401).json({error:"Invalid ID"})
  }

  //send only the required fieald in the response
  return res.status(200).json({
    success:true,
    message:"user Has been found Succesfully",
    data:{user},
  });
  }catch(error){
    console.log("Error in userData API:",error);
    res.status(500).json({error:"Internal server error"});
  }
}
export const signup = async (req, res) => {
  try {
    const { name, userData } = req.body;
    const isAdminOrModerator = userData.role === 'admin' || userData.role === 'moderator';

    if (isAdminOrModerator) {
      const twentyYearsFromNow = new Date();
      twentyYearsFromNow.setFullYear(twentyYearsFromNow.getFullYear() + 20);
      
      const user = await User.create({
        ...userData,
        subscriptionPlan: 'yearly',
        proofOfProfession: null,
        isPaid: true,
        subscriptionStartDate: new Date(),
        subscriptionEndDate: twentyYearsFromNow,
      });

      return res.status(201).json({
        user: {
          _id: user._id,
          firstName: user.firstName,
          email: user.email,
          role: user.role,
          region: user.region,
          proofOfProfession: user.proofOfProfession,
          subscriptionPlan: user.subscriptionPlan,
          subscriptionStartDate: user.subscriptionStartDate,
          subscriptionEndDate: user.subscriptionEndDate,
        },
        message: "User created successfully",
      });
    }

    // Regular user flow
    const subscriptionPlan = name || 'freeTrial';
    const isFreeTrial = subscriptionPlan === 'freeTrial';
    const subscriptionDuration = userData.role === "dentist" ? 6 : 40;
    
    const user = await User.create({
      ...userData,
      subscriptionPlan,
      proofOfProfession: userData.file,
      isPaid: !isFreeTrial,
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(
        new Date().setDate(new Date().getDate() + subscriptionDuration)
      ),
      trialStartDate: isFreeTrial ? new Date() : undefined,
      trialEndDate: isFreeTrial ? new Date(
        new Date().setDate(new Date().getDate() + subscriptionDuration)
      ) : undefined
    });

    res.status(201).json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
        region: user.region,
        proofOfProfession: user.proofOfProfession,
        subscriptionPlan: user.subscriptionPlan,
        subscriptionStartDate: user.subscriptionStartDate,
        subscriptionEndDate: user.subscriptionEndDate,
      },
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Detailed error in signup:", error);
    res.status(500).json({
      message: "An unexpected error occurred",
      error: error.message,
      errorDetails: error.errors ? Object.keys(error.errors) : 'No specific error details'
    });
  }
}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email);

    const user = await User.findOne({ email });
    // console.log("User found:", user);
    if (!user) {
      // console.log("User not found with email:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // Compare the password
    console.log(password);
    const isMatch = await user.comparePassword(password);
    console.log("Password match result:", isMatch);
    if (!isMatch) {
      console.log("Invalid credentials for email:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }
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
export const updateUserName = async (req, res) => {
  const { userId, firstName, lastName } = req.body;

  // Validate input
  if (!userId || !firstName || !lastName) {
      console.error("Missing data:", { userId, firstName, lastName });
      return res.status(400).json({
          success: false,
          message: "firstName, and lastName are required.",
      });
  }

  try {
      // Find and update user
      const user = await User.findOneAndUpdate(
          { _id: userId }, // Find user by ID
          { firstName, lastName }, // Fields to update
          { new: true, runValidators: true } // Return updated document & validate
      );

      // Check if user exists
      if (!user) {
          console.error("User not found:", userId);
          return res.status(404).json({
              success: false,
              message: "User not found.",
          });
      }

      // Respond with updated user
      return res.status(200).json({
          success: true,
          message: "User Name updated successfully.",
          data: user,
      });
  } catch (error) {
      console.error("Error updating user name:", error);
      return res.status(500).json({
          success: false,
          message: "An error occurred while updating the user name.",
      });
  }
};
export const updateUserEmail = async(req,res)=>{
  const {userId, email}= req.body;
  if(!userId || !email){
    console.error("Missing data:", { userId, email });
    return res.status(200).json({
        success: false,
        message: "email is missing.",
    });
  }
  try {
    const userEmail = await User.findOne({email})
    if(userEmail){
      return res.status(200).json({
        success: false,
        message: "this email has been used before"
      });      
    }
      const user = await User.findOneAndUpdate(
        { _id: userId }, // Find user by ID
        { email }, // Fields to update
        { new: true, runValidators: true } // Return updated document & validate
      );
      // Respond with updated user
      return res.status(200).json({
        success: true,
        message: "User Email updated successfully.",
        data: user,
    });
  } catch (error) {
    // Handle server errors
    console.error("Error updating user email:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the user email.",
    })
  }
}

export const updateUserPassword=async (req, res)=>{
  const { userId, previewsPassword, newPassword } = req.body;
  if (!userId || !previewsPassword || !newPassword) {
    console.error("Missing data:", { userId, previewsPassword, newPassword });
    return res.status(400).json({
      success: false,
      message: "Missing required fields.",
    });
  }
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
    // Compare previewPassword with the stored hash
    const isValidPassword = await bcrypt.compare(previewsPassword, user.password);
    if (!isValidPassword) {
      return res.status(200).json({
        success: false,
        message: "Invalid previous password.",
      });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

   // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });

  } catch (error) {
    console.error("Error updating user password:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the user password.",
    })
  }
}
export const updateUserDescription = async (req, res)=>{
  const { userId, bio } = req.body;
  if (!userId || !bio) {
    console.log("Missing data:", { userId, bio });
    return res.status(400).json({
      success: false,
      message: "Missing required fields.",
    })
  }
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
    // Update the user's description
    const data = await User.findOneAndUpdate(
      { _id: userId }, // Find user by ID
      { bio }, // Fields to update
      { new: true, runValidators: true } // Return updated document & validate
    );
    return res.status(200).json({
      success: true,
      message: "Description updated successfully.",
      data:data
    })
    
  } catch (error) {
    console.log("Error updating user description:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the user description.",
    })
  }
}


export const uploadUserAvatar = async(req, res)=>{
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }
  const { id } = req.query; // Extract user ID from query parameters
  const imageName = req.file.filename;
    
  if(!imageName){
    return res.status(404).json({
      success: false,
      message: "User not found or no image uploaded",
    })
  }
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

    try{
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }
      // Update the user's avatar
      const data = await User.findOneAndUpdate(
        { _id: id }, // Find user by ID
        { avatar: imageName }, // Fields to update
        { new: true, runValidators: true } // Return updated document & validate
      )
      return res.status(200).json({
        success: true,
        message: "Avatar uploaded successfully",
        data:data
      })
    }catch(error){
      console.log("Error updating user avatar:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the user avatar.",
        })
    }
}

export const uploadBackground = async (req, res)=>{
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }
  const { id } = req.query; // Extract user ID from query parameters
  const imageName = req.file.filename;
    
  if(!imageName){
    return res.status(404).json({
      success: false,
      message: "User not found or no image uploaded",
    })
  }
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }
  try{
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
    // Update the user's avatar
    const data = await User.findOneAndUpdate(
      { _id: id }, // Find user by ID
      { background: imageName }, // Fields to update
      { new: true, runValidators: true } // Return updated document & validate
    )
    return res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully",
      data:data
    })
  }catch(error){
    console.log("Error updating user avatar:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the user avatar.",
      })
  }
}
export const getAllUsers = async(req,res)=>{
  try {
    const users = await User.find({})
    return res.status(200).json({
      success: true,
      message:"user fetched succesfult",
      data: users
    })
    
  } catch (error) {
    console.log("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching users.",
    })
  }
}

export const deleteUser = async(req, res)=>{
  const { id } = req.query; // Extract id from query params
  try{
    const user = await User.findByIdAndDelete(id)
    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
    const remainingUsers = await User.find({});

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data:remainingUsers
    })
  }catch(error){
    console.log("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user.",
    })
  }

}
import express from "express";
import { signup, login, refresh, logout, userData,
  updateUserName,updateUserEmail,updateUserPassword,
  updateUserDescription,uploadUserAvatar,getAllUsers
  ,uploadBackground,deleteUser,
  addJurney
} from "../controllers/auth.js";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middlewares/auth.js";
import multer from "multer";
import User from "../models/User.js";
import nodemailer from "nodemailer"
import path from "path"
import fs from "fs"

const router = express.Router();

router.post("/signup", signup);
router.post("/chama", async (req, res) => {
  try {
    // Destructure directly from req.body
    const { 
      firstName,
      lastName,
      email,
      password,
      region,
      role,
      subscriptionPlan 
    } = req.body;

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'role'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Calculate subscription dates
    const durationMap = {
      monthly: 1,
      quarterly: 4,
      yearly: 12,
      decade: 120,
      century: 1200
    };

    const startDate = new Date();
    const endDate = new Date(startDate);
    
    if (durationMap[subscriptionPlan]) {
      endDate.setMonth(startDate.getMonth() + durationMap[subscriptionPlan]);
    } else {
      endDate.setMonth(startDate.getMonth() + 1); // Default to 1 month
    }

    // Create user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      region,
      role,
      subscriptionPlan,
      subscriptionStartDate: startDate,
      subscriptionEndDate: endDate,
      isPaid: true
    });

    res.status(201).json({
      success: true,
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        subscriptionPlan: newUser.subscriptionPlan
      }
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.post("/login", login);
router.post("/forgot", async(req,res)=>{
  const {email} = req.body
  console.log(email)
  if(!email){
    return res.status(400).json({message:"Email is required",success: false })
  }
  try {
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({message:"Email is not registered", success:false} )
    }
    const token = jwt.sign({id:user._id},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: "5m" })
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'zeraibiredha@gmail.com',
        pass: 'dwkk pxti qfdq jlxn'
      }
    });
    
    var mailOptions = {
      from: 'zeraibiredha@gmail.com',
      to:email,
      subject: 'reset your email',
      text: `http://localhost:5173/#/reset-password/${token}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return res.status(500).json({ message: "Error sending the email", success: false });
      }
      else{
        console.log({ message: "Email sent successfully", status: true });
        return res.status(200).json({ message: "Email sent successfully", success: true });
      }
    });
      

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", success: false });
  }
})
router.put("/subscription", async (req, res) => {
  const { userId, days } = req.body;
  console.log(userId, days);
  
  if (!userId || !days) {
    return res.status(400).json({ 
      message: "User ID and days are required", 
      success: false 
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        message: "User not found", 
        success: false 
      });
    }
    
    // Validate days input
    const daysInt = parseInt(days);
    if (isNaN(daysInt) || daysInt < 1) {
      return res.status(400).json({
        message: "Days must be a positive integer",
        success: false
      });
    }

    // Calculate new subscription end date
    const currentEndDate = user.subscriptionEndDate || new Date();
    const newEndDate = new Date(currentEndDate);
    newEndDate.setDate(newEndDate.getDate() + daysInt);

    // Determine subscription plan based on days
    if (daysInt >= 365) {
      user.subscriptionPlan = "yearly";
    } else if (daysInt >= 120) { // 4 months (4 * 30 = 120 days)
      user.subscriptionPlan = "quarterly";
    } else if (daysInt > 1 && daysInt < 30) {
      user.subscriptionPlan = "monthly";
    } else {
      // For days between 30-119, keep existing plan or set default
      user.subscriptionPlan = user.subscriptionPlan || "monthly";
    }

    // Update user properties
    user.subscriptionEndDate = newEndDate;
    // user.trialEndDate = newEndDate;
    await user.save();

    return res.json({ 
      success: true, 
      message: "Subscription extended successfully",
      data: user
    });
    
  } catch (error) {
    console.error("Error extending subscription:", error);
    return res.status(500).json({ 
      message: "Internal server error", 
      success: false 
    });
  }
});
router.put("/reset/password",async(req, res)=>{
  const { userId, newPassword } = req.body;
  if (!userId || !newPassword) {
    console.error("Missing data:", { userId, newPassword });
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

   // Update the user's password
    user.password = newPassword;
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
})
router.post("/getUserData",userData);
router.get("/getAdmin",async(req,res)=>{
  try {
    const user = await User.findOne({role:"admin"});
    if(!user){
      return res.status(401).json({message:"User not found with role admin:", success:"false"})
    }
    return res.status(200).json({message:"User found with role admin:", success:"true",data:user})
      
  } catch (error) {
    console.error("Error getting admin user:", error);
    return res.status(500).json({message:"An error occurred while getting the admin user:",
      success:"false"})
  }
});
router.post("/refresh", refresh);
router.post("/logout", authenticateToken, logout);
router.get("/test", (req, res) => {
  res.send("Auth route is working!");
});
router.get("/getAll/users",getAllUsers);
router.put("/update/username", updateUserName);
router.put("/update/email", updateUserEmail);
router.put("/update/password", updateUserPassword);
router.put("/update/description",updateUserDescription)
router.put("/update/journey",addJurney);
router.delete("/delete/user", deleteUser);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure the 'uploads' directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique name for the file
}
});
const upload = multer({ storage }); // Use 'storage' instead of 'dest'

router.post("/upload/avatar", upload.single("image") ,uploadUserAvatar)
router.post("/upload/background", upload.single("image") ,uploadBackground)

// Ensure the upload directory exists
const uploadDir = path.resolve("uploads/proffession");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storagePro = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Initialize multer with the correct storage configuration
const uploadPro = multer({
  storage: storagePro, // Fix this line
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and WEBP are allowed."));
    }
  },
});

// Endpoint to handle image uploads
router.post("/upload/proffession", uploadPro.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const filename = req.file.filename;
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      filename,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;

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

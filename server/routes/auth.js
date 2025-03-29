import express from "express";
import { signup, login, refresh, logout, userData,
  updateUserName,updateUserEmail,updateUserPassword,
  updateUserDescription,uploadUserAvatar,getAllUsers
  ,uploadBackground,deleteUser,
  addJurney,
  deleteJourney
} from "../controllers/auth.js";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middlewares/auth.js";
import multer from "multer";
import User from "../models/User.js";
import nodemailer from "nodemailer"
import path from "path"
import fs from "fs"
import Email from "../models/Emails.js";

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
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    var mailOptions = {
      from: process.env.EMAIL_USER,
      to:email,
      subject: 'reset your email',
      text: `${process.env.CLIENT_URL}/#/reset-password/${token}`
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
router.delete("/delete/journey",deleteJourney);

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
router.post("/leads", async (req, res) => {
  try {
    console.log('[LEADS] Starting lead processing');
    const { email, type } = req.body;
    console.log(`[LEADS] Received request for email: ${email}, type: ${type}`);
    // Validate email exists
    if (!email || !type) {
      console.log('[LEADS] Validation failed - missing email or type');
      return res.status(400).json({ 
        success: false, 
        message: "Email is required"
      });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log(`[LEADS] Invalid email format: ${email}`);
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    console.log(`[LEADS] Checking existing emails for ${email}`);
    const mail = await Email.findOne({email: email, type: type});
    if(mail){
      console.log(`[LEADS] Email already exists: ${email}`);
      return res.status(400).json({
        success: false,
        message: "This email already exists"
      });
    }
    // Create new email document
    console.log(`[LEADS] Creating new email record for ${email}`);
    const newEmail = await Email.create({ email: email, type: type });
     // Set up email transporter (reuse your existing config)
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        ciphers: 'SSLv3', // Force older cipher if needed
        rejectUnauthorized: true // Temporarily for testing
      },
      logger: true, // Enable Nodemailer's built-in logging
      debug: true   // Output SMTP traffic
    });
    // Prepare email content
    const mailOptions = {
      from: `${process.env.EMAIL_USER}`,
      to: email,
      subject: "Here's Your Secret Weapon 🦷",
      html: `
        <p>Hi there,</p>
        
        <p>Your Dentist's Secret Weapon is ready!</p>
        
        <p>
          <a href="https://drive.google.com/uc?export=download&id=1q9FCxsqiJ3LQtYdTBl1Sm4eP-59enVlY">
            Click here to access the guide.
          </a>
        </p>
        
        <p>Take your first step toward a smarter, more profitable practice.</p>
        
        <p>To your success,<br>
        Dr. Truth<br>
        Your Dental Network</p>
        
        <p><small>P.S. Want to see how we can help you implement these strategies? Join YDN and see yourself.</small></p>
      `
    };
    console.log(`[LEADS] Scheduling email for ${email} `);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`[LEADS] Error sending to ${email}:`, {
          error: error.message,
          stack: error.stack,
          code: error.code,
          response: error.response
        });
      } else {
        console.log(`[LEADS] Email sent to ${email}:`, {
          messageId: info.messageId,
          response: info.response
        });
      }
    });
    console.log(`[LEADS] Successfully processed request for ${email}`);
    return res.status(201).json({
      success: true,
      message: 'Email saved successfully',
      data: newEmail
    });
  } catch (error) {
    console.error(`[LEADS] Critical error:`, {
      message: error.message,
      stack: error.stack,
      code: error.code,
      requestBody: req.body
    });
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});
router.post("/waitlist", async (req, res) => {
  console.log('[WAITLIST] Starting waitlist processing');
  const data = req.body;
  console.log('[WAITLIST] Received data:', JSON.stringify(data));
  try {

    // Validate email exists
    if (!data) {
      console.log('[WAITLIST] Missing request body');
      return res.status(400).json({ 
        success: false, 
        message: "Request body is required"
      });
    }
    // const mail = await Email.findOne({email:data.email,type:data.type})
    // if(mail){
    //   console.log(`[WAITLIST] Email exists: ${data.email}`);
    //   return res.status(400).json({
    //     success: false,
    //     message: "This email already exists"
    //   });
    // }
    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      console.log(`[WAITLIST] Invalid email: ${data.email}`);
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // Create new email document
    console.log(`[WAITLIST] Creating record for ${data.email}`);
    const newEmail = await Email.create({ 
      name: data.fullName,
      location: data.location,
      email: data.email,
      number: data.whatsapp,
      reason: data.why,
      type: data.type
    });
    // Set up email transporter (reuse your existing config)
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
         // Recommended security settings
        minVersion: 'TLSv1.2',
        ciphers: 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256',
        rejectUnauthorized: true
      },
      logger: true,
    });

    // Prepare email content
    const firstName = data.fullName?.split(' ')[0] || 'there';
    const mailOptions = {
      from: 'dr.truth@buildydn.com',
      to: data.email,
      subject: "Here's Your Secret Weapon 🦷",
      html: `
        <p>Hi ${firstName},</p>
        
        <p>Your Dentist's Secret Weapon is ready!</p>
        
        <p>
          <a href="https://drive.google.com/uc?export=download&id=1q9FCxsqiJ3LQtYdTBl1Sm4eP-59enVlY">
            Click here to access the guide.
          </a>
        </p>
        
        <p>Take your first step toward a smarter, more profitable practice.</p>
        
        <p>To your success,<br>
        Dr. Truth<br>
        Your Dental Network</p>
        
        <p><small>P.S. Want to see how we can help you implement these strategies? Join YDN and see yourself.</small></p>
      `
    };
    console.log(`[WAITLIST] Scheduling email for ${data.email}`);

    // Schedule email to be sent after 5 minutes (300,000 milliseconds)
    console.log(`[WAITLIST] Sending email to ${data.email}`);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`[WAITLIST] Send error for ${data.email}:`, {
          error: error.message,
          code: error.code,
          response: error.response
        });
      } else {
        console.log(`[WAITLIST] Email sent to ${data.email}:`, {
          messageId: info.messageId,
          response: info.response
        });
      }
    });
    return res.status(201).json({
      success: true,
      message: 'Email saved successfully',
      data: newEmail
    });
  } catch (error) {
    console.error(`[WAITLIST] Critical error:`, {
      message: error.message,
      stack: error.stack,
      code: error.code,
      requestBody: req.body
    });
    // if (error.code === 11000) { // MongoDB duplicate key error
    //   return res.status(409).json({
    //     success: false,
    //     message: 'Email already exists'
    //   });
    // }
    console.error("Lead submission error:", error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});
export default router;

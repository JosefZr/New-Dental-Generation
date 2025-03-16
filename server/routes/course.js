import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  addNewCourse,
  getAllCourses,
  getCourseDetailsById,
  updateCourseById,
  deleteCourseById,
  setUserToCourse,
} from "../controllers/instructor.js";

const router = express.Router();

// Ensure the upload directory exists
const uploadDir = path.resolve("uploads/course");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
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
router.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file)
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const filename = req.file.filename;
    const oldFilename = req.body.oldFilename;

    // Delete previous image if exists
    if (oldFilename) {
      const oldPath = path.join(uploadDir, oldFilename);
      fs.unlink(oldPath, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }

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
router.delete("/delete", (req, res) => {
  try {
    const { filename } = req.body;
    if (!filename) return res.status(400).json({ error: "Filename required" });

    const filePath = path.join(uploadDir, filename);
    fs.unlink(filePath, (err) => {
      if (err) return res.status(500).json({ error: "Error deleting image" });
      res.json({ message: "Image deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Other routes
router.post("/add", addNewCourse);
router.get("/get", getAllCourses);
router.get("/get/details/:id", getCourseDetailsById);
router.put("/update/:id", updateCourseById);
router.delete("/delete", deleteCourseById);
router.post("/setUserToCourse", setUserToCourse);

export default router;

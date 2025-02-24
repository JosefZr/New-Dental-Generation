import express from "express"
import { getAllCurrentCourseProgress, getCurrentCourseProgress,updateLectureProgress } from "../controllers/courseProgressController.js";
import CourseProgress from "../models/CourseProgress.js";

const router = express.Router();

router.post('/get',getCurrentCourseProgress)
router.post('/getAll',getAllCurrentCourseProgress)
router.patch('/update', updateLectureProgress);
// Update setLectureViewed route
// Backend route handler
router.patch("/setLectureViewed", async (req, res) => {
    const { userId, courseId, moduleId, lectureId } = req.body;
  
    try {
      const progress = await CourseProgress.findOne({ userId, courseId });
      
      // Find the exact module progress
      const moduleProgress = progress.moduleProgress.find(
        mp => mp.moduleId === moduleId
      );
  
      if (!moduleProgress) {
        return res.status(404).json({ message: "Module not found in progress" });
      }
  
      // Find existing lecture progress
      const lectureIndex = moduleProgress.lectures.findIndex(
        l => l.lectureId === lectureId
      );
  
      if (lectureIndex !== -1) {
        // Update existing entry
        moduleProgress.lectures[lectureIndex].viewed = true;
        moduleProgress.lectures[lectureIndex].dateViewed = new Date();
      } else {
        // Add new entry only if lecture exists in course
        const course = await CourseProgress.findById(courseId);
        const lectureExists = course.modules.some(m => 
          m._id === moduleId && m.lectures.some(l => l._id === lectureId)
        );
        
        if (!lectureExists) {
          return res.status(404).json({ message: "Lecture not found in course" });
        }
  
        moduleProgress.lectures.push({
          lectureId,
          viewed: true,
          dateViewed: new Date()
        });
      }
  
      await progress.save();
      res.status(200).json({ success: true, data: progress });
      
    } catch (error) {
      console.error("Error updating lecture progress:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
// Update favorite route
router.patch("/fav", async (req, res) => {
    const { userId, courseId } = req.body;
    
    try {
        const progress = await CourseProgress.findOne({ userId, courseId });
        if (!progress) {
            return res.status(404).json({ message: "Progress not found" });
        }
        
        progress.isFavorite = !progress.isFavorite;
        await progress.save();
        
        res.status(200).json({ 
            success: true, 
            message: "Course favorite status updated", 
            data: progress 
        });
        
        } catch (error) {
        console.error("Error updating favorite:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        }
});

export default router
import express from "express"
import { getAllCurrentCourseProgress, getCurrentCourseProgress,updateLectureProgress } from "../controllers/courseProgressController.js";
import CourseProgress from "../models/CourseProgress.js";
import Course from "../models/Course.js";

const router = express.Router();

router.post('/get',getCurrentCourseProgress)
router.post('/getAll',getAllCurrentCourseProgress)
router.patch('/update', updateLectureProgress);
// Update setLectureViewed route
// Backend route handler
router.patch("/setLectureViewed", async (req, res) => {
  const { userId, courseId, moduleId, subModuleId, lectureId } = req.body;
  console.log("userId",userId)
  console.log("courseId",courseId)
  console.log("moduleId",moduleId)
  console.log("subModuleId",subModuleId)
  console.log("lectureId",lectureId)
  console.log("--------------------------------------")

  try {
    // Find the user's course progress
    const progress = await CourseProgress.findOne({ userId, courseId });
    if (!progress) {
      console.error("Progress not found for:", { userId, courseId });
      return res.status(401).json({ message: "Progress not found" });
    }
    // Find the relevant module progress
    const moduleProgress = progress.moduleProgress.find(
      mp => mp.moduleId.toString() === moduleId // Compare as strings
    );
    
    if (!moduleProgress) {
      console.error("Module not found in progress:", moduleId);
      return res.status(404).json({ message: "Module not found in progress" });
    }

    let lectureArray;
    if (subModuleId) {
      // Handle submodule lectures
      let subModuleProgress = moduleProgress.subModules.find(sm => sm.subModuleId === subModuleId);
      if (!subModuleProgress) {
        // Verify submodule exists in the actual course
        const course = await CourseProgress.findById(courseId); // Use Course model
        const courseModule = course.modules.id(moduleId);
        if (!courseModule) return res.status(404).json({ message: "Module not found in course" });

        const courseSubModule = courseModule.subModules.id(subModuleId);
        if (!courseSubModule) return res.status(404).json({ message: "Submodule not found in course" });

        // Add new submodule progress
        subModuleProgress = { subModuleId, lectures: [] };
        moduleProgress.subModules.push(subModuleProgress);
      }
      lectureArray = subModuleProgress.lectures;
    } else {
      // Handle module-level lectures
      lectureArray = moduleProgress.lectures;
    }

    // Check if lecture already exists in progress
    const lectureIndex = lectureArray.findIndex(l => l.lectureId === lectureId);
    if (lectureIndex !== -1) {
      // Update existing lecture progress
      lectureArray[lectureIndex].viewed = true;
      lectureArray[lectureIndex].dateViewed = new Date();
    } else {
      // Verify the lecture exists in the course
      const course = await Course.findById(courseId);
      const courseModule = course.modules.id(moduleId);
      if (!courseModule) return res.status(404).json({ message: "Module not found in course" });

      let lectureExists = false;
      if (subModuleId) {
        const courseSubModule = courseModule.subModules.id(subModuleId);
        lectureExists = courseSubModule?.lectures.some(l => l._id.equals(lectureId));
      } else {
        lectureExists = courseModule.lectures.some(l => l._id.equals(lectureId));
      }

      if (!lectureExists) {
        return res.status(404).json({ message: "Lecture not found in course" });
      }

      // Add new lecture progress entry
      lectureArray.push({
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
  const { userId, courseId, lectureId } = req.body;

  try {
    const progress = await CourseProgress.findOne({ userId, courseId });
    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    let lectureFound = false;
    
    // Traverse through all modules and submodules
    for (const module of progress.moduleProgress) {
      for (const subModule of module.subModules) {
        const lectureIndex = subModule.lectures.findIndex(
          (l) => l.lectureId === lectureId
        );
        
        if (lectureIndex !== -1) {
          subModule.lectures[lectureIndex].isFavorite = 
            !subModule.lectures[lectureIndex].isFavorite;
          lectureFound = true;
          break;
        }
      }
      if (lectureFound) break;
    }

    if (!lectureFound) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    await progress.save();

    res.status(200).json({
      success: true,
      message: "Lecture favorite updated",
      data: progress,
    });
  } catch (error) {
    console.error("Error updating lecture favorite:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
export default router
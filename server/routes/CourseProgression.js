import express from "express"
import { getAllCurrentCourseProgress, getCurrentCourseProgress,updateLectureProgress } from "../controllers/courseProgressController.js";
import CourseProgress from "../models/CourseProgress.js";

const router = express.Router();

router.post('/get',getCurrentCourseProgress)
router.post('/getAll',getAllCurrentCourseProgress)

router.patch('/update', updateLectureProgress);

router.patch("/setLectureViewed", async (req, res) => {
    const { userId, courseId, lectureId } = req.body;

    try {
        // const userId = String(req.body.userId);
        // const courseId = String(req.body.courseId);
        // const lectureId = String(req.body.lectureId);

        const progress = await CourseProgress.findOne({ userId, courseId });

        if (!progress) {
            return res.status(400).json({ message: "Progress not found." });
        }

        // Update the lecture as viewed
        const lecture = progress.lectureProgress.find((lec) => lec.lectureId === lectureId);
        if (lecture) {
            lecture.viewed = true;
            lecture.dateViewed = new Date();
        } else {
            progress.lectureProgress.push({
                
                viewed: true,
                dateViewed: new Date(),
            });
        }

        // Save the updated progress
        await progress.save();

        res.status(200).json({ success: true, message: "Lecture marked as viewed.", data: progress});
    } catch (error) {
        console.error("Error updating lecture progress:", error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
});

export default router
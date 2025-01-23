import express from "express"
import { getAllCurrentCourseProgress, getCurrentCourseProgress,updateLectureProgress } from "../controllers/courseProgressController.js";
import CourseProgress from "../models/CourseProgress.js";

const router = express.Router();

router.post('/get',getCurrentCourseProgress)
router.post('/getAll',getAllCurrentCourseProgress)
router.patch('/update', updateLectureProgress);
router.patch("/setLectureViewed", async (req, res) => {
    const { userId, courseId, lectureId } = req.body;
    if(!userId){
        return res.status(401).json({ message: "User ID is required" });
    }
    if(!courseId){
        return res.status(402).json({ message: "Course ID is required" });
    }
    if(!lectureId){
        return res.status(403).json({ message: "Lecture ID is required" });
    }
    try {
        const progress = await CourseProgress.findOne({ userId, courseId });

        if (!progress) {
            return res.status(404).json({ message: "Progress not found." });
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
router.patch("/fav",async(req, res)=>{
    const { userId, courseId } = req.body;
    if(!userId){
        return res.status(400).json({ message: "User ID is required." });
    }
    if(!courseId){
        return res.status(400).json({ message: "Course ID is required." });
    }
    try {
        const progress = await CourseProgress.findOne({ userId, courseId });
        if (!progress) {
            return res.status(403).json({ message: "You have to be register to the course" });
        }
        progress.isFavorite = !progress.isFavorite;
        await progress.save();
        res.status(200).json({ success: true, message: "Course favourited.", data
            : progress });

    } catch (error) {
        console.error("Error updating course favourite:", error);
        res.status(500).json({ success: false, message: "Internal Server Error." });

    }
})

export default router
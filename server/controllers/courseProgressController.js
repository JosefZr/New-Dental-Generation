import Course from "../models/Course.js";
import CourseProgress from "../models/CourseProgress.js";



//mark current levture as viewed
const MarkCurrentLectureAsViewed= async ()=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error marking"
        })
    }
}
export const getAllCurrentCourseProgress= async (req, res)=>{
    const { userId } = req.body; // Pass userId and courseId as query param
    if (!userId) {
        return res.status(400).json({ success: false, message: "Missing userId or courseId" });
    }
    try{
        const courseProgress = await CourseProgress.find({ userId: userId });
        res.status(200).json({
            success: true,
            data: courseProgress,
            message:"user progress retruned succefully"
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error fetching user progress"
        })
    }
}
//get our currnet course Progress
const getCurrentCourseProgress = async (req, res)=>{
    try {
        const { userId, courseId } = req.body; // Pass userId and courseId as query params
        if (!userId ) {
            return res.status(402).json({ success: false, message: "Missing userId or userId" });
        }
        if (!courseId) {
            return res.status(403).json({ success: false, message: "Missing userId or courseId" });
        }

        // Check if progress exists
        let courseProgress = await CourseProgress.findOne({ userId, courseId });

        // Initialize if not exists
        if (!courseProgress) {
            // Fetch course details (e.g., curriculum/lectures)
            const courseDetails = await Course.findById(courseId);
            if (!courseDetails) {
                return res.status(404).json({ success: false, message: "Course not found" });
            }

            const lectureProgress = courseDetails.curriculum.map((lecture) => ({
                lectureId: lecture._id,
                viewed: false,
                dateViewed: null,
            }));

            courseProgress = await CourseProgress.create({
                userId,
                courseId,
                completed: false,
                completionDate: null,
                lectureProgress,
            });
        }

        res.status(200).json({ success: true, data: courseProgress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching course progress" });
    }
};
export const updateLectureProgress = async (req, res) => {
    try {
        const { userId, courseId, lectureId } = req.body;

        const courseProgress = await CourseProgress.findOne({ userId, courseId });
        if (!courseProgress) {
            return res.status(404).json({ success: false, message: "Progress not found" });
        }

        const lecture = courseProgress.lectureProgress.find((l) => l.lectureId === lectureId);
        if (lecture) {
            lecture.viewed = true;
            lecture.dateViewed = new Date();
            await courseProgress.save();
            res.status(200).json({ success: true, message: "Progress updated" });
        } else {
            res.status(404).json({ success: false, message: "Lecture not found in progress" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating progress" });
    }
};

// reset Course Progress

const resetCurrentCourseProgress =async ()=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error reseting"
        })
    }
}

const setToCourse=async (req, res)=>{
    const { userId, studentName, studentEmail } = req.body;
    if (!userId || !studentName || !studentEmail) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields",
        });
    }
    try {
        const course = await Course.findById(req.body.courseId);
        course.students.push({
            studentId: userId,
            studentName,
            studentEmail,
        });
        await course.save();
        return res.status(200).json({
            success: true,
            message: "Student added successfully",
            data: course,
        });

    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({
            success: false,
            message: "Error adding student",
        });
    }
    }
export {
    MarkCurrentLectureAsViewed,
    getCurrentCourseProgress,
    resetCurrentCourseProgress,
    setToCourse
}
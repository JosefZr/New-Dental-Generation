import Course from "../models/Course.js";
import CourseProgress from "../models/CourseProgress.js";

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
// In getCurrentCourseProgress controller
const getCurrentCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    
    if (!userId || !courseId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    let courseProgress = await CourseProgress.findOne({ userId, courseId });

    if (!courseProgress) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ success: false, message: "Course not found" });
      }

      // Initialize module progress with string IDs
    const moduleProgress = course.modules.map(module => ({
      moduleId: module._id.toString(), // Convert to string
      title: module.title,
      completed: false,
      subModules: module.subModules.map(subModule => ({
        subModuleId: subModule._id.toString(), // Convert to string
        title: subModule.title,
        completed: false,
        lectures: subModule.lectures.map(lecture => ({
          lectureId: lecture._id.toString(), // Convert to string
          viewed: false,
          dateViewed: null
        }))
      }))
    }));


      courseProgress = await CourseProgress.create({
        userId,
        courseId,
        moduleProgress,
        completed: false,
        completionDate: null,
        isFavorite: false,
        moduleProgress
      });
    }

    res.status(200).json({ success: true, data: courseProgress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching course progress" });
  }
};
// Update updateLectureProgress controller
export const updateLectureProgress = async (req, res) => {
    try {
      const { userId, courseId, moduleId,subModuleId, lectureId } = req.body;
  
      const progress = await CourseProgress.findOne({ userId, courseId });
      if (!progress) {
        return res.status(404).json({ success: false, message: "Progress not found" });
      }
  
      // Find module progress
      const moduleProgress = progress.moduleProgress.find(
        mp => mp.moduleId === moduleId
      );

      // Find submodule progress
        const subModuleProgress = moduleProgress.subModuleProgress.find(
          sm => sm.subModuleId === subModuleId
        );

      if (!moduleProgress) {
        return res.status(404).json({ success: false, message: "Module not found" });
      }
  
      // Find lecture
        const lecture = subModuleProgress.lectures.find(
          l => l.lectureId === lectureId
        );
  
        if (lecture) {
          lecture.viewed = true;
          lecture.dateViewed = new Date();
          
          // Update submodule completion
          subModuleProgress.completed = subModuleProgress.lectures.every(l => l.viewed);
          
          // Update module completion
          moduleProgress.completed = moduleProgress.subModuleProgress.every(sm => sm.completed);
          
          // Update course completion
          progress.completed = progress.moduleProgress.every(mp => mp.completed);
          
          await progress.save();
          res.status(200).json({ success: true, message: "Progress updated" });
        }
      } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error updating progress" });
    }
  };
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
    getCurrentCourseProgress,
    setToCourse
}
import Course from "../models/Course.js"
import CourseProgress from "../models/CourseProgress.js";

const addNewCourse = async(req, res)=>{
    try {
        const courseData = req.body;
        // Include image path in the course data
        if (req.file) {
            courseData.image = req.file.path; // Save the file path
        }
        const newlyCreatedCourse = new Course(courseData)
        const saveCourse = await newlyCreatedCourse.save();
        
        if(saveCourse){
            res.status(201).json({
                success:true,
                message:"course is created successfuly",
                data:saveCourse
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"some error accured"
        })
    }
}
const getAllCourses = async(req, res)=>{
    try {
        const coursesList = await Course.find({})
        res.status(200).json({
            success:true,
            message:"courses list is fetched successfuly",
            data:coursesList
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"some error accured"
        })
    }
}
const getCourseDetailsById = async(req, res)=>{
    try {
        const {id} = req.params;
        const courseDetails = await Course.findById(id)
        if(courseDetails){
            res.status(200).json({
                success:true,
                message:"course details is fetched successfuly",
                data:courseDetails
            })
        }
        else{
            res.status(404).json({
                success:false,
                message:"course not found"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"some error accured"
        })
    }
}
const updateCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourseData = req.body;

        // Update the course and get the new version
        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            updatedCourseData,
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Get all existing progress records for this course
        const allProgress = await CourseProgress.find({ courseId: id });

        for (const progress of allProgress) {
            const existingModulesMap = new Map();
            progress.moduleProgress.forEach(mp => {
                existingModulesMap.set(mp.moduleId.toString(), mp);
            });

            const newModuleProgress = [];

            // Iterate through updated course modules
            for (const courseModule of updatedCourse.modules) {
                const moduleIdStr = courseModule._id.toString();
                const existingModule = existingModulesMap.get(moduleIdStr);

                if (existingModule) {
                    // Preserve progress for existing module
                    const existingLecturesMap = new Map();
                    existingModule.lectures.forEach(l => {
                        existingLecturesMap.set(l.lectureId.toString(), l);
                    });

                    const updatedLectures = courseModule.lectures.map(courseLecture => {
                        const lectureIdStr = courseLecture._id.toString();
                        return existingLecturesMap.get(lectureIdStr) || {
                            lectureId: courseLecture._id,
                            viewed: false, // New lectures start as unviewed
                            dateViewed: null
                        };
                    });

                    newModuleProgress.push({
                        ...existingModule.toObject(),
                        lectures: updatedLectures
                    });
                } else {
                    // Add new module without changing existing progress
                    newModuleProgress.push({
                        moduleId: courseModule._id,
                        subModules: courseModule.subModules.map(subModule => ({
                            subModuleId: subModule._id,
                            completed: false, // Default for new modules
                            lectures: subModule.lectures.map(lecture => ({
                                lectureId: lecture._id,
                                viewed: false,
                                dateViewed: null
                            }))
                        }))
                    });
                }
            }

            // Preserve the previous progress without resetting
            progress.moduleProgress = newModuleProgress.map(module => {
                const existingModule = existingModulesMap.get(module.moduleId.toString());
                return existingModule ? { ...module, completed: existingModule.completed } : module;
            });

            progress.completed = progress.moduleProgress.every(mp => mp.completed);
            await progress.save();
        }

        res.status(200).json({
            success: true,
            message: "Course updated with progress synchronization",
            data: updatedCourse
        });

    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


const deleteCourseById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required.",
            });
        }

        const deleteCourse = await Course.findByIdAndDelete(id);
        if (!deleteCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Course deleted successfully.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the course.",
        });
    }
};

const setUserToCourse = async(req, res)=>{
    const {userId,firstName,email,courseId} = req.body;
    if (!userId || !firstName || !email || !courseId) {
        console.error("Missing data:", { userId, firstName, email, courseId });
        return res.status(400).json({
            success: false,
            message: "userId, firstName, email, and courseId are required.",
        });
    }
    try {
        const data = await Course.findOne({ _id: courseId})

        data.students.push({
            studentId:userId,
            studentName:firstName,
            studentEmail:email
        })
        await data.save()
        res.status(200).json({
            success:true,
            message:"user added to course successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the course.",
        });
    }
}

export{
    addNewCourse,
    getAllCourses,
    getCourseDetailsById,
    updateCourseById,
    deleteCourseById,
    setUserToCourse,
}
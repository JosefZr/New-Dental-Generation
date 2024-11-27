import Course from "../models/Course.js"

const addNewCourse = async(req, res)=>{
    try {
        const courseData = req.body;
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
        const {id} =req.params;
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
const updateCourseById = async(req, res)=>{
    try {
        const {id} =req.params;
        const updatedCourseData = req.body

        const updatedCourse = await Course.findByIdAndUpdate(id,updatedCourseData,{new:true})
        if(!updatedCourse){
            res.status(404).json({
                success:false,
                message:"course not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"course updated successfuly",
            data:updatedCourse
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"some error accured"
        })
    }
}
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

export{
    addNewCourse,
    getAllCourses,
    getCourseDetailsById,
    updateCourseById,
    deleteCourseById
}
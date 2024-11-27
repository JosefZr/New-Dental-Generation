import Course from "../models/Course.js"
const getAllCourses = async(req, res)=>{
    try {
        const coursesList = await Course.find({})
        if(coursesList.length===0){
            return res.status(404).json({
                message: "No courses found", 
                success:false,
                data:[]
            })
        }
        else{
            return res.status(200).json({
                message: "Courses found", 
                success:true, 
                data:coursesList
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error fetching courses",
            success:false
        })
    }
}
const getCourseDetails = async(req, res)=>{
    try {
        const {id} = req.params;
        const courseDetails = await Course.findById(id);
        if(!courseDetails){
            return res.status(404).json({
                message: "Course details not found", 
                success:false,
                data:null
            })
        }else{
            return res.status(200).json({
                message: "Course details found",
                success:true,
                data:courseDetails
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error fetching courses",
            success:false
        })
    }
}
export {
    getAllCourses,
    getCourseDetails
}
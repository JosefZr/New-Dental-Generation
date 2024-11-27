import express from "express"

import {
    addNewCourse,
    getAllCourses,
    getCourseDetailsById,
    updateCourseById,
    deleteCourseById
} from '../controllers/instructor.js'

const router = express.Router();

router.post("/add",addNewCourse)
router.get("/get",getAllCourses)
router.get("/get/details/:id",getCourseDetailsById)
router.put("/update/:id",updateCourseById)
router.delete("/delete", deleteCourseById);



export default router

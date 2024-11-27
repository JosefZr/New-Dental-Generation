import express from "express"
import { getAllCourses,getCourseDetails} from "../controllers/studentCourse.js"

const router = express.Router()

router.get("/get", getAllCourses);
router.get("/get/details/:id", getCourseDetails);

export default router
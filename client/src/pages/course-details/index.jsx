import { CoursesContext } from "@/context/CoursesContext";

import { addUserToCourse, fetchStudentCourseDetailsService, fetchStudentCourseProgressionDetails, setLectureAsViewed } from "@/services";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import Header from "./components/Header";
import LectureList from "./components/LectureList";

export default function StudentViewCourseDetailsPage() {

    const {progress, setProgress} = useContext(CoursesContext)
    const {  setStudentViewCourseDetails, currentCoursedetailsId, setCurrentCourseDetailsId, studentCurrentCourseProgress, setStudentCurrentCourseProgress } = useContext(CoursesContext);

    const { setLoading } = useContext(CoursesContext);
    const { id } = useParams();
    const location = useLocation();
    const params = useParams();
    const userInfo = jwtDecode(localStorage.getItem("token"));
    async function setUserToProgress() {
        try {
            const course = await fetchStudentCourseProgressionDetails(userInfo.userId, params.id);
            setProgress(course);
            console.log(progress)
        } catch (error) {
            console.error("Error in setUserToACourse:", error);
            toast.error("An error occurred while setting progress.");
        }
    }

    async function setUserToACourse() {
        try {
            const course = await fetchStudentCourseDetailsService(params.id);
            if (!course || !Array.isArray(course.data.students)) {
                console.error("Invalid course data or students array is missing.");
                return;
            }
            const existingStudent = course.data.students.find(student => student.studentId === userInfo.userId);

            if (existingStudent) {
                console.warn("User already exists in the course.");
                return;
            }
            const res = await addUserToCourse(userInfo.userId, userInfo.firstName, userInfo.email, params.id);
            if (res?.success) {
                toast.success("Successfully enrolled in the course.");
            } else {
                toast.error("Failed to enroll.");
            }
        } catch (error) {
            console.error("Error in setUserToACourse:", error);
            toast.error("An error occurred while enrolling.");
        }
    }

    const fetchStudentViewCourseDetails = async () => {
        try {
            const response = await fetchStudentCourseDetailsService(currentCoursedetailsId);
            if (response?.success) {
                setStudentViewCourseDetails(response.data);
                console.log(response.data);
                await setUserToACourse();
                await setUserToProgress();
                toast.success(response.message);
            } else {
                setStudentViewCourseDetails(null);
                toast.error("Failed to fetch course details.");
            }
        } catch (error) {
            console.error("Error fetching course details:", error);
            toast.error("An error occurred while fetching the course details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentCoursedetailsId !== null) {fetchStudentViewCourseDetails() ,setUserToProgress()}
    }, [currentCoursedetailsId]);

    useEffect(() => {
        if (id) setCurrentCourseDetailsId(id);
    }, [id]);

    useEffect(() => {
        if (!location.pathname.includes('/course/details')) {
            setStudentViewCourseDetails(null), setCurrentCourseDetailsId(null);
        }
    }, [location.pathname]);

    return (
        <div className=" mx-auto p-1">
            <Header/>
            <LectureList/>
        </div>
    );
}

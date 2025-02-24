import { CoursesContext } from "@/context/CoursesContext";
import { 
  addUserToCourse, 
  fetchStudentCourseDetailsService, 
  fetchStudentCourseProgressionDetails 
} from "@/services";
import { useContext, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import Header from "./components/Header";
import LectureList from "./components/LectureList";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";

export default function StudentViewCourseDetailsPage() {
  const { 
    setProgress,
    setStudentViewCourseDetails,
    setLoading 
  } = useContext(CoursesContext);

  const { id } = useParams();
  const location = useLocation();
  const userInfo = useAuthUser();

  const fetchUserProgress = useCallback(async (courseId) => {
    try {
      const courseProgress = await fetchStudentCourseProgressionDetails(
        userInfo.userId, 
        courseId
      );
      setProgress(courseProgress);
    } catch (error) {
      console.error("Error fetching user progress:", error);
      toast.error("Failed to load course progress");
    }
  }, [userInfo.userId, setProgress]);

  const enrollUserInCourse = useCallback(async (courseId) => {
    try {
      const course = await fetchStudentCourseDetailsService(courseId);
      
      if (!course?.data?.students) {
        throw new Error("Invalid course data");
      }

      const isEnrolled = course.data.students.some(
        student => student.studentId === userInfo.userId
      );

      if (isEnrolled) {
        return true; // Already enrolled
      }

      const enrollment = await addUserToCourse(
        userInfo.userId,
        userInfo.firstName,
        userInfo.email,
        courseId
      );

      if (enrollment?.success) {
        toast.success("Successfully enrolled in the course");
        return true;
      } else {
        toast.error("Failed to enroll");
        return false;
      }
    } catch (error) {
      console.error("Error enrolling user:", error);
      toast.error("An error occurred while enrolling");
      return false;
    }
  }, [userInfo]);

  const loadCourseDetails = useCallback(async (courseId) => {
    if (!courseId) return;

    setLoading(true);
    try {
      const response = await fetchStudentCourseDetailsService(courseId);
      
      if (!response?.success) {
        throw new Error("Failed to fetch course details");
      }

      setStudentViewCourseDetails(response.data);
      
      const enrolled = await enrollUserInCourse(courseId);
      if (enrolled) {
        await fetchUserProgress(courseId);
      }
      
      console.log("Course details loaded successfully");
    } catch (error) {
      console.error("Error loading course details:", error);
      toast.error("Failed to load course details");
      setStudentViewCourseDetails(null);
    } finally {
      setLoading(false);
    }
  }, [
    setLoading,
    setStudentViewCourseDetails,
    enrollUserInCourse,
    fetchUserProgress
  ]);

  // Load course details when ID changes
  useEffect(() => {
    if (id) {
      loadCourseDetails(id);
    }
  }, [id, loadCourseDetails]);

  // Reset state when navigating away
  useEffect(() => {
    if (!location.pathname.includes('/course/details')) {
      setStudentViewCourseDetails(null);
      setProgress(null);
    }
  }, [location.pathname, setStudentViewCourseDetails, setProgress]);

  return (
    <div className="mx-auto p-1">
      <Header />
      <LectureList />
    </div>
  );
}
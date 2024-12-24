/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const CoursesContext = createContext();

const CourseProvider = ({ children }) => {
    const [studentCourseList, setStudentCourseList] = useState([])
    const [studentViewCourseDetails, setStudentViewCourseDetails] = useState(null)
    const [currentCoursedetailsId, setCurrentCourseDetailsId] = useState(null)
    const [loading, setLoading] = useState(true);
    const [studentCurrentCourseProgress, setStudentCurrentCourseProgress]= useState({})
    const[progress, setProgress] = useState(null)
    const [allProgress, setAllProgress] = useState(null)
  return (
    <CoursesContext.Provider value={{
        studentCourseList, setStudentCourseList,
        studentViewCourseDetails, setStudentViewCourseDetails,
        currentCoursedetailsId, setCurrentCourseDetailsId,
        studentCurrentCourseProgress, setStudentCurrentCourseProgress,
        loading, setLoading,
        progress, setProgress,
        allProgress, setAllProgress
    }}>
      {children}
    </CoursesContext.Provider>
  );
};

export default CourseProvider;

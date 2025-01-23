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
    const [searchTerm, setSearchTerm] = useState("")
    const [searchDeatiledCourse, setSearchDeatiledCourse] = useState("")
    const [selectedVideo, setSelectedVideo] = useState(null); // State for selected video
    const [selectedTitle, setSelectedTitle] = useState(null); // State for selected title
    const [videoProgress,setVideoProgress] = useState(0)
    const [free, setFree] = useState({})
  return (
    <CoursesContext.Provider value={{
        studentCourseList, setStudentCourseList,
        studentViewCourseDetails, setStudentViewCourseDetails,
        currentCoursedetailsId, setCurrentCourseDetailsId,
        studentCurrentCourseProgress, setStudentCurrentCourseProgress,
        loading, setLoading,
        progress, setProgress,
        allProgress, setAllProgress,
        searchTerm, setSearchTerm,
        searchDeatiledCourse, setSearchDeatiledCourse,
        selectedVideo, setSelectedVideo,
        selectedTitle, setSelectedTitle,
        videoProgress,setVideoProgress,
        free, setFree
    }}>
      {children}
    </CoursesContext.Provider>
  );
};

export default CourseProvider;

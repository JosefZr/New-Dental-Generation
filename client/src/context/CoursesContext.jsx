/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const CoursesContext = createContext();

const CourseProvider = ({ children }) => {
    const [studentCourseList, setStudentCourseList] = useState([])
  return (
    <CoursesContext.Provider value={{
        studentCourseList, setStudentCourseList
    }}>
      {children}
    </CoursesContext.Provider>
  );
};

export default CourseProvider;

import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/lib/default";
import { createContext, useState } from "react"

export  const InstructorContext = createContext();
// eslint-disable-next-line react/prop-types
export default function InstructorProvider({children}){
    const [courseLandingFormData, setCourseLandingFormData] = useState(courseLandingInitialFormData);
    const [courseCurriculmFormData,setCourseCurriculmFormData]=useState(courseCurriculumInitialFormData)
    const [mediaUploadProgress,setMediaUploadProgress]= useState(false)
    const [instructorCoursesList, setInstructorCoursesList] = useState([])
    const [currentEditedCourseId,setCurrentEditedCourseId]= useState(null)
    return <InstructorContext.Provider 
        value=
            {{
                courseLandingFormData, setCourseLandingFormData,
                courseCurriculmFormData,setCourseCurriculmFormData,
                mediaUploadProgress,setMediaUploadProgress,
                instructorCoursesList, setInstructorCoursesList,
                currentEditedCourseId,setCurrentEditedCourseId
            }}
        >{children}</InstructorContext.Provider>
}
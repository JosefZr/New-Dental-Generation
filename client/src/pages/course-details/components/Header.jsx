import { CoursesContext } from "@/context/CoursesContext";
import { Globe } from "lucide-react";
import { useContext } from "react";


export default function Header() {
    const { studentViewCourseDetails} = useContext(CoursesContext);
    
  return (
    <div className="text-my-black bg-my-murcery p-8 rounded-t-lg">
        <h1 className="text-3xl font-bold mb-4">{studentViewCourseDetails?.title}</h1>
        <p className="text-xl mb-4">{studentViewCourseDetails?.subtitle}</p>
        <div className="flex items-center space-x-4 text-sm">
            <span>Created By {studentViewCourseDetails?.instructorName}</span>
            <span>Created On {studentViewCourseDetails?.date?.split("T")[0]}</span>
            <span className="flex items-center gap-1">
                <Globe className="mt-1 h-4 w-4" />
                {studentViewCourseDetails?.primaryLanguage}
            </span>
            <span>
                {studentViewCourseDetails?.students.length} {studentViewCourseDetails?.students.length <= 1 ? "Student" : "students"}
            </span>
        </div>
    </div>
  )
}

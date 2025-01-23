import { Button } from "@/components/ui/button";
import Header from "../components/StudentView/Header";
import CoursesList from "@/components/StudentView/CoursesList";
import { MdCategory } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { useGetAllCourses } from "@/hooks/courses/useGetAllCourses";
import { CoursesContext } from "@/context/CoursesContext";
import toast from "react-hot-toast";
import { fetchStudentCourseProgression } from "@/services";
import { jwtDecode } from "jwt-decode";

export default function StudentViewCommonLayout() {
    const userInfo = jwtDecode(localStorage.getItem("token"));

    const {  setAllProgress,allProgress   } = useContext(CoursesContext);
    const { data: studentCourseList, isLoading, isError, error } = useGetAllCourses();

    
    useEffect(() => {
        if (studentCourseList) {
            setUserToProgress();
        }
    }, [studentCourseList]);

    async function setUserToProgress() {
        try {
            const course = await fetchStudentCourseProgression(userInfo.userId);
            setAllProgress(course);
        } catch (error) {
            console.error("Error in setUserToACourse:", error);
            toast.error("An error occurred while setting progress.");
        }
    }
    // Manage active tab state
    const [activeTab, setActiveTab] = useState("Categories"); // Default active tab

    // Function to get courses in progress
    const getCoursesInProgress = () => {
        if (!studentCourseList || !allProgress?.data) return [];
        
        return studentCourseList.filter(course => {
            const progressData = allProgress.data.find(prog => prog.courseId === course._id);
            if (!progressData) return false;
            
            const progressPercentage = Math.round(
                (progressData.lectureProgress.filter(lecture => lecture.viewed).length /
                    progressData.lectureProgress.length) * 100
            );
            return progressPercentage > 0;
        });
    };
    // Function to get favorite courses
    const getFavoriteCourses = () => {
        if (!studentCourseList || !allProgress?.data) return [];
        
        return studentCourseList.filter(course => {
            const progressData = allProgress.data.find(prog => prog.courseId === course._id);
            return progressData?.isFavorite === true;
        });
    };
    // Tab configuration
    const menuItems = [
        {
            label: "Categories",
            value: "Categories",
            component: () => <CoursesList 
                studentCourseList={studentCourseList}
                isLoading={isLoading}
                isError={isError}
                error={error}
            />,
        },
        {
            label: "In Progress",
            value: "In Progress",
            component: () => <CoursesList 
                studentCourseList={getCoursesInProgress()}
                isLoading={isLoading}
                isError={isError}
                error={error}
            />,
        },
        {
            label: "Favoris",
            value: "Favoris",
            component: () => <CoursesList 
                studentCourseList={getFavoriteCourses()}
                isLoading={isLoading}
                isError={isError}
                error={error}
            />,
        },
    ];

    return (
        <div>
            <Header studentCourseList={studentCourseList} allProgress={allProgress}/>
            <div className="min-h-screen bg-my-dark-blue">
                {/* Navigation Tabs */}
                <section className="max-sm:hidden flex h-8 font-medium mx-auto my-6 w-full gap-4 px-3">
                    {menuItems.map((menuItem, index) => (
                        <Button
                        key={index}
                        className={`flex flex-1 cursor-pointer items-center rounded-md justify-center transition-all ${
                            activeTab === menuItem.value
                            ? "text-my-black font-bold bg-my-gold hover:bg-my-gold/80"
                            : "text-my-white-gray bg-[#1d2932] hover:bg-[#1d2932]/80" // Updated inactive styles
                        }`}
                        onClick={() => setActiveTab(menuItem.value)}
                        >
                        <span className="whitespace-nowrap w-full text-md p-3 font-medium rounded-md duration-300 flex items-center justify-center">
                            <p className="flex flex-row items-center gap-3">
                                <MdCategory height="16px" width="16px" className="lucide lucide-loader-circle" />
                                {menuItem.label}
                            </p>
                        </span>
                        </Button>
                    ))}
                </section>
                <section className="sm:hidden  flex font-medium mt-[-2px] mb-2 h-[40px] max-w-[100vw] min-w-1   bg-alt-header">
                    {menuItems.map((menuItem, index) => (
                        <button
                        key={index}
                        className={` flex w-fit flex-1 cursor-pointer rounded-none items-center justify-center transition-all  ${
                            activeTab === menuItem.value
                            ? "font-bold text-my-beige border-b-2 border-my-beige "
                            : " text-my-gold border-b-2 border-transparent " // Updated inactive styles
                        }`}
                        onClick={() => setActiveTab(menuItem.value)}
                        >
                        <span style={{position:"relative"}} className="whitespace-nowrap w-full text-md  font-medium rounded-md duration-300 flex items-center justify-center">
                            {menuItem.label}
                        </span>
                        </button>
                    ))}
                </section>

                {/* Tab Content */}
                <section className=" mx-auto  py-8">
                    {menuItems.find((menuItem) => menuItem.value === activeTab)?.component(
                    )}
                </section>
            </div>
        </div>
    );
}

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Header from "../components/StudentView/Header";
import CoursesList from "@/components/StudentView/CoursesList";
import { MdCategory } from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
import { useGetAllCourses } from "@/hooks/courses/useGetAllCourses";
import { CoursesContext } from "@/context/CoursesContext";
import toast from "react-hot-toast";
import { fetchStudentCourseProgression } from "@/services";
import { FaRegBookmark } from "react-icons/fa6";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";

export default function StudentViewCommonLayout() {
    const userInfo = useAuthUser()

    const { setAllProgress, allProgress } = useContext(CoursesContext);
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
            if (!progressData || !progressData.lectureProgress) return false;
            
            const viewedLectures = progressData.lectureProgress.filter(lecture => lecture.viewed);
            const totalLectures = progressData.lectureProgress.length;
            
            if (!totalLectures) return false;
            
            const progressPercentage = Math.round(
                (viewedLectures.length / totalLectures) * 100
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
            logo: () => <MdCategory />
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
            logo: () => <AiOutlineLoading3Quarters />
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
            logo: () => <FaRegBookmark />
        },
    ];

    return (
        <div className="h-screen flex flex-col">
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 bg-my-dark-blue">
                <Header studentCourseList={studentCourseList} allProgress={allProgress} />
            </div>

            {/* Sticky Navigation Tabs */}
            <div className="sticky top-[60px] z-10 bg-my-dark-blue">
                {/* Desktop Tabs */}
                <section className="max-sm:hidden flex h-12 font-medium w-full gap-4 px-3 my-3">
                    {menuItems.map((menuItem, index) => (
                        <button
                            key={index}
                            className={`flex flex-1 cursor-pointer items-center rounded-md justify-center transition-all p-6 ${
                                activeTab === menuItem.value
                                    ? "text-my-black font-semibold bg-my-gold hover:bg-my-gold/80"
                                    : "text-my-white-gray bg-[#1d2932] hover:bg-[#1d2932]/80"
                            }`}
                            onClick={() => setActiveTab(menuItem.value)}
                        >
                            <span className="whitespace-nowrap w-full text-md p-3 font-medium rounded-md duration-300 flex items-center justify-center">
                                <p className="flex flex-row items-center gap-2">
                                    {React.createElement(menuItem.logo)}
                                    {menuItem.label}
                                </p>
                            </span>
                        </button>
                    ))}
                </section>

                {/* Mobile Tabs */}
                <section className="sm:hidden flex font-medium h-[40px] max-w-[100vw] min-w-1">
                    {menuItems.map((menuItem, index) => (
                        <button
                            key={index}
                            className={`flex w-fit flex-1 cursor-pointer rounded-none items-center justify-center transition-all ${
                                activeTab === menuItem.value
                                    ? "font-bold text-my-beige border-b-2 border-my-beige"
                                    : "text-my-gold border-b-2 border-transparent"
                            }`}
                            onClick={() => setActiveTab(menuItem.value)}
                        >
                            <span className="whitespace-nowrap w-full text-md font-medium rounded-md duration-300 flex items-center justify-center h-full">
                                {menuItem.label}
                            </span>
                        </button>
                    ))}
                </section>
            </div>

            {/* Scrollable Tab Content */}
            <div className="flex-1 custom-scroll overflow-y-auto py-2 ">
                {menuItems.find((menuItem) => menuItem.value === activeTab)?.component()}
            </div>
        </div>
    );
}
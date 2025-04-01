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
import FavList from "@/components/StudentView/FavList";
import { useGetAllUserProgress } from "@/hooks/courses/useGetAllUserProgress";

export default function StudentViewCommonLayout() {
    const userInfo = useAuthUser()
    const { setAllProgress, allProgress } = useContext(CoursesContext);
    const { data: studentCourseList, isLoading, isError, error } = useGetAllCourses();
    const { data: userProgress } = useGetAllUserProgress(userInfo.userId);

     // Sync progress data to context
     useEffect(() => {
        if (userProgress) {
            setAllProgress(userProgress);
        }
    }, [setAllProgress, userProgress]);
    useEffect(() => {
        if (studentCourseList) {
            setUserToProgress();
        }
    }, [setUserToProgress, studentCourseList]);

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

    const getCoursesInProgress = () => {
        if (!studentCourseList || !allProgress?.data) return [];
        
        return studentCourseList.filter(course => {
            const progressData = allProgress.data.find(prog => prog.courseId === course._id);
            if (!progressData?.moduleProgress) return false;
            
            const totalViewed = progressData.moduleProgress.reduce(
                (acc, module) => acc + module.subModules?.reduce(
                    (subAcc, subModule) => subAcc + (subModule.lectures?.filter(l => l.viewed)?.length || 0),
                    0
                ),
                0
            );
    
            return totalViewed > 0;
        });
    };
const getFavoriteCourses = () => {
    if (!studentCourseList || !allProgress?.data) return [];
    
    return studentCourseList.filter(course => {
        const progressData = allProgress.data.find(prog => prog.courseId === course._id);
        if (!progressData) return false;
    
        // Check if any lecture is favorited in this course
        return progressData.moduleProgress.some(module =>
            module.subModules.some(subModule =>
            subModule.lectures.some(lecture => lecture.isFavorite)
            )
        );
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
            component: () => <FavList 
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
                            className={`relative flex w-1/3 items-center justify-center py-3 cursor-pointer text-sm`}
                            onClick={() => setActiveTab(menuItem.value)}
                        >
                            <span className="whitespace-nowrap w-full text-md font-medium rounded-md duration-300 flex items-center justify-center h-full">
                                {menuItem.label}
                            </span>
                            <div
                        className={`absolute bottom-0 left-0 z-10 h-1 w-full ${
                        activeTab === menuItem.value ? "bg-my-gold" : "bg-[#282E33]"
                        }`}
                    ></div>
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
/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { LoadingSpinner } from "../server/ServerSideBar";
import { CoursesContext } from "@/context/CoursesContext";
import { useContext, useState } from "react";
import { useGetAllUserProgress } from "@/hooks/courses/useGetAllUserProgress";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaBookmark, FaLink } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { useFavorite } from "@/hooks/courses/useFavorite";
import { useQueryClient } from "react-query";
const Image = styled.div`
    background-image: ${(props) => `url(${props.imageUrl})`};
    background-size: cover;
    background-position: center top;
`;
export default function FavList({studentCourseList,isLoading, isError, error}) {
    const userInfo = useAuthUser();
    const favMutation = useFavorite();
    const queryClient = useQueryClient();
    const [expandedCourses, setExpandedCourses] = useState({});
    const {setAllProgress} = useContext(CoursesContext)
    // Toggle course expansion
    const toggleCourse = (courseId) => {
        setExpandedCourses(prev => ({
            ...prev,
            [courseId]: !prev[courseId]
        }));
    };
      // Get lecture title from course structure
    const getLectureTitle = (course, lectureId) => {
        let title = "Lecture";
        course.modules.forEach(module => {
            module.subModules.forEach(subModule => {
                const lecture = subModule.lectures.find(l => l._id === lectureId);
                if (lecture) title = lecture.title;
            });
        });
        return title;
    };
    // Get number of favorites for a course
    const getFavoriteCount = (courseId) => {
        return getFavoriteLectures(courseId).length;
    };

    const { data: allProgress, isLoading:isAllProgress, isError:isAllProgressError, error:allProgressError } = useGetAllUserProgress(userInfo.userId);
    // Get favorite lectures for selected course
    const getFavoriteLectures = (courseId) => {
    const progressData = allProgress?.find(prog => prog.courseId === courseId);
    if (!progressData) return [];

    const favorites = [];
    progressData.moduleProgress.forEach(module => {
        module.subModules.forEach(subModule => {
            subModule.lectures.forEach(lecture => {
            if (lecture.isFavorite) {
                favorites.push({
                ...lecture,
                moduleId: module.moduleId,
                subModuleId: subModule.subModuleId
                });
            }
            });
        });
        });
        return favorites;
    };
    // In FavList.jsx
    const handleCopyLectureLink = (courseId,moduleId, lectureId) => {
        const lectureUrl = `${window.location.origin }/#/course/details/${courseId}/${moduleId}/${lectureId}`;
        navigator.clipboard.writeText(lectureUrl);
        toast.success("Lecture link copied to clipboard!");
    };
    const { searchTerm  } = useContext(CoursesContext);
    // Filter courses based on search term from context
   // Optimized favorite toggle
// Update the handleFavorite function
const handleFavorite = (courseId, lectureId) => {
    if (!lectureId || !courseId) return;

    const previousProgress = [...allProgress];
    const updatedProgress = allProgress.map(courseProg => 
        courseProg.courseId === courseId ? {
            ...courseProg,
            moduleProgress: courseProg.moduleProgress.map(module => ({
                ...module,
                subModules: module.subModules.map(subModule => ({
                    ...subModule,
                    lectures: subModule.lectures.map(l => 
                        l.lectureId === lectureId 
                            ? { ...l, isFavorite: !l.isFavorite } 
                            : l
                    )
                }))
            }))
        } : courseProg
    );

    // Immediately update local state
    setAllProgress(updatedProgress);

    favMutation.mutate(
        { userId: userInfo.userId, courseId, lectureId },
        {
            onSuccess: () => {
                // Invalidate queries to force refresh
                queryClient.invalidateQueries(['userProgress', userInfo.userId]);
            },
            onError: () => {
                setAllProgress(previousProgress);
                toast.error("Failed to update favorite");
            }
        }
    );
};

// Filter courses with null check
const filteredCourses = studentCourseList?.filter(course =>
    course.title?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
) || [];

if (isLoading || isAllProgress) return <LoadingSpinner />;
if (isError) return <div>Error: {error.message}</div>;
if (!studentCourseList?.length) return <div>No courses available.</div>;
    return (
        <div  className="m-auto max-w-[645px] p-4 pb-28">
            {filteredCourses.length === 0 ? (
                <div className="text-center text-gray-500">No courses available.</div>
            ) : (
                <div className="flex flex-col gap-4">
                    {filteredCourses.map((item) => {
                        const favorites = getFavoriteLectures(item._id);
                        const isExpanded = expandedCourses[item._id];

                        return (
                            <div key={item._id} className="group flex">
                                <div className="rounded-l-md bg-slate-600/90 p-[3px] duration-300 group-hover:bg-my-gold"></div>
                                <div className="h-full w-full rounded-md rounded-l-none p-5 sm:px-7 sm:py-6 cursor-pointer"
                                    style={{ backgroundColor: "rgb(13 26 37" ,position:"relative"}} >
                                    
                                    {/* Course Header */}
                                    <div className="flex items-center gap-3 ">
                                        <div className=" max-w-24 flex-1 w-full">
                                            <Image
                                                className="h-24 w-24 rounded-lg"
                                                imageUrl={`${import.meta.env.VITE_SERVER_API}/uploads/course/${item.image}`}
                                            />
                                        </div>
                                        <div className="cursor-pointer w-full">
                                            <h3 className="font-semibold text-lg">{item.title}</h3>
                                            <p className="mb-1 font-light text-base-content/80 text-xs sm:text-sm">
                                                {item.description}
                                            </p>
                                            <div className="hidden sm:block mt-2">
                                                <button 
                                                    onClick={() => toggleCourse(item._id)}
                                                    className="flex w-full items-center gap-2 sm:w-fit btn-sm btn-primary px-2 py-1 rounded-md font-medium"
                                                >
                                                    <span className="font-semibold ">
                                                        {getFavoriteCount(item._id)}
                                                    </span>
                                                    BOOKMARKS
                                                    <IoIosArrowDown className={
                                                        `transition-transform font-semibold ${isExpanded ? 'rotate-180' : ''}`
                                                    }/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 block w-full sm:hidden">
                                        <button 
                                            className="btn btn-sm flex w-full items-center gap-2 sm:w-fit text-my-black bg-my-gold hover:bg-orange-200"
                                            onClick={() => toggleCourse(item._id)}
                                        >
                                            <span className="font-semibold ">
                                                        {getFavoriteCount(item._id)}
                                                    </span>
                                                    BOOKMARKS
                                                    <IoIosArrowDown className={
                                                        `transition-transform font-semibold ${isExpanded ? 'rotate-180' : ''}`
                                                    }/>
                                        </button>
                                    </div>
                                    <FaBookmark  className="w-5 h-5 absolute right-5 top-[-5px] text-my-gold"/>

                                    {/* Expanded Lectures */}
                                    {isExpanded && favorites.length > 0 && (
                                        <div className="flex-1">
                                            {favorites.map((lecture, idx) => (
                                                <div 
                                                    key={idx}
                                                    className="collapse-content p-0"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <div className="mt-2 flex flex-col gap-2 rounded-md p-1" style={{
                                                        backgroundColor:"hsl(210 27.586% 22.745%/.8)"
                                                    }}>
                                                        <Link 
                                                            to={`/course/details/${item._id}/${lecture.moduleId}/${lecture.lectureId}`}
                                                            className="flex cursor-pointer items-center gap-2 hover:bg-base-200/50 rounded p-2"
                                                        >
                                                            <div className="overflow-hidden flex-1 ">
                                                                <div className="flex items-center whitespace-pre font-semibold text-sm underline hover:underline sm:max-w-[420px] sm:no-underline">
                                                                    <div className="flex group-hover/fav:animate-marquee">
                                                                        {getLectureTitle(item, lecture.lectureId)}
                                                                    </div>     
                                                                    <MdOutlineKeyboardArrowRight className="text-2xl ml-1" /> </div>
                                                            </div>
                                                            <div className="flex items-center gap-2 ">
                                                                <button 
                                                                    className=" hover:bg-slate-600 p-1 rounded-full transition-all"
                                                                    onClick={(e) => {e.preventDefault(); e.stopPropagation(); handleCopyLectureLink(item._id,lecture.moduleId, lecture.lectureId)}}
                                                                ><FaLink className="text-xl  text-my-gold"/>
                                                                </button>
                                                                <button
                                                                    className="hover:bg-slate-600 p-1 rounded-full transition-all"
                                                                    onClick={(e) => {
                                                                        e.preventDefault(); // Prevent link navigation
                                                                        e.stopPropagation(); // Stop event bubbling
                                                                        handleFavorite(item._id, lecture.lectureId)
                                                                    }}
                                                                >
                                                                    <AiOutlineDelete className="text-xl text-my-gold" />
                                                                </button>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
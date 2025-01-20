import { CoursesContext } from "@/context/CoursesContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa6";
import toast from "react-hot-toast";
import { fetchStudentCourseProgression } from "@/services";
import { jwtDecode } from "jwt-decode";


const Image = styled.div`
    background-image: ${(props) => `url(${props.imageUrl})`};
    background-size: cover;
    background-position: center top;
`;

const Progress = styled.progress`
position: relative;
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    overflow: hidden;
    height: 0.5rem;
    border-radius: var(--rounded-box, 1rem);
`
export default function CoursesList() {
    const { studentCourseList, allProgress, setAllProgress } = useContext(CoursesContext);
    const navigate = useNavigate();
    const userInfo = jwtDecode(localStorage.getItem("token"));

    useEffect(() => {
        setUserToProgress();
    }, [studentCourseList]);

    async function setUserToProgress() {
        try {
            const course = await fetchStudentCourseProgression(userInfo.userId);
            setAllProgress(course);
            console.log(allProgress);
            console.log(studentCourseList);
        } catch (error) {
            console.error("Error in setUserToACourse:", error);
            toast.error("An error occurred while setting progress.");
        }
    }

    return (
        <div className="relative mx-auto w-full flex-1 transition-all duration-200 ease-in-out">
            <div className="grid w-full gap-4 overflow-auto pb-3 lg:grid-cols-2 xl:grid-cols-3 px-3">
                {studentCourseList.map((item, index) => {
                    // Check if the progress data exists for this course
                    const progressData = allProgress?.data?.find(
                        (prog) => prog.courseId === item._id
                    );

                    // Calculate the progress percentage if progress data exists, otherwise default to 0%
                    const progressPercentage = progressData
                        ? Math.round(
                            (progressData.lectureProgress.filter((lecture) => lecture.viewed).length /
                                  progressData.lectureProgress.length) *
                                100
                        )
                        : 0;

                    return (
                        <div
                            onClick={() => {
                                navigate(`/course/details/${item._id}`);
                            }}
                            key={index}
                            className="group flex "
                        >
                            <div className="rounded-l-md bg-slate-600/90 p-[3px] duration-300 group-hover:bg-my-gold"></div>
                            <div className="h-fit w-full rounded-md rounded-l-none p-5 sm:px-7 sm:py-6 cursor-pointer" style={{backgroundColor:"rgb(13 26 37)"}}>
                                <div className="flex gap-7">
                                    <div className="relative max-w-24 flex-1">
                                        <Image 
                                            className="relative h-24 w-full rounded-lg"
                                            imageUrl={`http://localhost:3000/course/${item.image}`}
                                        ></Image>
                                    </div>
                                    <div className="flex w-full flex-1 flex-col sm:w-[280px]">
                                        <h3 className="font-semibold text-lg">{item.title}</h3>
                                        <p className="mt-1 font-light text-base-content/80 text-xs">{item.description}</p>
                                    </div>
                                </div>
                                <div className="mt-3 block">
                                    <div className="mt-2 flex w-full flex-col gap-1 sm:mb-1">
                                        <Progress
                                            value={progressPercentage}
                                            max={100}
                                            className="progress h-1 bg-grey-400 [&::-webkit-progress-value]:bg-secondary progress-primary"
                                        ></Progress>
                                        <p className="mt-1 text-white text-xs text-opacity-80">
                                            {progressPercentage}% complete
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-1 ml-auto flex w-full justify-end sm:w-fit group">
                                    <button
                                        className="btn h-10 rounded-s border-none duration-500 font-semibold text-my-white bg-[rgb(29,41,50)] group-hover:bg-my-gold group-hover:text-my-black"
                                    >
                                        Enter Course {<FaAngleRight className="ml-2" />}
                                    </button>
                                    </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


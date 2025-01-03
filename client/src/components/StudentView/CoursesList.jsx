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
    background-position: center center;
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
        <div className="relative mx-auto w-[100vw] max-w-6xl flex-1 transition-all duration-200 ease-in-out">
            <div className="grid h-full w-fit grid-cols-1 gap-x-9 gap-y-5 overflow-auto pb-32 sm:h-fit lg:grid-cols-3 md:grid-cols-2 lg:gap-y-12 md:gap-y-9 m-auto">
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
                        >
                            <div className="flex h-fit w-full rounded-sm bg-primary-alt-base p-4 cursor-pointer">
                                <section className="relative">
                                    <Image 
                                        className="rounded-sm w-32 h-[176px]"
                                        imageUrl={`http://localhost:3000/course/${item.image}`}
                                    ></Image>
                                    <div className="absolute right-0 bottom-0 flex w-full flex-col gap-1 rounded-b-sm bg-[#32323267] px-3 pb-2 backdrop-blur-lg">
                                        <p className="pt-3 font-semibold text-white text-xs">
                                            {progressPercentage}% complete
                                        </p>
                                        <Progress
                                            value={progressPercentage}
                                            max={100}
                                            className="progress h-1 bg-grey-400 [&::-webkit-progress-value]:bg-secondary progress-primary"
                                        ></Progress>
                                    </div>
                                </section>
                                <section className="ml-4 flex max-w-[163px] flex-1 flex-col justify-between">
                                    <div className="">
                                        <h3 className="bg-secondary bg-clip-text font-semibold text-my-gold">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 font-light text-xs">
                                            {item.welcomeMessage}
                                        </p>
                                    </div>
                                    <button className="rounded-sm text-base-400 bg-my-gold text-my-black font-medium py-1 flex flex-row items-center justify-center">
                                        Enroll now {<FaAngleRight className="ml-2" />}
                                    </button>
                                </section>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


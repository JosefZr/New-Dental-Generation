import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CoursesContext } from "@/context/CoursesContext";
import { useGetAllUserProgress } from "@/hooks/courses/useGetAllUserProgress";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import { useContext } from "react";
import styled from "styled-components";

const Progress = styled.progress`
  position: relative;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  overflow: hidden;
  height: 0.2rem;
  border-radius: var(--rounded-box, 1rem);
`;

export default function ProgressOfCourse() {
  
  const { studentViewCourseDetails } = useContext(CoursesContext);
  const userInfo = useAuthUser();
  
  const {
    data: allProgress,
    isLoading: isAllProgress,
  } = useGetAllUserProgress(userInfo.userId);

  // Find progress data for the current course
  const progressData = allProgress?.find(
    (prog) => prog.courseId === studentViewCourseDetails?._id
  );

// Calculate total viewed lectures across all modules
const totalViewed = progressData?.moduleProgress?.reduce(
  (acc, module) => acc + module.lectures.filter(l => l.viewed).length,
  0
) || 0;

const totalLectures = progressData?.moduleProgress?.reduce(
  (acc, module) => acc + (module.lectures ? module.lectures.length : 0),
  0
) || 0;


// Calculate progress percentage
const progressPercentage = totalLectures > 0 
  ? Math.round((totalViewed / totalLectures) * 100)
  : 0;


  console.log("Total Viewed:", totalViewed);
  console.log("Total Lectures:", totalLectures);
  console.log("Progress Percentage:", progressPercentage);
  console.log("Module Progress Data:", progressData?.moduleProgress);

  if (isAllProgress) return <LoadingSpinner />;

  return (
    <div className="flex cursor-pointer items-center gap-4 rounded-md border transition-all duration-200 hover:opacity-100 pointer-events-none z-10 border-my-gold bg-base-500 p-4 opacity-100">
      <div className="flex-1 cursor-default">
        <div className="flex items-center gap-1">
          <p className="flex flex-1 items-center break-words font-semibold text-md capitalize sm:text-lg">
            {studentViewCourseDetails?.title}
          </p>
        </div>
        <section className="mt-1 flex flex-col gap-1">
          <p className="text-gray-400 text-xs">
            <strong className="text-my-white">
              {isAllProgress ? "Loading..." : `${progressPercentage}% `}
            </strong>
            complete
          </p>
          <Progress
            value={progressPercentage}
            max={100}
            className="progress h-1 bg-grey-400 [&::-webkit-progress-value]:bg-my-gold progress-primary"
          ></Progress>
        </section>
        <section className="mt-2 flex gap-2">
          <p className="font-light text-gray-400 text-xs">
            <span className="font-semibold text-my-white pr-1">
              {totalLectures}
            </span>
            lessons
          </p>
        </section>
      </div>
    </div>
  );
}
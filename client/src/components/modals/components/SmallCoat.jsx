import { LoadingSpinner } from "@/components/server/ServerSideBar"
import { useGetAllCourses } from "@/hooks/courses/useGetAllCourses"
import { useGetRandomQuoate } from "@/hooks/quoates/useGetRandomQuoate"
import { FaArrowRight } from "react-icons/fa6"
import { useLocation, useNavigate } from "react-router-dom"

export default function SmallCoat({handleClose}) {
        const location = useLocation();
        const isOnChannelsPage = location.pathname.includes(`/channels`);
        const { data: quoate , isLoading, isError, error } = useGetRandomQuoate({}, { enabled: isOnChannelsPage })
    const { data: courses , isLoading:isGettingCourses, isError:isCoursesError, error:courseError } = useGetAllCourses({}, { enabled: isOnChannelsPage })
    const navigate = useNavigate();
return (
    <div className='h-full !mt-[-20px] !pb-[100vh]'>
        <div className=" h-full" style={{position:"relative"}}>
            <div className="mt-3 flex flex-col gap-3">
            <div
                className="Card Card-side card-compact h-full min-w-[25dvw] gap-4 border-transparent"
                style={{ backgroundColor: "rgb(13 26 37)",
                    overflow: "visible", // Allow content overflow to test wrapping
                 }}
                >
                <div
                    className="relative flex h-full w-full flex-col items-center justify-center whitespace-pre-wrap text-xl bg-gradient-to-r from-white/70 via-white/90 to-white/70 bg-clip-text px-3 py-6 pt-7 text-center break-words"
                >
                    {/* Add a loading or fallback state */}
                    {isLoading && <LoadingSpinner />}
                    {isError && <p>Error: {error.message}</p>}
                    {quoate && (
                        <p
                        style={{
                            overflowWrap: "break-word", // Ensures long words break onto the next line
                            wordWrap: "break-word", // Legacy fallback
                            wordBreak: "break-word", // Forces word-breaking for long text
                            whiteSpace: "normal", // Prevents preformatted text behavior
                        }}
                        className="text-transparent mx-auto italic"
                        >
                        &ldquo;{quoate.text}&ldquo;
                        </p>
                    )}
                </div>
                </div>

                    {isGettingCourses && <LoadingSpinner/>}
                    {
                        courses?.length > 0 ? (
                            courses.map((course, index) => (
                                <div
                                    key={index}
                                    className="Card Card-compact h-full min-w-[25dvw] bg-gradient-to-br from-[#353F47] to-[rgba(6,14,21,0)]"
                                >
                                    <div className="relative h-[100px] xl:h-[130px] rounded-t-xl" style={{width:"100%"}}>
                                        <img
                                            src={`${import.meta.env.VITE_SERVER_API}/uploads/course/${course.image}`}
                                            alt="bg"
                                            className="h-full w-full object-cover  blur-sm"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-[#2c3137] to-[#1c2026] opacity-50"></div>
                                        <div className="absolute inset-0 flex size-full w-auto flex-shrink-0 items-center justify-center rounded-full">
                                            <img
                                                src={`${import.meta.env.VITE_SERVER_API}/uploads/course/${course.image}`}
                                                alt="bg"
                                                className="h-full w-full object-contain "
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="p-2 leading-5 rounded-b-xl border border-[#3a3f47]/20 border-t-none"
                                        style={{ fontSize: "0.875rem" }}
                                        onClick={() => {
                                            navigate(`/course/details/${course._id}`);
                                            handleClose();
                                        }}
                                    >
                                        <div className="flex cursor-pointer items-center justify-between">
                                            <div>
                                                <p>{course.title}</p>
                                                <p className="flex items-center gap-1 text-[1.25rem] leading-7 font-semibold">
                                                    {course.welcomeMessage}
                                                </p>
                                            </div>
                                            <FaArrowRight />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No courses available</p>
                        )
                    }
            </div>
        </div>
    </div>
  )
}


import { useRef } from 'react';
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useGetRandomQuoate } from '@/hooks/quoates/useGetRandomQuoate';
import { useGetAllCourses } from '@/hooks/courses/useGetAllCourses';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@/components/server/ServerSideBar';


const Carousel = styled.div`
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Card = styled.div`
    align-items: stretch;
    flex-direction: row;
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: var(--rounded-box, 1rem);
`;

const ScrollButton = styled.button`
    background-color: hsl(211.3 46.939% 9.6078%);
    border: 1px solid hsl(211.3 46.939% 9.6078%);
    color: white;
    border-radius: 50%;

    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: black;
    }
`;

export default function Carousels({handleClose}) {
    const carouselRef = useRef(null);
    const { data: quoate , isLoading, isError, error } = useGetRandomQuoate()
    const { data: courses , isLoading:isGettingCourses, isError:isCoursesError, error:courseError } = useGetAllCourses()
    
    const scrollLeft = () => {
        if (carouselRef.current) {
            const childWidth = carouselRef.current.firstElementChild?.offsetWidth || 300;
            carouselRef.current.scrollBy({ left: -childWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            const childWidth = carouselRef.current.firstElementChild?.offsetWidth || 300;
            carouselRef.current.scrollBy({ left: childWidth, behavior: 'smooth' });
        }
    };
    const navigate = useNavigate()
    return (
        <div className="col-span-3 row-span-3">
            <div className="h-full flex-row">
                <section></section>
                <div style={{position:"relative"}} className="h-full min-h-[200px]">
                    <Carousel ref={carouselRef} className="flex flex-row justify-start h-full min-h-[189px] gap-4 overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-lg pt-4">
                        <Card className="h-full min-w-[25dvw] gap-4 border-transparent sm:bg-gray-900">
                            <div className="flex h-full w-full flex-col items-center justify-center whitespace-pre-wrap text-balance bg-gradient-to-r from-white/70 via-white/90 to-white/70 bg-clip-text px-3 py-6 pt-7 text-center">
                                 {/* Add a loading or fallback state */}
                            {isLoading && <LoadingSpinner/>}
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
                        </Card>
                        {isGettingCourses && <LoadingSpinner/>}
    {
    courses?.length > 0 ? (
        courses.map((course, index) => (
            <Card
                key={index}
                className="card card-compact h-full min-w-[25dvw] bg-gradient-to-br from-[#353F47] to-[rgba(6,14,21,0)]"
            >
                <div className="relative h-[100px] xl:h-[130px]">
                    <img
                        src={`http://localhost:3000/course/${course.image}`}
                        alt="bg"
                        className="h-full w-full object-cover blur-sm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#2c3137] to-[#1c2026] opacity-50"></div>
                    <div className="absolute inset-0 flex size-full w-auto flex-shrink-0 items-center justify-center rounded-full">
                        <img
                            src={`http://localhost:3000/course/${course.image}`}
                            alt="bg"
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>
                <div
                    className="p-2 leading-5 rounded-lg border border-[#3a3f47]/20 border-t-none"
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
            </Card>
        ))
    ) : (
        <p className="text-center text-gray-500">No courses available</p>
    )
}

                    </Carousel>
                    <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-r from-transparent to-neutral"></div>
                    <div className="absolute top-0 left-0 flex h-full w-full items-center justify-between p-1">
                        <ScrollButton onClick={scrollLeft} className="z-10 bg-my-dark-blue">
                            <IoIosArrowBack size={24} className=''/>
                        </ScrollButton>
                        <ScrollButton onClick={scrollRight} className="z-10">
                            <IoIosArrowForward size={24} />
                        </ScrollButton>
                    </div>
                </div>
            </div>
        </div>
    )
}


import {
    Drawer,
    DrawerContent,
    DrawerHeader,
} from "@/components/ui/drawer";
import { useGetAllCourses } from "@/hooks/courses/useGetAllCourses";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { useState } from "react";
import { FaSearchDollar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../server/ServerSideBar";

export default function SearchModal() {
    const { isOpen, onClose, type } = useModal();
    const location = useLocation();

    const isModalOpen = isOpen && type === MODAL_TYPE.SEARCH_MODAL;
    const isOnCoursesPage = location.pathname.includes("/course");
// Add this check before your filteredCourses

    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // Only fetch courses when modal is open and on courses page
    const { data: studentCourseList, isLoading, isError, error } = useGetAllCourses({
        enabled: isModalOpen && isOnCoursesPage,
    });
    if (!isOnCoursesPage) return null;

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter courses only if on courses page
    const filteredCourses = isOnCoursesPage
        ? studentCourseList?.filter((course) =>
              course.title.toLowerCase().includes(searchTerm.toLowerCase())
          ) || []
        : [];

    const handleClose = () => {
        onClose();
        setSearchTerm("");
    };

    return (
        <Drawer
            open={isModalOpen}
            onOpenChange={handleClose}
            className="pointer-events-auto flex transform cursor-auto justify-center transition-all duration-[250ms] lg:items-center items-end animate-slide-up"
        >
            <DrawerContent className="border-none flex flex-col shadow-xl sm:w-full lg:rounded-lg mx-auto w-full md:max-w-[32rem] md:w-[91%] rounded-t-lg max-h-[95%] pointer-events-auto !max-w-unset h-full justify-end bg-transparent">
                <DrawerHeader className="p-0 gap-0 rounded-t-lg bg-transparent overflow-hidden">
                    <div className="px-2 " style={{ backgroundColor: "rgb(29 41 50)" }}>
                        <div className="w-full" style={{ position: "relative" }}>
                            <FaSearchDollar
                                height="24px"
                                width="24px"
                                style={{ position: "absolute" }}
                                className="top-0 bottom-0 left-2 z-10 m-auto text-gray-300"
                            />
                            <section style={{ position: "relative" }}>
                                <input
                                    type="text"
                                    className="input md:max-w-[100%] pl-0 my-3 w-full flex-1 py-4 input-sm input-bordered focus:outline-offset-0"
                                    placeholder="Search lessons"
                                    style={{ paddingLeft: "32px" }}
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                />
                                <button
                                    className="btn absolute top-0 right-3 bottom-0 m-auto btn-xs btn-circle btn-ghost"
                                    onClick={handleClose}
                                >
                                    <IoMdClose height="16px" width="16px" className="text-xl" />
                                </button>
                            </section>
                        </div>
                    </div>
                    <div
                        className="h-[80dvh] overflow-auto bg-alt-base-200 pb-10"
                        style={{
                            backgroundColor: "rgb(13 26 37)",
                        }}
                    >
                        {!isOnCoursesPage ? (
                            <p className="text-center text-gray-500 mt-4">
                                Navigate to the course page to search lessons.
                            </p>
                        ) : isLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <LoadingSpinner />
                            </div>
                        ) : isError ? (
                            <div className="text-center text-red-500">
                                Error: {error.message}
                            </div>
                        ) : filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => (
                                <div
                                    key={course._id}
                                    className="flex w-full cursor-pointer flex-col justify-center border-b-2 border-zinc-700 bg-[rgb(13 26 37)] p-2 hover:bg-slate-800"
                                    onClick={() => {
                                        navigate(`/course/details/${course._id}`);
                                        handleClose();
                                    }}
                                >
                                    <div className="flex items-center text-xs uppercase opacity-80 pl-1">
                                        {course.title}
                                    </div>
                                    <div
                                        className="overflow-hidden"
                                        style={{ position: "relative" }}
                                    >
                                        <div className="flex items-center whitespace-pre pt-1 text-sm">
                                            <div className="flex group-hover:animate-marquee">
                                                <p className="text-left font-semibold text-sm">
                                                    {course.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 mt-4">
                                No courses found.
                            </p>
                        )}
                    </div>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
}
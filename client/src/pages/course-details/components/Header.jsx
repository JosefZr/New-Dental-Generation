import { CoursesContext } from "@/context/CoursesContext";
import { useContext, useState } from "react";

import { IoIosSearch, IoMdArrowRoundBack, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";


export default function Header() {
    const { studentViewCourseDetails } = useContext(CoursesContext);
        const {searchDeatiledCourse, setSearchDeatiledCourse} = useContext(CoursesContext); // State for search input
        const [isOpen, setIsOpen]= useState(false)


    const handleInputChange = (e) => {
        setSearchDeatiledCourse(e.target.value);
    };
    return (
        <>
        <div
            className="flex flex-shrink-0 items-end justify-between relative bg-[#0A1720]"
            style={{
            height: "48px",
            minHeight: "48px",
            maxHeight: "48px",
            paddingTop: "0",
            }}
        >
            <section className="flex h-full w-full items-center justify-between pr-3 border-b-0 border-transparent">
            <div className="flex w-full items-center font-medium">
                <div className="flex items-center gap-3 flex-1 justify-start">
                <Link to="/course">
                    <button className="btn ml-2 btn-sm btn-circle btn-ghost"
                        
                    >
                    <IoMdArrowRoundBack
                        height="24px"
                        width="24px"
                        className="text-white text-2xl"
                    />
                    </button>
                </Link>
                <div
                    style={{ position: "relative" }}
                    className="max-w-[240px] flex-1 overflow-hidden"
                >
                    <div className="whitespace-pre font-medium">
                    <p className="truncate text-start text-base-content group-hover/title:animate-marquee">
                        {studentViewCourseDetails?.title}
                    </p>
                    </div>
                </div>
                </div>
            </div>
            <div className="flex items-center">
                <button className="btn  btn-sm btn-circle btn-ghost" onClick={()=>{
                            setIsOpen(!isOpen)
                        }}>
                    <IoIosSearch  
                        height="24px"
                        width="24px"
                        className="text-white text-xl"
                    />
                </button>
                <Link to="/channels">
                <button className="btn btn-sm btn-circle btn-ghost">
                    <IoMdClose
                    height="24px"
                    width="24px"
                    className="text-white text-xl"
                    />
                </button>
                </Link>
            </div>
            </section>
        </div>

        <div className="flex flex-1 flex-col overflow-y-hidden sm:block">
            <div className="-top-[-2px] sticky z-10 bg-alt-background pb-0">
            <div>
               
            </div>
            {
                isOpen &&   <div className="group   mx-2" style={{position:"relative"}}>
                <section  style={{position:"relative"}}>
                <input 
                    type="text" 
                    className="input md:max-w-[100%] focus:border-gray-700 pl-0 my-3 w-full flex-1 py-4   input-sm  focus:outline-offset-0" 
                    placeholder="Search lessons" 
                    style={{paddingLeft:"32px",backgroundColor:"#17242d"}}
                    value={searchDeatiledCourse}
                    onChange={handleInputChange}
                />
                <button 
                    className="btn absolute top-0 right-3 bottom-0 m-auto btn-xs btn-circle btn-ghost"
                    onClick={() => 
                        setSearchDeatiledCourse("")
                    } // Clear input on click
                >
                    <IoMdClose height="16px"width="16px"  className="text-xl"/>
                </button>
            </section>
        </div>
            }
        </div>
    </div>
    </>
);
}

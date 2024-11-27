import { CoursesContext } from "@/context/CoursesContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa6";

const Image = styled.div`
        background-image: url(https://assets.therealworld.ag/uploads/jJPD3KPToMPQyTj1JGDrj2lPWK0rEwPGnDhCkv-Vcb?max_side=500);
    background-size: cover;
    background-position: center center;
`
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
    const {studentCourseList} = useContext(CoursesContext)

  return (
    <div className="relative mx-auto w-[100vw] max-w-6xl flex-1 transition-all duration-200 ease-in-out">
        <div className="grid h-full w-fit grid-cols-1 gap-x-9 gap-y-5 overflow-auto pb-32 sm:h-fit lg:grid-cols-3 md:grid-cols-2 lg:gap-y-12 md:gap-y-9 m-auto">
            {
                studentCourseList.map((item, index) => (
                    <Link
                        key={index}
                    >
                        <div className="flex h-fit w-full rounded-sm bg-primary-alt-base p-4 cursor-pointer">
                            <section className="relative">
                                <Image className="rounded-sm w-32 h-[176px]"></Image>
                                <div className="absolute right-0 bottom-0 flex w-full flex-col gap-1 rounded-b-sm bg-[#32323267] px-3 pb-2 backdrop-blur-lg">
                                    <p className="pt-3 font-semibold text-white text-xs">100 % complete</p>
                                    <Progress className="progress h-1 bg-grey-400 [&::-webkit-categoryProgress-value]:bg-secondary progress-primary"></Progress>
                                </div>
                            </section>
                            <section className="ml-4 flex max-w-[163px] flex-1 flex-col justify-between">
                                <div className="">
                                    <h3 className="bg-secondary bg-clip-text font-semibold  text-my-gold">{item.title}</h3>
                                    <p className="mt-3 font-light text-xs">{item.welcomeMessage}</p>
                                </div>
                                <button className="rounded-sm text-base-400  bg-my-gold text-my-black font-medium py-1 flex flex-row items-center justify-center ">Enoll now {<FaAngleRight className="ml-2" />}</button>
                            </section>
                        </div>
                    </Link>
                )) 
             } 
        </div>
    </div>
  )
}

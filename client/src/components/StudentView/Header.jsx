import { GraduationCap } from "lucide-react";
import { FaSearchDollar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function Header() {
    return (
        <header style={{position:"relative"}} className=" flex items-center justify-between flex-row gap-3 px-2 py-3">
            <div className="flex items-center space-x-1 ">
            <GraduationCap className="h-20 w-20 pr-3 bg-my-dark-blue text-my-gold" height="30px" width="32px"/>

                <h2  className="flex flex-col">
                    <span className="text-base text-base-content/80 md:text-lg">Learning Center</span>
                    <span className="font-semibold text-2xl md:text-4xl">Business Mastery</span>
                </h2>
            </div>
            <div className="">
                <div className="max-w-xl">
                    <div className=" w-full sm:w-fit flex flex-row items-center " style={{position:"relative"}}>
                        <FaSearchDollar height="16px" width="16px" className="absolute top-0 bottom-0 left-2 z-10 m-auto text-gray-300"/>
                        <section style={{position:"relative"}}>
                            <input 
                                type="text" 
                                placeholder="Search lessons"
                                style={{paddingLeft:"30px"}}
                                className="input my-3 flex-1 py-4 pr-1 pl-9 mx-auto w-fit bg-alt-base-200 input-sm input-bordered focus:outline-offset-0"
                            />
                            <button className="btn absolute top-0 right-3 bottom-0 m-auto btn-xs btn-circle btn-ghost">
                                <IoMdClose height="16px"width="16px"  className="text-xl"/>
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </header>
    )
}

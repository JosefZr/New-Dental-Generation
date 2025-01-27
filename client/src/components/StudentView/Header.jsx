import { CoursesContext } from "@/context/CoursesContext";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { GraduationCap } from "lucide-react";
import { useContext } from "react";
import { FaSearchDollar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Header() {
    const { onOpen } = useModal();
    const {searchTerm, setSearchTerm} = useContext(CoursesContext)
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };
    const onOpenModal = ()=>{
        onOpen(MODAL_TYPE.SEARCH_MODAL)
    }
    return (
        <>
        <div className="sm:hidden flex flex-shrink-0 items-end justify-between border-grey-secondary  relative bg-alt-header" style={{
            height:"62px",
            minHeight:"62px",
            maxHeight:"62px",
            paddingTop:"0"
        }}>
            <div className="flex h-full w-full items-center justify-between pr-3">
                <div className="flex w-full items-center font-medium">
                    <div className="flex items-center justify-center gap-3">
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-start justify-center gap-1 text-center">
                            <div className="ml-3 flex max-w-[350px] items-center justify-center sm:max-w-none">
                                <GraduationCap className="h-10 w-10 pr-3 bg-my-dark-blue text-my-gold" height="24px" width="25px"/>
                                <p className="font-semibold text-lg text-white">Learning Center</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div >
                        <button className="btn mr-2 btn-sm btn-circle btn-ghost" onClick={onOpenModal}>
                            <FaSearchDollar height="24px" width="24px" className=" m-auto text-gray-300"/>
                        </button>
                    </div>
                </div>
                <Link
                    to="/channels"
                    className="btn flex items-center btn-sm btn-circle btn-ghost"
                    
                >
                    <IoMdClose height="16px"width="16px"  className="text-xl"/>
                </Link>
            </div>
        </div>
        <header style={{position:"relative"}} className="max-sm:hidden flex items-center justify-between flex-row gap-3 px-2 py-3">
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
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            {searchTerm && (
                                <button 
                                    className="btn absolute top-0 right-3 bottom-0 m-auto btn-xs btn-circle btn-ghost"
                                    onClick={clearSearch}
                                >
                                    <IoMdClose height="16px" width="16px" className="text-xl"/>
                                </button>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </header>
        </>
        
    )
}

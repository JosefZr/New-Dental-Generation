import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";


export default function MessageHeader({cahnTitle}) {
    const {isSidebarOpen, setIsSidebarOpen} = useContext(UserContext);
    
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
return (
    <header
    className="flex flex-shrink-0 items-end justify-between !pt-0 relative z-10 border-grey-secondary bg-base-300"
    >
    <section className="flex h-full w-full items-center justify-between pl-3 py-2 text-lg bg-[#213043] ">
        <div className="flex w-full items-center font-medium">
        <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-3 font-medium cursor-pointer">
                <GiHamburgerMenu className=" max-sm:block hidden text-2xl"onClick={toggleSidebar}/>
            <span className="flex items-center gap-[2px]">
                {cahnTitle}
            </span>
            </div>
        </div>
        </div>
    </section>
</header>  
)
}

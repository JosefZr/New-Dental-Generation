import { UserContext } from "@/context/UserContext";
import { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Job from "./components/Job";
import Staff from "./components/Staff";
    const menuItems = [
        {
            label: "I WANT A JOB",
            value: "I WANT A JOB",

            component: () => <Job />,
        },
        {
            label: "I WANT STAFF",
            value: "I WANT STAFF",

            component: () => <Staff />,
        },
    ];
export default function JobOpportunities() {
        const [activeTab, setActiveTab] = useState("I WANT A JOB"); // Default active tab
    
        const { setIsSidebarOpen, isSidebarOpen } = useContext(UserContext)
        const toggleSidebar = () => {
            setIsSidebarOpen((prev) => !prev)
        }
    return (
        <div
        className={`min-h-screen bg-[#0B1015] text-white transition-transform duration-300 ${
            isSidebarOpen ? "ml-[-72px]" : ""
        }`}
        >
            <div className="flex items-center">
                <button className="p-2 hover:bg-gray-800 rounded-full" onClick={toggleSidebar} id="push">
                    <GiHamburgerMenu className="text-2xl text-white" />
                </button>
            </div>
            <main className=" w-full h-full overflow-y-auto transition-transform duration-300">
            <div className="h-screen flex flex-col">
                {/* Sticky Navigation Tabs */}
                <div className="sticky z-10 bg-my-dark-blue">
                    {/* Desktop Tabs */}
                    <section className=" flex h-auto font-medium w-full gap-4 max-sm:gap-1 px-3 max-sm:px-0 my-3">
                        {menuItems.map((menuItem, index) => (
                            <button
                                key={index}
                                className={`flex  cursor-pointer transition-all justify-center items-center w-full `}
                                style={{
                                    backgroundImage:"    background-image: linear-gradient(rgb(255, 255, 255), rgb(153, 153, 153) 37%, rgb(153, 153, 153) 68%, rgb(255, 255, 255) 103%)"
                                }}
                                onClick={() => setActiveTab(menuItem.value)}
                            >
                                <div className={`  mt-0 block py-[17px] px-[69px] max-md:px-0 max-md:py-[10px] w-full rounded-[100px] border-t-[2px] border-x-[1px] border-b-[1px] border-white  ${
                                        activeTab === menuItem.value
                                            ? "text-my-black font-semibold bg-my-gold hover:bg-my-gold/80"
                                            : "text-my-white-gray bg-[rgb(19,19,32)] hover:bg-[#1d2932]/80"
                                        }
                                    `}
                                >
                                    <p className="flex justify-center text-[1.2rem]  font-medium mx-auto "
                                    style={{
                                        backgroundImage: "linear-gradient(117deg, rgb(255, 255, 255) 66%, rgb(153, 153, 153))",
                                        backgroundClip: "text",
                                        fontFamily:"Plus Jakarta Sans, sans-serif",
                                        lineHeight:"1"
                                    }}>
                                        {menuItem.label}
                                    </p>
                                
                                </div>
                            </button>
                        ))}
                    </section>
    
                    {/* Mobile Tabs */}
                    {/* <section className="sm:hidden flex font-medium h-[40px] max-w-[100vw] min-w-1">
                        {menuItems.map((menuItem, index) => (
                            <button
                                key={index}
                                className={`flex w-fit flex-1 cursor-pointer rounded-none items-center justify-center transition-all ${
                                    activeTab === menuItem.value
                                        ? "font-bold text-my-beige border-b-2 border-my-beige"
                                        : "text-my-gold border-b-2 border-transparent"
                                }`}
                                onClick={() => setActiveTab(menuItem.value)}
                            >
                                <span className="whitespace-nowrap w-full text-md font-medium rounded-md duration-300 flex items-center justify-center h-full">
                                    {menuItem.label}
                                </span>
                            </button>
                        ))}
                    </section> */}
                </div>
    
                {/* Scrollable Tab Content */}
                <div className="flex-1 custom-scroll overflow-y-auto">
                    {menuItems.find((menuItem) => menuItem.value === activeTab)?.component()}
                </div>
            </div>
        </main>
        </div>
    )
}

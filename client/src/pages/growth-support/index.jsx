import { UserContext } from "@/context/UserContext";
import { useContext, useState } from "react";
import BuildScale from "./components/BuildScale";
// import BuisnessSecret from "./components/BuisnessSecret";
// import MindMastery from "./components/MindMastery";
import { GiHamburgerMenu } from "react-icons/gi";

    const menuItems = [
        {
            label: "Build and Scale",
            value: "Build and Scale",

            component: () => <BuildScale />,
        },
        // {
        //     label: "Business Secrets",
        //     value: "Business Secrets",

        //     component: () => <BuisnessSecret />,
        // },
        // {
        //     label: "Mind Mastery",
        //     value: "Mind Mastery",

        //     component: () => <MindMastery />,
        // },
    ];
export default function GrowthSupport() {
    const [activeTab, setActiveTab] = useState("Build and Scale"); // Default active tab
    
    const { setIsSidebarOpen,isSidebarOpen } = useContext(UserContext);
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };
    return (
    <div className={`min-h-screen bg-[#0B1015] text-white transition-transform duration-300 ${
            isSidebarOpen ?"ml-[-72px] ":""
        }`}>
        {/* <NavigationBar /> */}
        <main className=" w-full h-full overflow-y-auto transition-transform duration-300">
            <div className="h-screen flex flex-col">
                {/* Sticky Navigation Tabs */}
                <div className=" z-10 bg-my-dark-blue" style={{
                    position:"sticky",
                    top:0,
                    left:0,
                    right:0,
                    zIndex:10,
                }}>
                    
                    {/* Desktop Tabs */}
                    <section className=" flex h-12 font-medium w-full gap-4 max-sm:gap-1 px-3 max-sm:px-0 my-3">
                    <div className="flex items-center">
                        <button className="p-2 hover:bg-gray-800 rounded-full" onClick={toggleSidebar} id="push">
                            <GiHamburgerMenu className=" text-2xl text-white" />
                        </button>
                    </div>
                        {menuItems.map((menuItem, index) => (
                            <button
                                key={index}
                                className={`flex flex-1 cursor-pointer items-center rounded-md justify-center transition-all p-6 max-sm:p-0 ${
                                    activeTab === menuItem.value
                                        ? "text-my-black font-semibold bg-my-gold hover:bg-my-gold/80"
                                        : "text-my-white-gray bg-[#1d2932] hover:bg-[#1d2932]/80"
                                }`}
                                onClick={() => setActiveTab(menuItem.value)}
                            >
                                <span className="whitespace-nowrap w-fit text-md p-3 max-sm:p-1 font-medium rounded-md duration-300 flex items-center justify-center">
                                    <p className="flex flex-row items-center gap-2 max-sm:gap-1">
                                        {menuItem.label}
                                    </p>
                                </span>
                            </button>
                        ))}
                        
                    </section>
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

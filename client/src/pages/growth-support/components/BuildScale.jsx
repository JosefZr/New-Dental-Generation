import { useState } from "react";
import FreeMarketingAnalysis from "./FreeMarketingAnalysis";
import Home from "./Home";
import Solutions from "./Solutions";

const menuItems = [
        {
            label: "Home",
            value: "Home",
            component: () => <Home />,
        },
        {
            label: "Solutions",
            value: "Solutions",
            component: () => <Solutions />,
        },
        {
            label: "Free Quote",
            value: "Free Quote",
            component: () => <FreeMarketingAnalysis />,
        },
    ];
export default function BuildScale() {
      const [activeTab, setActiveTab] = useState("Home"); // Default active tab
    return (
    <div className={`min-h-screen bg-[#0B1015] text-white transition-transform duration-300 `}>
        {/* <NavigationBar /> */}
        <main className=" w-full h-full overflow-y-auto transition-transform duration-300">
            <div className="h-screen flex flex-col">
                {/* Sticky Navigation Tabs */}
                <div className="sticky z-10 bg-my-dark-blue">
                    {/* Desktop Tabs */}
                    {/* <section className=" flex h-12 font-medium w-full gap-4 px-3 my-3">
                        {menuItems.map((menuItem, index) => (
                            <button
                                key={index}
                                className={`flex flex-1 cursor-pointer items-center rounded-md justify-center transition-all p-6 ${
                                    activeTab === menuItem.value
                                        ? "text-my-black font-semibold bg-my-gold hover:bg-my-gold/80"
                                        : "text-my-white-gray bg-[#1d2932] hover:bg-[#1d2932]/80"
                                }`}
                                onClick={() => setActiveTab(menuItem.value)}
                            >
                                <span className="whitespace-nowrap w-full text-md p-3 font-medium rounded-md duration-300 flex items-center justify-center">
                                    <p className="flex flex-row items-center gap-2">
                                        {menuItem.label}
                                    </p>
                                </span>
                            </button>
                        ))}
                    </section> */}

              {/* Mobile Tabs */}
                <section className=" flex font-medium h-[40px] max-w-[100vw] min-w-1">
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
                </section>
            </div>

            {/* Scrollable Tab Content */}
            <div className="flex-1 custom-scroll overflow-y-hidden pb-2 w-full">
                {menuItems.find((menuItem) => menuItem.value === activeTab)?.component()}
            </div>
        </div>
    </main>
    </div>
)
}

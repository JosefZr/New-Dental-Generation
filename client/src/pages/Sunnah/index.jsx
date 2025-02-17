import { TbHomeInfinity } from "react-icons/tb";
import { GiHamburgerMenu, GiPrayerBeads } from "react-icons/gi";
import { LiaPrayingHandsSolid } from "react-icons/lia";
import { TbBuildingMosque } from "react-icons/tb"
import { GiSpellBook } from "react-icons/gi";
import SunnahHome from "./components/SunnahHome";
import Adkar from "./components/Adkar";
import Dua from "./components/Dua";
import Salat from "./components/Salat";
import Quran from "./Quran";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { BottomNavigation } from "./BottomNavigation";

    const menuItems = [
        {
            label: "Home",
            value: "Home",

            component: () => <SunnahHome />,
            icon:<TbHomeInfinity className="object-cover w-full h-full" />,
        },
        {
            label: "Adkar",
            value: "Adkar",

            component: () => <Adkar />,
            icon:<GiPrayerBeads className="object-cover w-full h-full" />,
        },
        {
            label: "Do'a",
            value: "Do'a",

            component: () => <Dua />,
            icon:<LiaPrayingHandsSolid className="object-cover w-full h-full" />,

        },
        {
            label: "Salat",
            value: "Salat",
            component: () => <Salat />,
            icon:<TbBuildingMosque className="object-cover w-full h-full" />,
        },
        {
            label: "Quran",
            value: "Quran",

            component: () => <Quran />,
            icon:<GiSpellBook className="object-cover w-full h-full" />,
        },

    ];
export default function Sunnah() {
const [activeTab, setActiveTab] = useState("Home"); // Default active tab


    const { setIsSidebarOpen,isSidebarOpen, viewType, setViewType } = useContext(UserContext);
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };
    
    return (
        <div
        className={`min-h-screen bg-[#1E1E1E] text-white  transition-transform duration-300 pb-24 ${
            isSidebarOpen ? "ml-[-72px]" : ""
        }`}
        >
        <div className={`flex flex-row justify-start items-center `}>
            <div className="flex items-center justify-between gap-1 w-full">
                <div className="flex items-center">
                    <button className="p-2 hover:bg-gray-800 rounded-full" onClick={toggleSidebar} id="push">
                        <GiHamburgerMenu className=" text-2xl text-white" />
                    </button>
                    <h1 className="text-xl sm:text-2xl font-semibold text-white ml-2">MONEY IN</h1>
                </div>
                <div className="flex flex-row items-center  p-2">
                <select
                    className="bg-[#101214] border-[#282F35] cursor-pointer border-1 text-white p-2 rounded-md active:border-[#282F35]"
                    value={viewType}
                    onChange={(e) => setViewType(e.target.value)}
                >
                    <option value="daily" className="hover:bg-[#13F287]">Daily</option>
                    <option value="monthly" className="hover:bg-[#13F287]">Monthly</option>
                </select>
                </div>
            </div>
            </div>
        <main className="w-full custom-scroll h-full transition-transform duration-300">
            {/* Scrollable Tab Content */}
                {menuItems.find((menuItem) => menuItem.value === activeTab)?.component()}
        </main>

      {/* Bottom Navigation */}
        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    )
    }

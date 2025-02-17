
import { TbHomeInfinity, TbBuildingMosque } from "react-icons/tb"
import { GiPrayerBeads, GiSpellBook } from "react-icons/gi"
import { LiaPrayingHandsSolid } from "react-icons/lia"

export function BottomNavigation({ activeTab, setActiveTab }) {
    const menuItems = [
        {
        label: "Home",
        value: "Home",
        icon: <TbHomeInfinity className="w-6 h-6" />,
        },
        {
        label: "Adkar",
        value: "Adkar",
        icon: <GiPrayerBeads className="w-6 h-6" />,
        },
        {
        label: "Do'a",
        value: "Do'a",
        icon: <LiaPrayingHandsSolid className="w-6 h-6" />,
        },
        {
        label: "Salat",
        value: "Salat",
        icon: <TbBuildingMosque className="w-6 h-6" />,
        },
        {
        label: "Quran",
        value: "Quran",
        icon: <GiSpellBook className="w-6 h-6" />,
        },
    ]

    return (
        <div 
        style={{
            position: "sticky",
        }} 
        className=" bottom-0 left-0 right-0 bg-gradient-to-l from-[#1E1E1E] to-[#101010] px-3 py-3 z-50">
        <div className="flex justify-between items-center gap-1">
            {menuItems.map((item) => (
            <button
                key={item.value}
                onClick={() => setActiveTab(item.value)}
                className={`flex flex-col items-center justify-center flex-1 p-2 rounded-md transition-all ${
                activeTab === item.value ? "text-my-black bg-my-gold" : "text-my-white-gray hover:bg-[#1d2932]/80"
                }`}
            >
                <div className="w-6 h-6">{item.icon}</div>
                <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
            ))}
        </div>
        </div>
    )
}


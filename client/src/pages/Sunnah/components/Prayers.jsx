import { Moon, Sun, Sunrise, Sunset } from "lucide-react";
import { useEffect, useState } from "react";
import { SiPivotaltracker } from "react-icons/si";
import { useGetPrayers } from "@/hooks/Istighfar/useGetPrayers";
import { jwtDecode } from "jwt-decode";
import { useUpdatePrayer } from "@/hooks/Istighfar/useUpdatePrayer";

export default function Prayers() {
    const userInfo = jwtDecode(localStorage.getItem("token"));
    const userId = userInfo?.userId;

    const [completedPrayers, setCompletedPrayers] = useState([]);

    // Fetch prayers
    const { data, isLoading, isError, error } = useGetPrayers({ userId });

    // Update completedPrayers when data is loaded
    useEffect(() => {
        if (data?.prayers) {
            const completed = Object.keys(data.prayers).filter(prayer => data.prayers[prayer]);
            setCompletedPrayers(completed);
        }
    }, [data]);

    // Toggle prayer completion status
    const updatePrayers = useUpdatePrayer()

    // Prayer data
    const prayers = [
        { name: "fajr", label: "Fajr", icon: <Sunrise className="w-4 h-4" /> },
        { name: "dhur", label: "Dhuhr", icon: <Sun className="w-4 h-4" /> },
        { name: "asr", label: "Asr", icon: <Sun className="w-4 h-4" /> },
        { name: "maghrib", label: "Maghrib", icon: <Sunset className="w-4 h-4" /> },
        { name: "isha", label: "Isha'a", icon: <Moon className="w-4 h-4" /> },
    ];

    return (
        <div className="mx-auto p-4 bg-gradient-to-l from-[#8B704E] to-white rounded-xl w-full shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <SiPivotaltracker className="w-5 h-5 text-black" />
                    <h1 className="text-xl font-semibold text-black">Prayer Tracker</h1>
                </div>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p className="text-red-500">Error: {error?.message || "Failed to load prayers"}</p>
            ) : (
                <div className="grid grid-cols-5 gap-2 mb-8">
                    {prayers.map(prayer => (
                        <button key={prayer.name} 
                        onClick={() => updatePrayers.mutate({ userId: userInfo.userId, name: prayer.name })} 
                        className="flex flex-col items-center gap-1">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    completedPrayers.includes(prayer.name)
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-100 text-gray-600"
                                }`}
                            >
                                {prayer.icon}
                            </div>
                            <span className="text-xs font-medium text-black">{prayer.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

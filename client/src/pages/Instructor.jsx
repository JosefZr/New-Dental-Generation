import InstructorCourses from "@/components/instructor/courses";
import InstructorDashboard from "@/components/instructor/InstructorDashboard";
import { MdDashboard } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useContext, useEffect, useState } from "react";
import { fetchInstructorCourseListService } from "@/services";
import { InstructorContext } from "@/context/InstructorContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserContext } from "@/context/UserContext";

export default function Instructor() {
    
    const{instructorCoursesList, setInstructorCoursesList} = useContext(InstructorContext)

    const {isSidebarOpen, setIsSidebarOpen } = useContext(UserContext)
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev)
      }
    async function fetchAllCourses(){
        const response = await fetchInstructorCourseListService()
        console.log(response)
        if(response?.success) setInstructorCoursesList(response?.data)
    }
    useEffect(()=>{
        fetchAllCourses()
    },[])
    const menuItems = [
        {
            icon: MdDashboard,
            label: 'Dashboard',
            value: 'Dashboard', // Match with default state
            component: <InstructorDashboard />
        },
        {
            icon: FaBookOpen,
            label: 'Courses',
            value: 'Courses',
            component: <InstructorCourses ListOfCourses={instructorCoursesList}/>
        },
        // {
        //     icon: LogOut,
        //     label: "Logout",
        //     value: "logout",
        //     onClick:()=>navigate("/dashboard"),
        // },
    ];

    const [activeTab, setActiveTab] = useState('Dashboard'); // Default active tab is Dashboard

    return (
        <div className="flex h-full min-h-screen bg-black">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ?"":"hidden "} w-64 bg-my-dark-blue shadow-md `}>
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Instructor View</h2>
                    <nav>
                        {menuItems.map((menuItem, index) => (
                            <Button
                                key={index}
                                variant={activeTab === menuItem.value ? "secondary" : "ghost"} // Active style
                                className={`w-full py-4 gap-5 justify-start mb-2 ${
                                    activeTab === menuItem.value
                                        ? "bg-my-white-gray text-my-black font-bold" // Active styles
                                        : "text-my-white-gray"
                                }`}
                                onClick={() => {
                                    if (menuItem.value === 'logout' && menuItem.onClick) {
                                        menuItem.onClick(); // Execute Logout onClick
                                    } else {
                                        setActiveTab(menuItem.value); // Switch tabs for other items
                                    }
                                }}
                            >
                                <menuItem.icon className="text-xl" />
                                {menuItem.label}
                            </Button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="relative flex-1 p-8 overflow-y-auto">
            <button
                    className="absolute top-2 left-2 cursor-pointer z-50 p-2 hover:bg-gray-800 rounded-md transition-colors"
                    onClick={toggleSidebar}
                  >
                    <GiHamburgerMenu className="md:hidden text-2xl text-white" />
                  </button>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">
                        {activeTab}
                    </h1>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        {menuItems.map((menuItem, index) => (
                            <TabsContent key={index} value={menuItem.value}>
                                {menuItem.component}
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </main>
        </div>
    );
}

import { Button } from "@/components/ui/button";
import Header from "../components/StudentView/Header";
import { useContext, useEffect, useState } from "react";
import { CoursesContext } from "@/context/CoursesContext";
import CoursesList from "@/components/StudentView/CoursesList";
import { fetchStudentCourseListService } from "@/services";
import { MdCategory } from "react-icons/md";

export default function StudentViewCommonLayout() {
    // Manage active tab state
    const [activeTab, setActiveTab] = useState("Categories"); // Default active tab
    const { setStudentCourseList} = useContext(CoursesContext)
    async function fetchStudentCoures(){
        const response = await fetchStudentCourseListService();
        if(response?.success) setStudentCourseList(response.data)
    }
    useEffect(()=>{
        // Fetch student course list from API
        fetchStudentCoures()
    },[])
    // Tab configuration
    const menuItems = [
        {
            label: "Categories",
            value: "Categories",
            component: <CoursesList />
        },
        {
            label: "In Progress",
            value: "In Progress",
            component: <CoursesList/>
        },
        {
            label: "Favoris",
            value: "Favoris",
            component: <CoursesList/>
        },
    ];

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-my-dark-blue">
                {/* Navigation Tabs */}
                <section className="flex h-8 font-medium mx-auto my-6 w-full gap-4 px-3">
                    {menuItems.map((menuItem, index) => (
                        <Button
                        key={index}
                        className={`flex flex-1 cursor-pointer items-center rounded-md justify-center transition-all ${
                            activeTab === menuItem.value
                            ? "text-my-black font-bold bg-my-gold hover:bg-my-gold/80"
                            : "text-my-white-gray bg-[#1d2932] hover:bg-[#1d2932]/80" // Updated inactive styles
                        }`}
                        onClick={() => setActiveTab(menuItem.value)}
                        >
                        <span className="whitespace-nowrap w-full text-md p-3 font-medium rounded-md duration-300 flex items-center justify-center">
                            <p className="flex flex-row items-center gap-3">
                                <MdCategory height="16px" width="16px" className="lucide lucide-loader-circle" />
                                {menuItem.label}
                            </p>
                        </span>
                        </Button>
                    ))}
                    </section>


                {/* Tab Content */}
                <section className=" mx-auto  py-8">
                    {menuItems.find((menuItem) => menuItem.value === activeTab)?.component}
                </section>
            </div>
        </div>
    );
}

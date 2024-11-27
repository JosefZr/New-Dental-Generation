import { Button } from "@/components/ui/button";
import Header from "../components/StudentView/Header";
import { useContext, useEffect, useState } from "react";
import { CoursesContext } from "@/context/CoursesContext";
import CoursesList from "@/components/StudentView/CoursesList";
import { fetchStudentCourseListService } from "@/services";

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
    })
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
                <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
                    <div className="lg:w-full lg:pr-12">
                        <h1 className="text-4xl font-bold mb-4">Learning that gets you</h1>
                        <p className="text-xl">Skills for your present and your future. Get started with us!</p>
                    </div>
                    <div className="lg:w-full mb-8 lg:mb-0">
                        <img
                            src="https://images.pexels.com/photos/2312369/pexels-photo-2312369.jpeg"
                            width={600}
                            height={400}
                            className="w-full mx-auto h-auto rounded-lg shadow-lg"
                        />
                    </div>
                </section>

                {/* Navigation Tabs */}
                <section className="flex flex-row h-8 font-medium mx-auto mt-[16px] mb-10 w-full max-w-5xl justify-around">
                    {menuItems.map((menuItem, index) => (
                        <Button
                            key={index}
                            className={`relative flex flex-1 cursor-pointer items-center rounded-none justify-center transition-all ${
                                activeTab === menuItem.value
                                    ? "text-my-gold font-bold border-b-2 border-my-gold" // Active styles
                                    : "text-my-white-gray border-b-2 border-transparent " // Inactive styles with hover effect
                            }`}
                            onClick={() => setActiveTab(menuItem.value)}
                        >
                            <span className="relative whitespace-nowrap w-fit px-10 py-3 text-sm">
                                {menuItem.label}
                            </span>
                        </Button>
                    ))}
                </section>

                {/* Tab Content */}
                <section className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
                    {menuItems.find((menuItem) => menuItem.value === activeTab)?.component}
                </section>
            </div>
        </div>
    );
}

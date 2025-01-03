import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import RemindersTypes from "./RemindersTypes";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

const Container = styled.div`
    overscroll-behavior-block: none;
    overscroll-behavior-x: none;
    scroll-behavior: auto;
    scroll-snap-stop: always;
    scroll-snap-align: start;
    scroll-snap-type: x mandatory;
`;
const tasks =[
    {
        id: 1,
        title: "Dental Supplies",
    },
    {
        id: 2,
        title: "Staff Payroll",
    },
    {
        id: 3,
        title: "Dental Lab Fees",
    }
]
export default function Reminders() {
    const { setIsSidebarOpen } = useContext(UserContext);
    
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };
return (
    <Container className="carousel carousel-start overflow-y-hidden overscroll-none">
    <div
        className="carousel-item relative h-full max-h-full max-w-[100dvw] overflow-hidden"
        style={{
        scrollSnapStop: "always",
        scrollSnapAlign: "start",
        overflowAnchor: "none",
        }}
    >
        <button
            className="absolute top-2 left-2 cursor-pointer z-50 p-2 hover:bg-gray-800 rounded-md transition-colors"
            onClick={toggleSidebar}
        >
        <GiHamburgerMenu className="md:hidden text-2xl text-white" />
        </button>
        <RemindersTypes tasks={tasks}/>
        </div>
        
    </Container>
)
}

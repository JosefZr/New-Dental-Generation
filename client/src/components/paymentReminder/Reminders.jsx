import styled from "styled-components";
import RemindersTypes from "./RemindersTypes";


const Container = styled.div`
    overscroll-behavior-block: none;
    overscroll-behavior-x: none;
    scroll-behavior: auto;
    scroll-snap-stop: always;
    scroll-snap-align: start;
    scroll-snap-type: x mandatory;
    width: 100%;
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

return (
    <Container className="scrollbar-custom ">
    <div
        className="carousel-item relative h-full max-w-[100dvw] min-w-full "
        style={{
        scrollSnapStop: "none",
        scrollSnapAlign: "none",
        overflowAnchor: "none",
        }}
    >
        
        <RemindersTypes tasks={tasks}/>
        </div>
        
    </Container>
)
}

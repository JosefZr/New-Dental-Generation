import DentalAssistantList from "@/components/PlanLikePro/DentalAssistantList";
import SmallTaskList from "./SmallTaskList";

export default function SmallDailyCheckList() {
  return (
    <div className="carousel-item relative h-[calc(100dvh-10rem)] w-full overflow-hidden">
      <div className="scrollbar-custom  relative h-full w-full animate-fade-in">
        <div
          className="scrollbar-none overflow-y-scroll h-full w-full"
          style={{
            position: "relative", // Maintain proper positioning
          }}
        >
          <div
            className="h-full  bg-next-midnight rounded-lg px-4 pb-4 sm:px-5"
          >
            {/* Include SmallTaskList and DentalAssistantList components */}
            <SmallTaskList />
            <DentalAssistantList />
          </div>
        </div>
      </div>
    </div>
  );
}


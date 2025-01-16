import DentalAssistantList from "@/components/PlanLikePro/DentalAssistantList";
import TaskList from "@/components/PlanLikePro/TaskList";

export default function DAilyCheckList() {
  return (
    <div className="col-span-3 row-span-9 grid grid-cols-3 grid-rows-10 gap-1 overflow-hidden rounded-xl mt-5 px-4 pt-5 bg-gray-900">
        <div style={{position:"relative"}} className=" col-span-3 row-span-1 flex items-center justify-stretch ">
            <div className="ml-1 font-semibold text-2xl ">Daily Checklist</div>
        </div>
        <div className="relative col-span-3 row-span-8">
                <div className="scrollbar-custom overflow-x-visible overflow-y-scroll overscroll-y-none h-full w-full">
                    <TaskList/>
                    <DentalAssistantList />
                </div>
            </div>
    </div>
  )
}

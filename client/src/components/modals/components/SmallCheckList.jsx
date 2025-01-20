import DentalAssistantList from "@/components/PlanLikePro/DentalAssistantList";
import TaskList from "@/components/PlanLikePro/TaskList";

export default function SmallCheckList() {
  return (
    <div className="relative size-full animate-fade-in">
        <div className="scrollbar-none overflow-x-visible overflow-y-scroll overscroll-y-none h-full w-full">
            <div className="scrollbar-none relative h-full overflow-y-scroll overscroll-y-none sm:max-h-none bg-next-midnight rounded-lg px-0 pb-4 sm:px-5 swipe-dialog-scroll-descendant">
                <div className="scrollbar-none mx-2 mt-1 flex h-auto flex-col overflow-hidden">
                    <div className="group relative flex w-full items-center">
                        <TaskList/>
                        <DentalAssistantList />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

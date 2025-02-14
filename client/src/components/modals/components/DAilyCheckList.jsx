import DentalAssistantList from "@/components/PlanLikePro/DentalAssistantList"
import TaskList from "@/components/PlanLikePro/TaskList"

export default function DAilyCheckList() {
  return (
    <div className="flex flex-col h-full rounded-xl bg-my-Modal-back">
      <div className="p-4 pb-2">
        <h2 className="font-semibold text-2xl">Daily Checklist</h2>
      </div>
      <div className="flex-1 overflow-hidden px-4">
        <div className="h-full scrollbar-custom overflow-y-auto pr-2">
          <TaskList />
          <DentalAssistantList />
        </div>
      </div>
    </div>
  )
}


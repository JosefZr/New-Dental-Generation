// import { NavigationBar } from "@/components/PlanLikePro/NavigationBar";
import DentalAssistantList from "@/components/PlanLikePro/DentalAssistantList";
import TaskList from "@/components/PlanLikePro/TaskList";

export default function PlanLikepro() {
  return (
    <div className="min-h-screen bg-[#0B1015] text-white">
    {/* <NavigationBar /> */}
    <main className="fixed w-full h-full overflow-y-auto">
      <TaskList />
      <DentalAssistantList />
    </main>
  </div>
  )
}

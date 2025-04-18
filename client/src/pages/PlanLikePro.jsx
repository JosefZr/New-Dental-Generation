// import { NavigationBar } from "@/components/PlanLikePro/NavigationBar";
import DentalAssistantList from "@/components/PlanLikePro/DentalAssistantList";
import TaskList from "@/components/PlanLikePro/TaskList";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function PlanLikepro() {
  const { isSidebarOpen } = useContext(UserContext);
  return (
    <div className={`min-h-screen bg-[#01020b] text-white transition-transform duration-300 ${
      isSidebarOpen ?"ml-[-72px] ":""
    }`}>
    {/* <NavigationBar /> */}
    <main className=" w-full h-full overflow-y-auto transition-transform duration-300">
      <TaskList />
      <DentalAssistantList />
    </main>
  </div>
  )
}

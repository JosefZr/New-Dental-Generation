import { NavigationSidebar } from "@/components/navigation";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/navigation/DashboardSideBar";

import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Dashboard() {
  const {isSidebarOpen} = useContext(UserContext);
  

  return (
    <div className="flex h-screen">
      {/* Navigation Sidebar */}
      <div className={`md:flex w-[72px] bg-gray-900 h-full ${
        isSidebarOpen ? "hidden" : ""
      }`}>
        <NavigationSidebar />
      </div>

      {/* Server Sidebar */}
      <div className={` md:flex w-52 bg-gray-800 h-full ${
        isSidebarOpen ? "hidden" : ""
      }`}>

        <DashboardSidebar />
      </div>

      {/* Main Chat Area */}
      <main className="flex-1  flex flex-col h-full">
        {/* Outlet for rendering child routes */}
        <div className="flex-1">
        <div className="flex-1 h-full">
        <Outlet />

        </div>
        </div>
      </main>
    </div>
  );
}

import { NavigationSidebar } from "@/components/navigation";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/navigation/DashboardSideBar";

import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Dashboard() {
  const {isDashboardSidebarOpen} = useContext(UserContext);
  return (
    <div className="flex h-screen">
      {/* Navigation Sidebar */}
      <div className={`lg:flex w-[72px] bg-[ #0A1720] h-full ${
        isDashboardSidebarOpen ? "hidden" : ""
      }`}>
        <NavigationSidebar />
      </div>

      {/* Server Sidebar */}
      <div className={` lg:flex w-72 bg-[#0E1C26] h-full ${
        isDashboardSidebarOpen ? "hidden" : ""
      }`}>

        <DashboardSidebar />
      </div>

      {/* Main Chat Area */}
      <main className="flex-1  flex flex-col h-full">
        {/* Outlet for rendering child routes */}
        <div className="flex-1">
        <div className="flex-1 h-full">
        <Outlet />
          {/* <UserChat ></UserChat> */}
        </div>
            
        </div>
      </main>
    </div>
  );
}
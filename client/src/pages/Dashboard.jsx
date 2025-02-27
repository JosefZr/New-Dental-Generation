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
      <div className={`fixed left-0 top-0 h-full w-[72px] border-r-[1px] border-[#213043] transition-transform duration-300  ${
        isDashboardSidebarOpen ? "-translate-x-full" : "translate-x-0"
      }`}
      style={{
        backgroundColor:"hsl(211.3 46.939% 9.6078%)"
      }}>
        <NavigationSidebar />
      </div>

      {/* Server Sidebar */}
      <div className={` fixed left-[72px] top-0 h-full w-72 transition-transform duration-300 ${
        isDashboardSidebarOpen ? "-translate-x-[360px]" : "translate-x-0"
      }`} style={{
        backgroundColor:"hsl(211.03 33.333% 17.059%)"
      }}>

        <DashboardSidebar />
      </div>

      {/* Main Chat Area */}
      <main className={`flex-1 flex flex-col h-full transition-all duration-300 ${ isDashboardSidebarOpen
              ? "ml-0"
              : "ml-[360px] md:ml-[360px]" // Normal chat view
        }`}>
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
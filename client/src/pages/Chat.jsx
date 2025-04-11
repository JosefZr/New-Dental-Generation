import { NavigationSidebar } from "@/components/navigation"
import ServerSideBar from "@/components/server/ServerSideBar"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import Chat1 from "./chat/chat1"
import { useContext, useState } from "react"
import { UserContext } from "@/context/UserContext"
import PlanLikePro from "./PlanLikePro"
import PaymentReminder from "./PaymentReminder"
import TopDentistOpportunity from "./top-dentist"
import JobOpportunities from "./job-opportunities"
import GrowthSupport from "./growth-support"
import Sunnah from "./Sunnah"

export default function Chat() {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { isSidebarOpen } = useContext(UserContext)

  const isPlanLikeProRoute = location.pathname.includes("/chat2")
  const isPaymentReminder = location.pathname.includes("/chat3")
  const isGrowthSupport = location.pathname.includes("/growth-support"); // New condition
  const isTopDentist = location.pathname.includes("/top-dentist-opportunity"); // New condition
  const isJobOpportunities = location.pathname.includes("/job-opportunities"); // New condition
  const isSunnah = location.pathname.includes("/sunnah");
  return (
    <div className="flex h-screen ">
      {/* Navigation Sidebar with animation */}
      <div
        className={`fixed left-0 top-0 h-full w-[72px] border-r-[1px] border-[#213043] transition-transform duration-300 ${
          isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          backgroundColor:"hsl(211.3 46.939% 9.6078%)"
        }}
      >
        <NavigationSidebar />
      </div>

      {/* Server Sidebar with animation */}
      {!isGrowthSupport && !isPlanLikeProRoute && !isPaymentReminder && !isTopDentist && !isJobOpportunities && !isSunnah &&(
        <div
          className={`fixed left-[72px] top-0 h-full w-72 transition-transform duration-300 ${
            isSidebarOpen ? "-translate-x-[360px]" : "translate-x-0"
          }`}
          style={{
            backgroundColor:"hsl(211.03 33.333% 17.059%)"
          }}
        >
          <ServerSideBar
          />
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col h-full transition-all duration-300 ${
          isPlanLikeProRoute || isPaymentReminder || isGrowthSupport || isTopDentist || isJobOpportunities || isSunnah
            ? "ml-[72px]" // PlanLikePro & PaymentReminder should respect the sidebar width
            : isSidebarOpen
              ? "ml-0"
              : "ml-[360px] md:ml-[360px]" // Normal chat view
        }`}
      >
        {isPlanLikeProRoute ? (
          <PlanLikePro />
        ) : isPaymentReminder ? (
          <PaymentReminder />
        ) : isGrowthSupport ?(
          <GrowthSupport />
        ): isTopDentist ?(
          <TopDentistOpportunity />
        ): isJobOpportunities ?(
          <JobOpportunities/>
        ): isSunnah ?(
          <Sunnah />
        ):
        (
          <>
            <div className="flex-1">
              <Outlet />
              <div className="flex-1 h-full">
                <Chat1 />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}


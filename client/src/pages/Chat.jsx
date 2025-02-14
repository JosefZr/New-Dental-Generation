import { NavigationSidebar } from "@/components/navigation"
import ServerSideBar from "@/components/server/ServerSideBar"
import { Outlet, useLocation } from "react-router-dom"
import Chat1 from "./chat/chat1"
import { useContext, useState } from "react"
import { UserContext } from "@/context/UserContext"
import PlanLikePro from "./PlanLikePro"
import PaymentReminder from "./PaymentReminder"
import TopDentistOpportunity from "./top-dentist"
import JobOpportunities from "./job-opportunities"
import GrowthSupport from "./growth-support"

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [channelID, setChannelID] = useState(null)
  const [channelName, setChannelName] = useState(null)
  const { isSidebarOpen } = useContext(UserContext)
  const location = useLocation()

  const isPlanLikeProRoute = location.pathname.includes("/chat2")
  const isPaymentReminder = location.pathname.includes("/chat3")
  const isGrowthSupport = location.pathname.includes("/growth-support"); // New condition
  const isTopDentist = location.pathname.includes("/top-dentist-opportunity"); // New condition
  const isJobOpportunities = location.pathname.includes("/job-opportunities"); // New condition

  // useEffect(() => {
  //   if (location.pathname === "/channels" && !isPlanLikeProRoute && !isPaymentReminder) {
  //     onOpen(MODAL_TYPE.BIR)
  //   } else {
  //     onClose()
  //   }
  // }, [location.pathname, onOpen, onClose, isPlanLikeProRoute, isPaymentReminder])

  // useEffect(() => {
  //   if (!channelID) return
  // }, [channelID, messages]) // Fixed dependency

  // useEffect(() => {
  //   const handleEsc = (event) => {
  //     if (event.keyCode === 27) {
  //       onClose()
  //     }
  //   }
  //   window.addEventListener("keydown", handleEsc)

  //   return () => {
  //     window.removeEventListener("keydown", handleEsc)
  //   }
  // }, [onClose])

  return (
    <div className="flex h-screen ">
      {/* Navigation Sidebar with animation */}
      <div
        className={`fixed left-0 top-0 h-full w-[72px] bg-[#0A1720] transition-transform duration-300 ${
          isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <NavigationSidebar />
      </div>

      {/* Server Sidebar with animation */}
      {!isGrowthSupport && !isPlanLikeProRoute && !isPaymentReminder && !isTopDentist && !isJobOpportunities &&(
        <div
          className={`fixed left-[72px] top-0 h-full w-72 bg-[#0E1C26] transition-transform duration-300 ${
            isSidebarOpen ? "-translate-x-[360px]" : "translate-x-0"
          }`}
        >
          <ServerSideBar
            fetchMessages={setMessages}
            clickedChannelID={setChannelID}
            clickChannelName={setChannelName}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col h-full transition-all duration-300 ${
          isPlanLikeProRoute || isPaymentReminder || isGrowthSupport || isTopDentist || isJobOpportunities
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
        ):
        (
          <>
            <div className="flex-1">
              <Outlet />
              <div className="flex-1 h-full">
                <Chat1 initialMessages={messages} chanId={channelID} cahnTitle={channelName} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal Overlay */}
      {/* {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />} */}
    </div>
  )
}


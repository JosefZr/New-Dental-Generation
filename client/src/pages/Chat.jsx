import { NavigationSidebar } from "@/components/navigation";
import ServerSideBar from "@/components/server/ServerSideBar";
import { Outlet, useLocation } from "react-router-dom";
import Chat1 from "./chat/chat1";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import PlanLikePro from "./PlanLikePro";
import PaymentReminder from "./PaymentReminder"; // Import PaymentReminder component

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [channelID, setChannelID] = useState(null);
  const [channelName, setChannelName] = useState(null);
  const { isSidebarOpen } = useContext(UserContext);
  const location = useLocation();

  // Check which route we're on
  const isPlanLikeProRoute = location.pathname.includes("/chat2");
  const isPaymentReminder = location.pathname.includes("/chat3");

  useEffect(() => {
    if (!channelID) return;
  }, [messages]);

  return (
    <div className="flex h-screen">
      {/* Navigation Sidebar */}
      <div
        className={`md:flex w-[72px]  bg-[ #0A1720] h-full ${
          isSidebarOpen ? "hidden" : ""
        }`}
      >
        <NavigationSidebar />
      </div>

      {/* Server Sidebar - Only show if not on specific routes */}
      {!isPlanLikeProRoute && !isPaymentReminder && (
        <div
          className={`md:flex w-72 bg-[#0E1C26] h-full ${
            isSidebarOpen ? "hidden" : ""
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
      <div className="flex-1 flex flex-col h-full">
        {isPlanLikeProRoute ? (
          <PlanLikePro />
        ) : isPaymentReminder ? (
          <PaymentReminder /> // Render PaymentReminder when on /chat3
        ) : (
          <>
            <div className="flex-1">
              <Outlet />
              <div className="flex-1 h-full">
                <Chat1
                  initialMessages={messages}
                  chanId={channelID}
                  cahnTitle={channelName}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

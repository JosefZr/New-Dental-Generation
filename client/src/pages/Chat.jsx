import { NavigationSidebar } from "@/components/navigation";
import ServerSideBar from "@/components/server/ServerSideBar";
import { Outlet, useParams } from "react-router-dom";
import Chat1 from "./chat/chat1";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [channelID, setChannelID] = useState(null);
  const [channelName, setChannelName] = useState(null);
  const {isSidebarOpen} = useContext(UserContext);
  const params = useParams();

  useEffect(() => {
    if (!channelID) return;
    // console.log(messages);
  }, [messages]);

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
        <ServerSideBar
          serverId={params.serverId}
          fetchMessages={setMessages}
          clickedChannelID={setChannelID}
          clickChannelName={setChannelName}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1  flex flex-col h-full">
        {/* Outlet for rendering child routes */}
        <div className="flex-1">
          <Outlet />
        {/* Chat1 Component */}
        <div className="flex-1 h-full">
          <Chat1 initialMessages={messages} chanId={channelID} cahnTitle={channelName} />
        </div>
        </div>

      </div>
    </div>
  );
}

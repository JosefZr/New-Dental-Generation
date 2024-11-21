import { NavigationSidebar } from "@/components/navigation";
import ServerSideBar from "@/components/server/ServerSideBar";
import { Outlet, useParams } from "react-router-dom";
import Chat1 from "./chat/chat1";
import { useEffect, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [channelID, setChannelID] = useState(null);

  useEffect(() => {
    if (!channelID) return;
    //console.log(messages);
  }, [messages]);

  const params = useParams();
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Navigation Sidebar */}
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>

      {/* Server Sidebar */}
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0 left-[72px]">
        {/* Adjust the left position to place it beside the navigation sidebar */}
        <div className="h-full bg-gray-800 ">
          {/* <h2 className="text-white text-lg font-bold mb-4">Servers</h2> */}
          {/* Example Server List */}
          <div className="space-y-2">
            {/* Replace this with your actual server mapping */}
            {/* we have to pass the server id to this compoennt */}
            <ServerSideBar
              serverId={params.serverId}
              fetchMessages={setMessages}
              clickedChannelID={setChannelID}
            />
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <main className="flex-1 md:pl-[72px] md:ml-60 h-full">
        {/* Outlet for rendering child routes */}
        <Outlet />
        <Chat1 initialMessages={messages} chanId={channelID}></Chat1>
      </main>
    </div>
  );
}

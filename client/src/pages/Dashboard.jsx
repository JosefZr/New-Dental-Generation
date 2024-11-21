import ServerSideBar from "@/components/server/ServerSideBar";
import { NavigationSidebar } from "@/components/navigation";
import { Outlet, useParams } from "react-router-dom";
import DashboardSidebar from "@/components/navigation/DashboardSideBar";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import UserChat from "./chat/UserChat";
//import { useEffect, useState } from "react";

export default function Dashboard() {
  const [chatId, setChatId] = useState("");
  const [userMessages, setUserMessages] = useState([]);

  useEffect(() => {
    if (!chatId) return;
    async function fetchChatMessages() {
      const userInfo = jwtDecode(localStorage.getItem("token"));
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/chats/history/${chatId}/1`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch chat history: ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log(data);
        setUserMessages(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchChatMessages();
  }, [chatId]);

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
            <DashboardSidebar chatId={setChatId} />
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <main className="flex-1 md:pl-[72px] md:ml-60 h-full">
        {/* Outlet for rendering child routes */}
        <Outlet />
        <UserChat initialMessages={userMessages} chatId={chatId}></UserChat>
      </main>
    </div>
  );
}

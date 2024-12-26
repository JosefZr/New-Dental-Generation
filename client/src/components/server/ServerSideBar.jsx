import { useContext, useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import ServerChannel from "./ServerChannel";
import Serverheader from "./Serverheader";
import ServerMember from "./ServerMember";
import ServerSection from "./ServerSection";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "@/context/UserContext";

export default function ServerSideBar({
  serverId,
  fetchMessages,
  clickedChannelID,
  clickChannelName
}) {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [admOrMod, setAdmins] = useState(false);
  const { setOwner } = useContext(UserContext);

  // Group channels by type
  const groupedChannels = {
    control: channels.filter(chan => chan.type === "control" && chan.allowedUsers === "ADMD"),
    dentist: channels.filter(chan => chan.allowedUsers === "dentist"),
    lab: channels.filter(chan => chan.allowedUsers === "lab"),
    store: channels.filter(chan => chan.allowedUsers === "store")
  };

  useEffect(() => {
    async function fetchControlChannels() {
      try {
        const resp = await fetch(
          "http://localhost:3000/api/v1/channels?type=control/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token").toString(),
            },
          }
        );
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        const data = await resp.json();
        setChannels(prev => {
          // Merge new control channels with existing channels, avoiding duplicates
          const existingIds = new Set(prev.map(chan => chan._id));
          const newChannels = data.data.filter(chan => !existingIds.has(chan._id));
          return [...prev, ...newChannels];
        });
      } catch (error) {
        console.error("Error fetching control channels:", error);
      }
    }

    const userInfo = jwtDecode(localStorage.getItem("token"));
    const isAdminOrMod = userInfo.role === "admin" || userInfo.role === "moderator";
    setAdmins(isAdminOrMod);

    if (isAdminOrMod) {
      fetchControlChannels();
    }
  }, []);

  useEffect(() => {
    async function fetchAllChannels() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/channels/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token").toString(),
          },
        });
        
        if (!response.ok) {
          throw new Error(response.status);
        }

        const data = await response.json();
        setChannels(prev => {
          // Merge with existing channels, giving preference to newer data
          const channelMap = new Map([...prev, ...data.data].map(chan => [chan._id, chan]));
          return Array.from(channelMap.values());
        });
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    }

    fetchAllChannels();
  }, []);

  const handleChannelClick = async (id, title) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/channels/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token").toString(),
          },
        }
      );

      clickedChannelID(id);
      clickChannelName(title);
      
      if (response.ok) {
        const data = await response.json();
        fetchMessages(data.data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div className="flex flex-col h-full text-my-white w-full bg-my-dark">
      <Serverheader />
      <ScrollArea className="flex-1">
        {/* Admin & Moderator Channels */}
        {admOrMod && groupedChannels.control.length > 0 && (
          <div className="mx-2">
            <ServerSection
              sectionType="channels"
              channelType="Channel"
              role="admin"
              label="Admin & Moderators"
            >
              {groupedChannels.control.map((chan) => (
                <ServerChannel
                  key={chan._id}
                  channel={chan.title}
                  memberRole=""
                  onClickChan={() => handleChannelClick(chan._id, chan.title)}
                />
              ))}
            </ServerSection>
          </div>
        )}

        {/* Dentist Channels */}
        {groupedChannels.dentist.length > 0 && (
          <div className="mx-2">
            <ServerSection
              sectionType="channels"
              channelType="members"
              role="admin"
              label="Dentists channels"
            />
            {groupedChannels.dentist.map((channel) => (
              <ServerChannel
                key={channel._id}
                channel={channel.title}
                memberRole=""
                onClickChan={() => {
                  handleChannelClick(channel._id, channel.title)
                  setOwner({ownerId : channel.owner , chanType: "dentist" })
                }}
              />
            ))}
          </div>
        )}

        {/* Lab Channels */}
        {groupedChannels.lab.length > 0 && (
          <div className="mx-2">
            <ServerSection
              sectionType="channels"
              channelType="audio"
              role="admin"
              label="Labs channels"
            />
            {groupedChannels.lab.map((channel) => (
              <ServerChannel
                key={channel._id}
                channel={channel.title}
                memberRole=""
                onClickChan={() => {
                  setOwner({ownerId : channel.owner , chanType: "lab" });
                  handleChannelClick(channel._id, channel.title)}
                }
              />
            ))}
          </div>
        )}

        {/* Store Channels */}
        {groupedChannels.store.length > 0 && (
          <div className="mx-2">
            <ServerSection
              sectionType="channels"
              channelType="video"
              role="admin"
              label="Stores Channels"
            />
            {groupedChannels.store.map((channel) => (
              <ServerChannel
                key={channel._id}
                channel={channel.title}
                memberRole=""
                onClickChan={() => {
                  handleChannelClick(channel._id, channel.title);
                  setOwner({ownerId : channel.owner , chanType: "store" });
                }}
              />
            ))}
          </div>
        )}

        {/* Members Section */}
        <div className="mx-2">
          <ServerSection
            sectionType="channels"
            channelType="video"
            role="admin"
            label="members"
          />
          <ServerMember key="" member="youyou" server="" />
        </div>
      </ScrollArea>
    </div>
  );
}
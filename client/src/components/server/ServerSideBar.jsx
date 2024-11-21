import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import ServerChannel from "./ServerChannel";
import Serverheader from "./Serverheader";
import ServerMember from "./ServerMember";
import ServerSection from "./ServerSection";
import { jwtDecode } from "jwt-decode";

export default function ServerSideBar({
  serverId,
  fetchMessages,
  clickedChannelID,
}) {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [admOrMod, setAdmins] = useState(false);

  useEffect(() => {
    async function controll() {
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
      console.log(data);
      setChannels((prev) => [...prev, ...data.data]);
    }

    const userInfo = jwtDecode(localStorage.getItem("token"));
    if (userInfo.role === "admin" || userInfo.role === "moderator") {
      setAdmins(true);
    }
  }, []);

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    const fetchChannels = async () => {
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
        setChannels(data.data);
        console.log("Fetched data:", data.data);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchChannels();
  }, []);

  const handleChannelClick = async (id) => {
    console.log(id);

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

      if (response.ok) {
        const data = await response.json();
        console.log("the data is : ", data.data.messages);
        fetchMessages(data.data.messages);
      } else {
        console.error(`Failed to fetch messages for channel`);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  return (
    <div className=" flex flex-col h-full text-my-white w-full bg-my-dark">
      <Serverheader
      // server={} role={"ADMIN"}
      />
      {admOrMod ? (
        <div className="mx-2">
          <ServerSection
            sectionType="channels"
            channelType="Channel"
            role=""
            label="Admin & Moderators"
          />
          {channels.map((chan) => {
            if (chan.allowedUsers === "ADMD" && chan.type === "control") {
              return (
                <ServerChannel
                  key={chan._id}
                  channel={chan.title}
                  memberRole=""
                  onClickChan={() => handleChannelClick(chan._id)}
                />
              );
            }
            return null;
          })}
        </div>
      ) : null}
      <ScrollArea>
        {/* {!!textChannels?.length &&( */}
        <div className="mx-2">
          <ServerSection
            sectionType="channels"
            channelType="Channel"
            role=""
            label="Dentists channels"
          />
          {/* {texxtChannels.map((channel)=>( */}
          {channels.map((channel) => {
            if (channel.allowedUsers === "dentist") {
              return (
                <ServerChannel
                  key={channel._id} // Always provide a unique key
                  channel={channel.title}
                  memberRole=""
                  onClickChan={() => handleChannelClick(channel._id)}
                />
              );
            }
            return null;
          })}
          {/* ))} */}
        </div>
        {/* )} */}

        {/* {!!audioChannels?.length &&( */}
        <div className="mx-2">
          <ServerSection
            sectionType="channels"
            channelType="audio"
            role="admin"
            label="Labs channels"
          />
          {/* {texxtChannels.map((channel)=>( */}
          {channels.map((channel) => {
            if (channel.allowedUsers === "lab") {
              return (
                <ServerChannel
                  key={channel._id} // Always provide a unique key
                  channel={channel.title}
                  memberRole=""
                  onClickChan={() => handleChannelClick(channel._id)}
                />
              );
            }
            return null;
          })}
          {/* ))} */}
        </div>
        {/* )} */}

        {/* {!!videoChannels?.length &&( */}
        <div className="mx-2">
          <ServerSection
            sectionType="channels"
            channelType="video"
            role="admin"
            label="Stores Channels"
          />
          {/* {texxtChannels.map((channel)=>( */}
          {channels.map((channel) => {
            if (channel.allowedUsers === "store") {
              return (
                <ServerChannel
                  key={channel._id} // Always provide a unique key
                  channel={channel.title}
                  memberRole=""
                  onClickChan={() => handleChannelClick(channel._id)}
                />
              );
            }
            return null;
          })}
          {/* ))} */}
        </div>
        {/* )} */}

        {/* {!!members?.length &&( */}
        <div className="mx-2">
          <ServerSection
            sectionType="channels"
            channelType="video"
            role="admin"
            label="members"
          />
          {/* {texxtChannels.map((member)=>( */}
          <ServerMember key="" member="youyou" server="" />
          {/* ))} */}
        </div>
        {/* )} */}
      </ScrollArea>
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useDeleteChannel } from "@/hooks/channels/usedeleteChannel";
import { useGetAllChannels } from "@/hooks/channels/useGetAllChannels";
import ServerHeader from "./Serverheader";
import { ScrollArea } from "../ui/scroll-area";
import ServerSection from "./ServerSection";
import ServerChannel from "./ServerChannel";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { jwtDecode } from "jwt-decode";
import styled from "styled-components";
import { FaTasks } from "react-icons/fa";

import { FaRegChessKnight } from "react-icons/fa6";
import { GiLaurelCrown } from "react-icons/gi";
import { progress } from "@/lib/ProgressData";
// import { type } from "os";

export const Logo = styled.div`
    background-position: center center;
    background-size: cover;
`;
 export const LoadingSpinner = () => (
  <div className="flex justify-center items-center w-full h-full">
    <div className="animate-spin rounded-full border-t-4 border-blue-500 w-12 h-12"></div>
  </div>
);
export default function ServerSideBar({
  fetchMessages,
  clickedChannelID,
  clickChannelName
}) {
  const {channels, setChannels,user} = useContext(UserContext)

  const getDaysDifference = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    
    // Reset time portion to ensure accurate day calculation
    created.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    
    const diffTime = Math.abs(now - created);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};
const diffDays = getDaysDifference(user.createdAt);
// Find current progress stage
const currentProgress = progress.find(stage => 
    diffDays <= stage.maxDays
) || progress[progress.length - 1];

  const { setOwner, setUpdateChannel, setClickedChannel } = useContext(UserContext);
  const { data, isLoading, isError } = useGetAllChannels();
  const deleteTask = useDeleteChannel();
  const { onOpen } = useModal();
  const userInfo = jwtDecode(localStorage.getItem("token"))
  
  useEffect(() => {
    if (data) {
      setChannels(prev => {
        const existingIds = new Set(prev.map(chan => chan._id));
        const newChannels = data.data.filter(chan => !existingIds.has(chan._id));
        return [...prev, ...newChannels];
      });
    }
  }, [data]);
console.log(channels)
  const groupedChannels = {
    control: channels.filter(chan => chan.type === "control" && chan.allowedUsers === "ADMD"),
    dentist: channels.filter(chan => chan.allowedUsers === "dentist"),
    lab: channels.filter(chan => chan.allowedUsers === "lab"),
    store: channels.filter(chan => chan.allowedUsers === "store"),
    algeria: channels.filter(chan=>chan.type==="algeria"),
    russia: channels.filter(chan=>chan.type==="russia"),
    egypt:channels.filter(chan=>chan.type==="egypt"),
    europe:channels.filter(chan=>chan.type==="europe"),
    guide:channels.filter(chan=>chan.type==="guide"),
    announce:channels.filter(chan=>chan.type==="announce"),
    journey:channels.filter(chan=>chan.type==="journey")
  };
  const { isSidebarOpen, setIsSidebarOpen } = useContext(UserContext);

  const handleChannelClick = async (id, title) => {
    setClickedChannel(id)
    setIsSidebarOpen(!isSidebarOpen)
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
const handlePinChannel = async (channel) => {
  console.log("clicked")
    try {
      const response = await fetch(`http://localhost:3000/api/v1/channels/pin`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token").toString(),
        },
        body: JSON.stringify({ locked: !channel.locked, channel:channel._id })
      });

      if (response.ok) {
        console.log("done",response)

        setChannels(prev => prev.map(chan => 
          chan._id === channel._id ? { ...chan, locked: !chan.locked } : chan
        ));
      }
    } catch (error) {
      console.error("Error pinning/unpinning channel:", error);
    }
  };
  const handleDeleteChannel = async (id) => {
    deleteTask.mutate({ id });
    setChannels(prev => prev.filter(chan => chan._id !== id));
  };
  const handleEditChannel = (channel)=>{
    console.log(channel)
    setUpdateChannel(channel)
    onOpen(MODAL_TYPE.EDIT_CHANNEL);
  }
  const handleBirClick = ()=>{
    onOpen(MODAL_TYPE.BIR)
  }

  const [isFirstCallMade, setIsFirstCallMade] = useState(false);

  useEffect(() => {
    if (!isFirstCallMade && channels.length > 0 && userInfo) {
      // Determine the channels based on the user's role
      const roleBasedChannels = {
        admin: groupedChannels.control,
        moderator: groupedChannels.control,
        dentist: groupedChannels.dentist,
        lab: groupedChannels.lab,
        store: groupedChannels.store,
      };
  
      const userRole = userInfo.role;
      const roleChannels = roleBasedChannels[userRole] || [];
  
      // Fetch the first channel for the user's role
      if (roleChannels.length > 0) {
        const firstChannel = roleChannels[0];
        handleChannelClick(firstChannel._id, firstChannel.title);
        setIsFirstCallMade(true); // Mark as executed
      }
    }
  }, [channels, userInfo, groupedChannels, handleChannelClick]);
  return (
    <div className="flex flex-col h-full text-my-white w-full ">
      <ServerHeader />

      <ScrollArea className="flex-1 pr-2 pt-2">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {["admin", "moderator"].includes(userInfo.role) && groupedChannels.control.length > 0 && (
              <div className="mx-2">
                <ServerSection label="Admin & Moderators" allowedRole="ADMD" channelType="control">
                  {groupedChannels.control
                  .sort((a, b) => (b.locked ? 1 : 0) - (a.locked ? 1 : 0))
                  .map((chan) => (
                    <ServerChannel
                      id={chan._id}
                      key={chan._id}
                      channel={chan.title}
                      memberRole=""
                      onEditClick={()=>handleEditChannel(chan)}
                      onDeleteClick={() => handleDeleteChannel(chan._id)}
                      onClickChan={() => handleChannelClick(chan._id, chan.title)}
                      onPinClick={() => handlePinChannel(chan)}
                      isPinned={chan.locked}
                      />
                  ))}
                </ServerSection>
              </div>
            )}
            {groupedChannels.announce.length >= 0 && (
              <div className="mx-2">
                <ServerSection label="YDN-announcements" allowedRole="ADMD" channelType="announce">
                {groupedChannels.announce
                .sort((a, b) => (b.locked ? 1 : 0) - (a.locked ? 1 : 0))
                .map((channel) => (
                  <ServerChannel
                    key={channel._id}
                    channel={channel.title}
                    id={channel._id}
                    memberRole=""
                    onEditClick={() => handleEditChannel(channel)}
                    onPinClick={() => handlePinChannel(channel)}
                    isPinned={channel.locked}
                    onDeleteClick={() => handleDeleteChannel(channel._id)}
                    onClickChan={() => {
                      handleChannelClick(channel._id, channel.title);
                      setOwner({
                        ownerId: channel.owner,
                        allowedUsers: channel.allowedUsers,
                        chanId: channel._id,
                        type:"announce"
                      });
                    }}
                  />
                ))}
                </ServerSection>
              </div>
            )}
            {groupedChannels.guide.length >= 0 && (
              <div className="mx-2">
                <ServerSection label="Community Guidelines" allowedRole="ADMD" channelType="guide">
                {groupedChannels.guide
                .sort((a, b) => (b.locked ? 1 : 0) - (a.locked ? 1 : 0))
                .map((channel) => (
                  <ServerChannel
                    key={channel._id}
                    channel={channel.title}
                    id={channel._id}
                    memberRole=""
                    onEditClick={() => handleEditChannel(channel)}
                    onPinClick={() => handlePinChannel(channel)}
                    isPinned={channel.locked}
                    onDeleteClick={() => handleDeleteChannel(channel._id)}
                    onClickChan={() => {
                      handleChannelClick(channel._id, channel.title);
                      setOwner({
                        ownerId: channel.owner,
                        allowedUsers: channel.allowedUsers,
                        chanId: channel._id,
                        type:"all"
                      });
                    }}
                  />
                ))}
                </ServerSection>
              </div>
            )}
            {groupedChannels.dentist.length > 0 && (
              <div className="mx-2">
                <ServerSection label="Dentists channels" allowedRole="dentist" channelType="room">
                {groupedChannels.dentist
                .sort((a, b) => (b.locked ? 1 : 0) - (a.locked ? 1 : 0))
                .map((channel) => (
                  <ServerChannel
                    key={channel._id}
                    channel={channel.title}
                    id={channel._id}
                    memberRole=""
                    onEditClick={() => handleEditChannel(channel)}
                    onPinClick={() => handlePinChannel(channel)}
                    isPinned={channel.locked}
                    onDeleteClick={() => handleDeleteChannel(channel._id)}
                    onClickChan={() => {
                      handleChannelClick(channel._id, channel.title);
                      setOwner({
                        ownerId: channel.owner,
                        allowedUsers: channel.allowedUsers,
                        chanId: channel._id,
                      });
                    }}
                  />
                ))}
                </ServerSection>
              </div>
            )}
            {groupedChannels.lab.length > 0 && (
              <div className="mx-2">
                <ServerSection label="Labs channels" allowedRole="lab" channelType="room">
                  {groupedChannels.lab.sort((a, b) => (b.locked ? 1 : 0) - (a.locked ? 1 : 0))
                .map((channel) => (
                    <ServerChannel
                      key={channel._id}
                      channel={channel.title}
                      id={channel._id}
                      memberRole=""
                      onEditClick={()=>handleEditChannel(channel)}
                      onDeleteClick={() => handleDeleteChannel(channel._id)}
                      onPinClick={()=>handlePinChannel(channel)}
                      isPinned={channel.locked}
                      onClickChan={() => {
                        handleChannelClick(channel._id, channel.title);
                        setOwner({
                          ownerId: channel.owner,
                          allowedUsers: channel.allowedUsers,
                          chanId: channel._id,
                        });
                      }}
                    />
                  ))}
                </ServerSection>
              </div>
            )}
            {groupedChannels.store.length > 0 && (
              <div className="mx-2">
                <ServerSection label="Stores Channels" allowedRole="store" channelType="room">
                  {groupedChannels.store.sort((a, b) => (b.locked ? 1 : 0) - (a.locked ? 1 : 0))
                .map((channel) => (
                    <ServerChannel
                      key={channel._id}
                      channel={channel.title}
                      id={channel._id}
                      memberRole=""
                      onEditClick={()=>handleEditChannel(channel)}
                      onDeleteClick={() => handleDeleteChannel(channel._id)}
                      onPinClick={()=>handlePinChannel(channel)}
                      isPinned={channel.locked}
                      onClickChan={() => {
                        handleChannelClick(channel._id, channel.title);
                        setOwner({
                          ownerId: channel.owner,
                          allowedUsers: channel.allowedUsers,
                          chanId: channel._id,
                        });
                      }}
                    />
                  ))}
                </ServerSection>
              </div>
            )}
            {/* for the algerian channel */}
            {groupedChannels.algeria.length > 0 && (
              <div className="mx-2">
                <ServerSection label="Algeria Channels" allowedRole="all"  channelType="algeria">
                  {groupedChannels.algeria.sort((a, b) => (b.locked ? 1 : 0) - (a.locked ? 1 : 0))
                .map((channel) => (
                    <ServerChannel
                      key={channel._id}
                      channel={channel.title}
                      id={channel._id}
                      memberRole=""
                      onEditClick={()=>handleEditChannel(channel)}
                      onDeleteClick={() => handleDeleteChannel(channel._id)}
                      onPinClick={()=>handlePinChannel(channel)}
                      isPinned={channel.locked}
                      onClickChan={() => {
                        handleChannelClick(channel._id, channel.title);
                        setOwner({
                          ownerId: channel.owner,
                          allowedUsers: channel.allowedUsers,
                          chanId: channel._id,
                          type: "algeria"
                        });
                      }}
                    />
                  ))}
                </ServerSection>
              </div>
            )}
            {/* for the russian channel */}
            {groupedChannels.russia.length > 0 && (
              <div className="mx-2">
                <ServerSection label="Russia Channels" allowedRole="all" channelType="russia">
                  {groupedChannels.russia.sort((a, b) => (b.locked ? 1 : 0) - (a.locked ? 1 : 0))
                .map((channel) => (
                    <ServerChannel
                      key={channel._id}
                      channel={channel.title}
                      id={channel._id}
                      memberRole=""
                      onEditClick={()=>handleEditChannel(channel)}
                      onDeleteClick={() => handleDeleteChannel(channel._id)}
                      onPinClick={()=>handlePinChannel(channel)}
                      isPinned={channel.locked}
                      onClickChan={() => {
                        handleChannelClick(channel._id, channel.title);
                        setOwner({
                          ownerId: channel.owner,
                          allowedUsers: channel.allowedUsers,
                          chanId: channel._id,
                          type: "russia"
                        });
                      }}
                    />
                  ))}
                </ServerSection>
              </div>
            )}
            {/* for the egypt channel */}
            {groupedChannels.egypt.length > 0 && (
              <div className="mx-2">
                <ServerSection label="Egypt Channels" allowedRole="all" channelType="egypt">
                  {groupedChannels.egypt.sort((a, b) => (b.locked ? 1 : 0) - (a.locked ? 1 : 0))
                .map((channel) => (
                    <ServerChannel
                      key={channel._id}
                      channel={channel.title}
                      id={channel._id}
                      memberRole=""
                      onEditClick={()=>handleEditChannel(channel)}
                      onDeleteClick={() => handleDeleteChannel(channel._id)}
                      onPinClick={()=>handlePinChannel(channel)}
                      isPinned={channel.locked}
                      onClickChan={() => {
                        handleChannelClick(channel._id, channel.title);
                        setOwner({
                          ownerId: channel.owner,
                          allowedUsers: channel.allowedUsers,
                          chanId: channel._id,
                          type: "egypt"
                        });
                      }}
                    />
                  ))}
                </ServerSection>
              </div>
            )}
            {/* for the europe channel */}
            {groupedChannels.europe.length > 0 && (
              <div className="mx-2">
                <ServerSection label="Europe Channels" allowedRole="all" channelType="europe">
                  {groupedChannels.europe.sort((a, b) => (b.locked ? 1 : 0) - (a.locked ? 1 : 0))
                .map((channel) => (
                    <ServerChannel
                      key={channel._id}
                      channel={channel.title}
                      id={channel._id}
                      memberRole=""
                      onEditClick={()=>handleEditChannel(channel)}
                      onDeleteClick={() => handleDeleteChannel(channel._id)}
                      onPinClick={()=>handlePinChannel(channel)}
                      isPinned={channel.locked}
                      onClickChan={() => {
                        handleChannelClick(channel._id, channel.title);
                        setOwner({
                          ownerId: channel.owner,
                          allowedUsers: channel.allowedUsers,
                          chanId: channel._id,
                          type: "europe"
                        });
                      }}
                    />
                  ))}
                </ServerSection>
              </div>
            )}
            {groupedChannels.journey.length >= 0 && (
              <div className="mx-2">
                <ServerSection label="Your Dental Journey" allowedRole="all" channelType="journey">
                  {groupedChannels.journey.sort((a, b) => (b.locked ? 1 : 0) - (a.locked ? 1 : 0))
                .map((channel) => (
                    <ServerChannel
                      key={channel._id}
                      channel={channel.title}
                      id={channel._id}
                      memberRole=""
                      onEditClick={()=>handleEditChannel(channel)}
                      onDeleteClick={() => handleDeleteChannel(channel._id)}
                      onPinClick={()=>handlePinChannel(channel)}
                      isPinned={channel.locked}
                      onClickChan={() => {
                        handleChannelClick(channel._id, channel.title);
                        setOwner({
                          ownerId: channel.owner,
                          allowedUsers: channel.allowedUsers,
                          chanId: channel._id,
                          type: "journey"
                        });
                      }}
                    />
                  ))}
                </ServerSection>
              </div>
            )}
          </>
        )}
      </ScrollArea>

      <div className="relative flex w-full items-center justify-between bg-neutral pr-2 pl-1" >
        <button className="group relative flex flex-1 p-[1px]" onClick={handleBirClick}>
          <div className="absolute inset-0 rounded-md border-[1px] border-solid border-my-gold opacity-30 group-hover:opacity-80 group-active:opacity-80"  
          // style={{
          //   backgroundImage: 'linear-gradient(94.38deg, #ECC879 -14.69%, #D46B32 210%)',
          // }}
          ></div>
          <div className="relative z-10 inline-flex flex-1 items-center justify-between rounded-md bg-neutral px-2 py-1 cursor-pointer "
            style={{
              backgroundColor:" hsl(211.3 46.939% 9.6078% / 1)"
            }}
          >
            <div className="pointer-events-none flex items-center">
              <section className="flex-shrink-0 rounded-full  mr-2 cursor-pointer">
                <Logo style={{ backgroundImage: `url(http://localhost:3000/uploads/${user.avatar})` ,width:"40px", height:"40px"}}  className="rounded-full object-cover "  />
                <div className="absolute   text-[22px] w-[22px] h-[22px] left-[30px] " style={{bottom:"2px"}}>
                    {React.createElement(currentProgress.logo)}
                </div>
              </section>
              <div className="flex flex-col justify-start whitespace-nowrap text-md ">
                <span className="inline-flex items-center">{user.firstName} {user.lastName}
                <span className="px-2"> {user.role ==="admin" && user.role==="moderator"? <FaRegChessKnight className="h-8 w-auto "/>: user.subscriptionPlan==="freeTrial" ?<GiLaurelCrown className=" h-8 w-auto text-my-gray"/> : <GiLaurelCrown className=" h-8 w-auto text-my-gold"/>}</span>
                </span>
              </div>
              <FaTasks className=" text-[22px] w-[22px] h-[22px] left-[30px] "/>
            </div>
          </div>
        </button>
        <div className="flex items-center gap-1 rounded-md bg-top py-1 font-bold text-primary text-sm ml-1 cursor-pointer px-[4px]"></div>
      </div>
    </div>
  );
}
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useDeleteChannel } from "@/hooks/channels/usedeleteChannel";
import { useGetAllChannels } from "@/hooks/channels/useGetAllChannels";
import ServerHeader from "./Serverheader";
import { ScrollArea } from "../ui/scroll-area";
import ServerSection from "./ServerSection";
import ServerChannel from "./ServerChannel";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { jwtDecode } from "jwt-decode";

export default function ServerSideBar({
  fetchMessages,
  clickedChannelID,
  clickChannelName
}) {
  const {channels, setChannels} = useContext(UserContext)
  const [admOrMod, setAdmins] = useState(false);
  const { setOwner, setUpdateChannel } = useContext(UserContext);
  
  const { data, isLoading, isError } = useGetAllChannels();
  const deleteTask = useDeleteChannel();
  const { onOpen } = useModal();
  const userInfo = jwtDecode(localStorage.getItem("token"))
  console.log(userInfo)
  useEffect(() => {
    if (data) {
      setChannels(prev => {
        const existingIds = new Set(prev.map(chan => chan._id));
        const newChannels = data.data.filter(chan => !existingIds.has(chan._id));
        return [...prev, ...newChannels];
      });
    }
  }, [data]);

  const groupedChannels = {
    control: channels.filter(chan => chan.type === "control" && chan.allowedUsers === "ADMD"),
    dentist: channels.filter(chan => chan.allowedUsers === "dentist"),
    lab: channels.filter(chan => chan.allowedUsers === "lab"),
    store: channels.filter(chan => chan.allowedUsers === "store")
  };

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

  const handleDeleteChannel = async (id) => {
    deleteTask.mutate({ id });
    setChannels(prev => prev.filter(chan => chan._id !== id));
  };
  const handleEditChannel = (channel)=>{
    console.log(channel)
    setUpdateChannel(channel)
    onOpen(MODAL_TYPE.EDIT_CHANNEL);


  }
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center w-full h-full">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 w-12 h-12"></div>
    </div>
  );

  return (
    <div className="flex flex-col h-full text-my-white w-full bg-my-dark">
      <ServerHeader />
      <ScrollArea className="flex-1">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {["admin", "moderator"].includes(userInfo.role) && groupedChannels.control.length > 0 && (
              <div className="mx-2">
                <ServerSection label="Admin & Moderators" allowedRole="ADMD" channelType="control">
                  {groupedChannels.control.map((chan) => (
                    <ServerChannel
                      key={chan._id}
                      channel={chan.title}
                      memberRole=""
                      onEditClick={()=>handleEditChannel(chan)}
                      onDeleteClick={() => handleDeleteChannel(chan._id)}
                      onClickChan={() => handleChannelClick(chan._id, chan.title)}
                    />
                  ))}
                </ServerSection>
              </div>
            )}

            {groupedChannels.dentist.length > 0 && (
              <div className="mx-2">
                <ServerSection label="Dentists channels" allowedRole="dentist" channelType="room">
                  {groupedChannels.dentist.map((channel) => (
                    <ServerChannel
                      key={channel._id}
                      channel={channel.title}
                      memberRole=""
                      onEditClick={()=>handleEditChannel(channel)}
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
                  {groupedChannels.lab.map((channel) => (
                    <ServerChannel
                      key={channel._id}
                      channel={channel.title}
                      memberRole=""
                      onEditClick={()=>handleEditChannel(channel)}
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

            {groupedChannels.store.length > 0 && (
              <div className="mx-2">
                <ServerSection label="Stores Channels" allowedRole="store" channelType="room">
                  {groupedChannels.store.map((channel) => (
                    <ServerChannel
                      key={channel._id}
                      channel={channel.title}
                      memberRole=""
                      onEditClick={()=>handleEditChannel(channel)}
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
          </>
        )}
      </ScrollArea>
    </div>
  );
}
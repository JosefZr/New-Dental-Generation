import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import { useDeleteJourney } from "@/hooks/user/useDeleteJourney";
import useSocketStore from "@/socketStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5"

export default function Journey({ user }) {
  const userInfo = useAuthUser()

  const socket = useSocketStore((state) => state.socket);
  const checkAndReconnect = useSocketStore((state) => state.checkAndReconnect);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkAndReconnect();
  }, []);

  useEffect(() => {
    if (socket) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
      checkAndReconnect();
    }
  }, [socket]);


  // Date formatting utility
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return 'Invalid date';
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};
  const deleteJourney = useDeleteJourney()
  function handleDeleteMessage (info){
    if (!socket) {
      toast.error("Not connected to the server, retrying...");
      checkAndReconnect();
      return;
    }
    try {
        socket.emit("deleteMessage", {
          content: info.content,
          createdAt: info.date,
          channelId: info.chanId
        })

        deleteJourney.mutate({
          userId: userInfo.userId,
          id:info._id,
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  const showDeleteButton = user?._id === userInfo.userId || 
    ["admin", "moderator"].includes(userInfo.role);
  return (
    <div
      style={{ position: "relative" }}
      className="h-[370px] custom-scroll overflow-y-auto p-[24px] swipe-dialog-scroll-descendant"
    >
      {user.journey && user.journey.length > 0 ? (
        user.journey.map((info, index) => (
          <div key={index} className="mb-2  group" style={{ position: "relative" }}>
            {/* Header */}
            <div className="z-10 mt-2 flex h-[44px] items-center justify-between truncate rounded-t-md border border-slate-700 border-b-0 bg-base-200 px-2 text-sm first:mt-0 md:text-md">
            <span className="cursor-pointer font-medium hover:underline">
                {formatDate(info.date)}
              </span>
              {/* Delete Button - Inside header, aligned right */}
              <div className="flex items-center gap-2">
                <div className="text-teal-500 hover:underline active">
                  <span>{info.chanTitle}</span>
                </div>
              {showDeleteButton && <button
                  onClick={()=>handleDeleteMessage(info)}
                  className="ml-2 p-1 rounded-full bg-slate-800 hover:bg-slate-700 transition-all "
                >
                  <IoClose className="h-5 w-5" />
                </button>}
              </div>
            </div>

            {/* Content */}
            <div className="flex items-center justify-center rounded-b-md border border-slate-700 border-t-0 py-2">
              <div className="chat-message group relative flex w-full focus:border-primary focus:ring lg:pr-4 px-10">
                <section className="mb-[2px] inline-block w-full rounded-md border bg-bubble-gradient px-2 py-[4px] border-transparent">
                  <span className="custom-break-words break-words text-sm">
                    <div className="markdown break-words false">
                      <p className="m-0  whitespace-pre-wrap">{info.content}</p>
                    </div>
                  </span>

                  {/* Image Gallery */}
                  {info.images && info.images.length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {info.images.map((image, imgIndex) => (
                        <button
                          key={imgIndex}
                          className="relative overflow-hidden rounded-md filter-none transition-[filter]"
                          style={{
                            width: "199px",
                            height: "200px",
                            backgroundImage: `url(${image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></button>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center p-3">
          <img src="/jouney.jpg" alt="Journey" className="h-[128px] w-[128px] rounded-full" />
          <div className="mt-2 text-center text-sm">Their journey is just beginning...</div>
        </div>
      )}
    </div>
  )
}

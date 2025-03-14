import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import { useSocket } from "@/socketContext";
import toast from "react-hot-toast";

export default function MessageTools({message, chanId}) {
  const socket = useSocket();
  const userInfo = useAuthUser();

  const handleDeleteMessage = async () => {
    console.log(message)
  
    try {
      if (chanId) {
        // Channel message deletion
        socket.emit("deleteMessage", {
          content: message.content,
          createdAt: message.createdAt,
          channelId: chanId
        });
      } else {
        // Private message deletion
        socket.emit("deletePrivateMessage", { 
          messageId: message._id ,
          content: message.content,
          createdAt: message.createdAt,
          senderId: userInfo.userId
        }, (response) => {
          if (!response.success) {
            toast.error(response.error);
          }
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
    // Only show delete button if user is authorized
    const showDeleteButton = message?.sender?._id === userInfo.userId || 
    ["admin", "moderator"].includes(userInfo.role);
  return (
    <div
      className=" items-center rounded-md border border-solid pr-1 shadow-md group-hover:flex hidden transition-all hover:shadow-lg absolute top-[-16px] right-[16px]"
      style={{
        position:"fixed",
        backgroundColor:"hsl(211.03 33.333% 17.059%)",
        borderColor:"hsl(210 27.586% 22.745%)",
      }}
    >
      <div className="flex cursor-default gap-1 rounded-full border p-1 border-none bg-[hsl(211.03 33.333% 17.059%)]"
      style={{
        borderColor:"hsl(210 27.586% 22.745%)"
      }}> 
          <button className="h-[32px] w-[32px] flex items-center justify-center text-neutral-content border-solid hover:bg-slate-700 rounded-sm transition-all">🔥</button>
          <button className="h-[32px] w-[32px] flex items-center justify-center text-neutral-content border-solid hover:bg-slate-700 rounded-sm transition-all">👍</button>
          <button className="h-[32px] w-[32px] flex items-center justify-center text-neutral-content border-solid hover:bg-slate-700 rounded-sm transition-all">👎</button>
          <button className="h-[32px] w-[32px] flex items-center justify-center text-neutral-content border-solid hover:bg-slate-700 rounded-sm transition-all">😊</button>
      </div>
          <button className="h-[32px] w-[32px] flex items-center justify-center text-neutral-content border-solid border-base-300 hover:bg-slate-700 rounded-sm transition-all">✏️</button>
          {showDeleteButton  &&<button 
        onClick={handleDeleteMessage}
        className="h-[32px] w-[32px] flex items-center justify-center text-neutral-content border-solid border-base-300 hover:bg-slate-700 rounded-sm transition-all"
      >
        🗑️
      </button>    }
      </div>
  )
}

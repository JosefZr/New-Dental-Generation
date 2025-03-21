import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import { useEffect, useState } from "react";
import useSocketStore from "@/socketStore";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";

export default function MessageTools({ message, chanId, onEdit }) {
  const socket = useSocketStore((state) => state.socket);
  const checkAndReconnect = useSocketStore((state) => state.checkAndReconnect);
  const [isConnected, setIsConnected] = useState(false);
  const userInfo = useAuthUser();
  const {onOpen}= useModal()


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


    const handleDeleteMessage = () => {
      onOpen(MODAL_TYPE.DELETE_MESSAGE, { 
        message,
        chanId,
        isPrivate: !chanId // Add any additional flags you need
      });
    };

  const handleUpdateMessage = () => {
    if (typeof onEdit === 'function') {
      onEdit(message);  // Pass the entire message object
    }
  };

  const showDeleteButton = message?.sender?._id === userInfo.userId || 
    ["admin", "moderator"].includes(userInfo.role);
    
  return (
    <div
      className="items-center rounded-md border border-solid  shadow-md group-hover:flex hidden transition-all hover:shadow-lg absolute top-[-16px] right-[16px]"
      style={{
        position: "fixed",
        backgroundColor: "hsl(211.03 33.333% 17.059%)",
        borderColor: "hsl(210 27.586% 22.745%)",
      }}
    >
      <div className="flex cursor-default  rounded-full border  border-none bg-[hsl(211.03 33.333% 17.059%)]"
        style={{ borderColor: "hsl(210 27.586% 22.745%)" }}
      > 
        {/* Reaction buttons */}
        {/* <button className="h-[32px] w-[32px] flex items-center justify-center text-neutral-content border-solid hover:bg-slate-700 rounded-sm transition-all">🔥</button>
        <button className="h-[32px] w-[32px] flex items-center justify-center text-neutral-content border-solid hover:bg-slate-700 rounded-sm transition-all">👍</button>
        <button className="h-[32px] w-[32px] flex items-center justify-center text-neutral-content border-solid hover:bg-slate-700 rounded-sm transition-all">👎</button>
        <button className="h-[32px] w-[32px] flex items-center justify-center text-neutral-content border-solid hover:bg-slate-700 rounded-sm transition-all">😊</button> */}
      </div>
      
      {showDeleteButton && (
        <button 
          onClick={handleUpdateMessage} 
          className="h-[32px] w-[32px] flex items-center justify-center text-neutral-content border-solid border-base-300 hover:bg-slate-700 rounded-sm transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pen-line"><path d="M12 20h9"></path><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"></path></svg>
        </button>
      )}
      
      {showDeleteButton && (
        <button 
          onClick={handleDeleteMessage}
          className="h-[32px] w-[32px] flex items-center justify-center text-neutral-content border-solid border-base-300 hover:bg-slate-700 rounded-sm transition-all text-red-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 text-error"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
        </button>
      )}
    </div>
  );
}
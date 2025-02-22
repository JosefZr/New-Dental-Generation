import { ArrowDown, Plus } from "lucide-react";
import { ActionTooltip } from "../ui/action-tooltip";
import { useModal } from "@/hooks/useModalStore";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { jwtDecode } from "jwt-decode";

export default function ServerSection({ label ,allowedRole, children,channelType }) {
    const { onOpen } = useModal();
    const [isExpanded, setIsExpanded] = useState(true);
    const { setChannelType, setChannelAllowedUsers } = useContext(UserContext);
    const userInfo = jwtDecode(localStorage.getItem("token"))
    const role = userInfo.role
    
    const handleCreateChannel = () => {
        console.log(allowedRole)
        setChannelType(channelType);
        setChannelAllowedUsers(allowedRole)
        onOpen("createChannel");
    };
    return (
        <div>
            <div className=" flex justify-between items-center">
                <div className="mt-3 mb-1 flex shrink-0 cursor-pointer gap-1 items-center font-bold hover:text-gray-200" style={{
                        color:"rgb(156 163 175)",
                        lineHeight:"1rem",
                        fontSize:"0.75rem",
                    }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <button 
                        className="  transition"
                    >
                        <ArrowDown className={` transition-transform mr-[2px] ml-[2px] h-3 w-3 transform ${isExpanded ? '-rotate-90' : ''}`}/>
                    </button>
                    <p className=" uppercase  " >
                        {label}
                    </p>
                </div>
                <ActionTooltip lebel="create channel" side="top">
                    {role==="admin" &&
                    <button 
                        className="text-zinc-400 hover:text-zinc-600 transition"
                        onClick={handleCreateChannel}
                        >
                        <Plus className="h-4 w-4"/>
                    </button>
                    } 
                </ActionTooltip>
            </div>
            <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {children}
            </div>
        </div>
    );
}
import { ArrowDown, Plus } from "lucide-react";
import { ActionTooltip } from "../ui/action-tooltip";
import { useModal } from "@/hooks/useModalStore";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { jwtDecode } from "jwt-decode";

export default function ServerSection({ label ,allowedRole, children }) {
    const { onOpen } = useModal();
    const [isExpanded, setIsExpanded] = useState(true);
    const { setChannelType } = useContext(UserContext);
    const userInfo = jwtDecode(localStorage.getItem("token"))
    const role = userInfo.role
    
    const handleCreateChannel = () => {
        console.log(allowedRole)
        setChannelType(allowedRole);
        onOpen("createChannel");
    };
    return (
        <div>
            <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-zinc-400 hover:text-zinc-600 transition"
                    >
                        <ArrowDown className={`h-4 w-4 transition-transform ${isExpanded ? '-rotate-90' : ''}`}/>
                    </button>
                    <p className="text-xs uppercase font-semibold text-zinc-400">
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
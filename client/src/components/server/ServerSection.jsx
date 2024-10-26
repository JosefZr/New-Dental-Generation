/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Plus, Settings } from "lucide-react";
import { ActionTooltip } from "../ui/action-tooltip";
import { useModal } from "@/hooks/useModalStore";

export default function ServerSection({label, role, sectionType, channelType, server}) {
    const {onOpen} = useModal();
  return (
    <div className=" flex items-center justify-between py-2  ">
        <p className="h-3  text-xs uppercase font-semibold text-zinc-400 ">
            {label}
        </p>
        {
            role !== "guest" && sectionType ==="channels" &&(
                <ActionTooltip lebel="create channel" side="top">
                    <button 
                        className=" text-zinc-400 hover:text-zinc-600 transition"
                        onClick={() => onOpen("createChannel")}
                    >
                        <Plus className="h-4 w-4"/>
                    </button>
                </ActionTooltip>
            )
        }
        {role === "admin" && sectionType==="members" &&(
            <ActionTooltip lebel="create channel" side="top">
                <button 
                    className=" text-zinc-400 hover:text-zinc-600 transition"
                    onClick={() => onOpen("members",{server})}
                >
                    <Settings className="h-4 w-4"/>
                </button>
            </ActionTooltip>
        )}
    </div>
  )
}

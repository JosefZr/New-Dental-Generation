/* eslint-disable react/prop-types */
import { Edit, Trash, Pin } from "lucide-react";
import { ActionTooltip } from "../ui/action-tooltip";
import { cn } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function ServerChannel({   
  channel,   
  id,
  onClickChan,   
  onDeleteClick,   
  onEditClick,
  onPinClick,
  isPinned
}) {
  const { clickedChannel } = useContext(UserContext)
  const userInfo = jwtDecode(localStorage.getItem("token"))

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDeleteClick();
  };

  const handleUpdateClick = (e) => {
    e.stopPropagation();
    onEditClick()
  }

  const handlePinClick = (e) => {
    e.stopPropagation();
    onPinClick();
  }

  return (
    <div style={{position:"relative"}}>
      {clickedChannel === id && (
        <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 bg-my-white rounded-r-full transition-all w-[4px] h-[8px]" />
      )}
      <div
        className={cn(
          "group mb-[2px] ml-[2px] flex h-[38px] items-center justify-between rounded-md pr-[6px] pl-[2px] text-grey-400 text-lg cursor-pointer hover:bg-zinc-700/10 hover:bg-opacity-50",
          clickedChannel === id && "bg-zinc-700/50"
        )}
        onClick={onClickChan}
      >
        <div className="ml-2 flex flex-1 items-center overflow-hidden">
          <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
            {channel}
          </span>
          {userInfo.role === "admin" && (
            <div className="ml-auto flex items-center gap-x-2">
              <ActionTooltip label={isPinned ? "Unpin Channel" : "Pin Channel"}>
                <button onClick={handlePinClick}>
                  <Pin 
                    className={`w-4 h-4 ${
                      isPinned 
                        ? 'text-yellow-500 fill-yellow-500' 
                        : 'text-zinc-400 hover:text-zinc-300'
                    } transition`} 
                  />
                </button>
              </ActionTooltip>
              <ActionTooltip label="Edit Channel">
                <button onClick={handleUpdateClick}>
                  <Edit className="w-4 h-4 text-zinc-400 hover:text-zinc-300 transition" />
                </button>
              </ActionTooltip>
              <ActionTooltip label="Delete Channel">
                <button onClick={handleDeleteClick}>
                  <Trash className="w-4 h-4 text-zinc-400 hover:text-zinc-300 transition" />
                </button>
              </ActionTooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
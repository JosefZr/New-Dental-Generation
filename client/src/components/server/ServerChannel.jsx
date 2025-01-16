import { Edit, Trash } from "lucide-react";
import { ActionTooltip } from "../ui/action-tooltip";
import { cn } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function ServerChannel({
  channel,
  onClickChan,
  onDeleteClick,
  onEditClick
}) {
  const { clickedChannel} = useContext(UserContext)
  const  userInfo = jwtDecode(localStorage.getItem("token"))
  const handleDeleteClick = (e) => {
    // Prevent click event from triggering the parent button click
    e.stopPropagation();
    onDeleteClick();  // Call the passed delete function
  };
  
  const handleUpdateClick = (e)=>{
      e.stopPropagation();
      onEditClick()
  }
  return (
<div style={{position:"relative"}}>
  {clickedChannel === channel && (
    <div
      className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 bg-my-white rounded-r-full transition-all w-[4px] h-[8px]"
    />
  )}
  <div
    className={cn(
      "group mb-[2px] ml-[2px] flex h-[38px] items-center justify-between rounded-md pr-[6px] pl-[2px] text-grey-400 text-lg cursor-pointer hover:bg-zinc-700/10 hover:bg-opacity-50",
      clickedChannel === channel && "bg-zinc-700/50"
    )}
    onClick={onClickChan}
  >
    <div className="ml-2 flex flex-1 items-center overflow-hidden">
      <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
        {channel}
      </span>
      {userInfo.role === "admin" && (
        <div className="ml-auto flex items-center gap-x-2">
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

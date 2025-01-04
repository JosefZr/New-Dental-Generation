import { Edit, Trash } from "lucide-react";
import { ActionTooltip } from "../ui/action-tooltip";
import { cn } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";

export default function ServerChannel({
  channel,
  onClickChan,
  onDeleteClick,
  onEditClick
}) {
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
    <button
      className={cn(
        "group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/50 transition mb-1"
      )}
      onClick={onClickChan}
    >
      <p className={cn("line-clamp-1 font-semibold text-md group-hover:text-zinc-300 text-zinc-400 transition")}>
        {channel}
      </p>
      {userInfo.role ==="admin" && <div className="ml-auto flex items-center gap-x-2">
        <ActionTooltip label="Edit Channel">
          <button onClick={handleUpdateClick}>
            <Edit className="hidden group-hover:block w-4 h-4 text-zinc-400 hover:text-zinc-300 transition" />
          </button>
        </ActionTooltip>

        <ActionTooltip label="Delete Channel">
          <Trash 
            className="hidden group-hover:block w-4 h-4 text-zinc-400 hover:text-zinc-300 transition"
            onClick={handleDeleteClick} // Attach delete handler here
          />
        </ActionTooltip>
      </div>}
    </button>
  );
}

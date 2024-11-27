import { cn } from "@/lib/utils";
import { FaHashtag } from "react-icons/fa6";
import { ActionTooltip } from "../ui/action-tooltip";
import { Edit, Trash } from "lucide-react";
export default function ServerChannel({
  channel,
  server,
  memberRole,
  onClickChan,
}) {
  // const Icon = ""
  const role = "guest";

  return (
    <button
      className={cn(
        "group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/50 transition mb-1"
        // params?.channelId === channelId.id && "bg-zinc-700"
      )}
      onClick={onClickChan}
    >
      <FaHashtag className="flex-shrink-0 w-5 h-5 text-zinc-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm group-hover:text-zinc-300 text-zinc-400 transition "
          // params?.channelId === channel.id && "text-zinc-200  hover:text-white"
        )}
      >
        {channel}
      </p>
      {channel !== "generale" && role !== "guest" && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit Channel">
            <Edit className=" hidden group-hover:block w-4 h-4 text-zinc-400 hover:text-zinc-300 transition" />
          </ActionTooltip>

          <ActionTooltip label="Edit Channel">
            <Trash className=" hidden group-hover:block w-4 h-4 text-zinc-400 hover:text-zinc-300 transition" />
          </ActionTooltip>
        </div>
      )}
    </button>
  );
}

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useParams, useNavigate, Link } from "react-router-dom";
import { ActionTooltip } from "../ui/action-tooltip";
import { cn } from "@/lib/utils";

export default function NavigationItem({ id, image, imageUrl }) {
  const params = useParams();
  const navigate = useNavigate(); // Use navigate instead of useHistory

  return (
    <Link to={`/${id}`}>
      <button className="group relative flex items-center hover:bg-slate-900 py-3">
        <div
          className={cn(
            "absolute left-0 bg-my-white rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id
              ? "bg-my-white/10"
              : "bg-transparent rounded-[16px]"
          )}
        >
          <div className="object-cover w-full h-full text-white">
            {imageUrl}
          </div>
        </div>
      </button>
    </Link>
  );
}

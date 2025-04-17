import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const getTooltipText = (id) => {
  const tooltips = {
    "channels": "Global Channels",
    "chat2": "Strategy Discussion",
    "chat3": "Financial Hub",
    "growth-support": "Growth & Support",
    "top-dentist-opportunity": "Premium Opportunities",
    "job-opportunities": "Job Board",
    "sunnah": "Islamic Guidance"
  };
  return tooltips[id] || id;
};

export default function NavigationItem({ id, imageUrl }) {
  const location = useLocation(); // Get the current location
  const isActive = location.pathname.includes(`/${id}`); // Check if the current path includes the id
// Helper function to get tooltip text based on id

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={`/${id}`}>
            <button className="group relative flex items-center hover:bg-slate-900 py-3 w-full">
              <div
                className={cn(
                  "absolute left-0 bg-my-white rounded-r-full transition-all w-[4px]",
                  isActive ? "h-[8px] group-hover:h-[20px]" : ""
                )}
              />
              <div
                className={cn(
                  "relative flex mx-3 h-[40px] w-auto transition-all overflow-hidden",
                  isActive ? "bg-my-white/10" : "bg-transparent "
                )}
              >
                <div className={`${isActive ? "opacity-100 text-my-gold":"opacity-60 text-[##8ca4b5]" }  object-cover w-full h-full  `}>
                  {imageUrl}
                </div>
              </div>
            </button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" align="center" className="text-md py-[2px] font-semibold bg-black" style={{
                fontFamily: "inter, system-ui, sans-serif"
            }}>
          {getTooltipText(id)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

import { IoIosInformationCircleOutline } from "react-icons/io";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { progress } from "./Preview";
import { FaRegChessKnight } from "react-icons/fa6";
import { GiLaurelCrown } from "react-icons/gi";
import { CiCirclePlus } from "react-icons/ci";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { useGetAllOtherRoles } from "@/hooks/roles/useGetAllOtherRoles";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useLocation } from "react-router-dom";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";

export default function Informations({ user }) {
  const { onOpen } = useModal();
  const { userPreview } = useContext(UserContext);
  const location = useLocation();
  const isProfile = location.pathname.includes("profile");

  // Determine userId based on the page context
  const userId = isProfile ? user._id : userPreview?._id;
  const userInfo= useAuthUser()
console.log(userInfo.role)

  const { data, isLoading, isError, refetch } = useGetAllOtherRoles(userId);
  const [localRoles, setLocalRoles] = useState([]);
  
  // Update local state when API data changes
  useEffect(() => {
    if (data?.moreRole) {
      setLocalRoles(data.moreRole);
    }
  }, [data]);

  const getDaysDifference = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    
    // Reset time portion to ensure accurate day calculation
    created.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    
    const diffTime = Math.abs(now - created);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const diffDays = getDaysDifference(user.createdAt);

  // Find current progress stage
  const currentProgress = progress.find(stage => 
    diffDays <= stage.maxDays
  ) || progress[progress.length - 1];

  // Helper function to get role color
  const getRoleColor = (role) => {
    switch(role) {
      case "dentist": return "#ECC879";
      case "store": return "rgb(52, 152, 219)";
      case "lab": return "rgb(255, 255, 255)";
      case "admin": return "rgb(227, 2, 2)";
      case "moderator": return "#C0C0C0";
      case "Business Consultant":return "#006039 "
      case "Genius Marketer":return "#a37e2c "
      case "Opportunity Giver":return "#F4EBD0 "

      default: return "rgb(193, 183, 251)";
    }
  };

  // Helper function to get role display name
const getRoleDisplayName = (role) => {
    switch(role) {
        case "dentist": return "Dentist";
        case "store": return "Dental Store";
        case "lab": return "Dental Lab";
        case "admin": return "Dr.Truth";
        case "moderator": return "Soldier of Dr.Truth";
        case "Business Consultant" : return "Business Consultant";
        case "Genius Marketer" : return "Genius Marketer";
        case "Opportunity Giver" : return "Opportunity Giver";
        default: return "Unknown Role";
    }
};

    return (
        <div className="h-[370px] overflow-y-auto p-[24px] swipe-dialog-scroll-descendant w-full">
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between ">
                <div className="flex items-center gap-1 transition-all text-sm font-semibold">
                Power Level:
                <span className="bg-primary-gradient bg-clip-text text-my-gold">{user.coin}</span>
                <TooltipProvider>
                    <Tooltip>
                    <TooltipTrigger> 
                        <IoIosInformationCircleOutline className="self-start w-4 h-auto text-my-gray"/>
                    </TooltipTrigger>
                    <TooltipContent>
                        <div className="bg-[hsl(211.3 46.939% 9.6078%)] p-4 rounded-lg text-lg">
                        Gain Power Level By:
                        <ul className="list-disc ml-8 ">
                            <li>By Logging in Daily</li>
                        </ul>
                        </div>
                    </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                </div>
                <div className="flex items-end gap-1 text-grey-500 text-sm">
                <div className="text-my-gold text-[35px] w-[35px] h-[35px] left-[70px]" style={{bottom:"-2px"}}>
                    {currentProgress.logo}
                </div>
                <span>
                    {user.role === "admin" || user.role === "moderator" ? 
                    <FaRegChessKnight className="h-8 w-auto" /> : 
                    user.subscriptionPlan === "freeTrial" ?
                        <GiLaurelCrown className="h-8 w-auto text-my-gray" /> : 
                        <GiLaurelCrown className="h-8 w-auto text-my-gold" />
                    }
                </span>
                <span className="text-yellow-500 text-[22px] self-center">⚡</span>
                </div>
            </div>
            </div> 
        </div>
        <section>
            <div className="flex items-center justify-between">
            <div className="font-semibold text-sm flex justify-between items-center flex-row gap-2">
                Roles 
                {userInfo.role ==="admin" &&<CiCirclePlus 
                className="w-7 h-auto cursor-pointer" 
                onClick={() => onOpen(MODAL_TYPE.ADD_ROLE)}
                />}
            </div>
            </div>
            <div className="mt-[14px] flex flex-wrap gap-1">
            {/* Main role */}
            <div className="flex items-center rounded-md bg-neutral-900 px-2 py-1 font-semibold text-sm">
                <div 
                className="mr-2 h-3 w-3 rounded-full" 
                style={{ backgroundColor: getRoleColor(user.role) }}
                ></div>
                <span style={{ fontWeight: "bold", color: getRoleColor(user.role) }}>
                {getRoleDisplayName(user.role)}
                </span>
            </div>
            
            {/* Additional roles */}
            {localRoles.map((role, index) => (
                <div key={index} className="flex items-center rounded-md bg-neutral-900 px-2 py-1 font-semibold text-sm">
                <div 
                    className="mr-2 h-3 w-3 rounded-full" 
                    style={{ backgroundColor: getRoleColor(role. name) }}
                ></div>
                <span style={{ fontWeight: "bold", color: getRoleColor(role.name) }}>
                    {getRoleDisplayName(role.name)}
                </span>
                </div>
            ))}
            </div>
        </section>
        </div>
    );
}
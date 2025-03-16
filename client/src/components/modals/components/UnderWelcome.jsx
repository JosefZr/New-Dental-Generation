import { progress } from "@/components/Profile/Preview";
import { LiaChessKingSolid } from "react-icons/lia";
import { UserContext } from "@/context/UserContext";
import  { useContext } from "react";
import { calculatePercentage, getCurrentProgress, getDaysDifference, getNextProgress } from "@/utils/progressUtils";
export default function UnderWelcome() {
    const {user} = useContext(UserContext)
    const diffDays = getDaysDifference(user.createdAt);
    const currentProgress = getCurrentProgress(diffDays, progress);
    const percentage = calculatePercentage(diffDays, currentProgress);
    const nextProgress = getNextProgress(progress, currentProgress);
    // Calculate days remaining until next stage
    const daysRemaining = Math.max(0, currentProgress.maxDays - diffDays);

    // Helper function to determine rank based on days
    const getRank = (days) => {
        if (days <= 180) return "Silver";
        if (days <= 330) return "Gold";
        if (days <= 450) return "Platinum";
        if (days <= 540) return "Diamond";
        return "Diamond King";
    };
    const getColor = (days) => {
        if(user?.role === "admin" || user?.role === "moderator") return "rgb(185, 242, 255)"
        if (days <= 180) return "#EBEBEB";
        if (days <= 330) return "#F4EBD0";
        if (days <= 450) return "rgb(80, 200, 120)";
        if (days <= 540) return "rgb(185, 242, 255)";
        return "rgb(185, 242, 255)";
    };
  return (
    <div className=" w-full items-between mt-4 mb-1 flex flex-col gap-2">
        <div className=" flex w-full items-center flex-col justify-center whitespace-nowrap text-center font-semibold text-lg transition-opacity duration-500 ease-linear md:text-md opacity-1 gap-2">
            <div className="flex flex-row items-center">
            <div className=" text-[34px] w-[34px] h-[34px] " >
            {user.role==="admin" ?(
            <LiaChessKingSolid style={{color:"rgb(185, 242, 255)"}}/>
                ):(
                    nextProgress.logo
                )}
            </div>
            {user.role==="admin" ? (
                <span  style={{color:"rgb(185, 242, 255)"}}>Diamond King</span>
            ):(
            <span className="">
                {getRank(diffDays)}{' '}
                    {diffDays <= 540 ? 
                        `${nextProgress.name} in ${daysRemaining} days` : 
                        'Diamond King'
                }
            </span>
            )}
            </div>
            <div style={{position:"relative",height:"5px"}} className="flex-shrink-0 rounded-md bg-gray-600 w-full" >
            <div className="absolute top-0 left-0 h-full origin-left rounded-md transition-transform duration-500 ease-linear" 
                style={{width:`${user.role ==="admin" ?99  : percentage}%`, backgroundColor:getColor(diffDays)}}
            ></div>
            <div className={`absolute top-0 left-0 rounded-full transition-transform duration-500 ease-linear will-change-transform`} 
                style={{
                    backgroundColor:getColor(diffDays),
                    width: "10px",
                    height: "10px" ,
                    top: "-2px", 
                    left:`${user.role ==="admin" ?99  : percentage -1}%`}}></div>
            </div>
        </div>
    </div>  
    )
}

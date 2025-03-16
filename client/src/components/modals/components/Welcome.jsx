import { UserContext } from "@/context/UserContext";
import  { useContext } from "react";
import BigProfileLogo from "@/components/BigProfileLogo";
import { LiaChessKingSolid } from "react-icons/lia";
import { progress } from "@/components/Profile/Preview";
import { calculatePercentage, getCurrentProgress, getDaysDifference, getNextProgress } from "@/utils/progressUtils";
import UnderWelcome from "./UnderWelcome";

export default function Welcome() {
    const {user} = useContext(UserContext)
        const diffDays = getDaysDifference(user.createdAt);
        const currentProgress = getCurrentProgress(diffDays, progress);
        const percentage = calculatePercentage(diffDays, currentProgress);
        const nextProgress = getNextProgress(progress, currentProgress);
    // Find current progress stage

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
    
            <div className="flex flex-col justify-between rounded-xl sm:mt-4 bg-my-Modal-back sm:p-4 h-[200px]">
                <div className="m-[2px] flex items-start gap-2">
                <section style={{position:"relative"}} className=" flex-shrink-0 rounded-full bg-base-300 mr-2 cursor-pointer">
                    <BigProfileLogo image={user.avatar}/>
                    <div className="absolute text-[22px] w-[22px] h-[18px] left-[30px] " style={{bottom:"2px"}}>
                        {user.role==="admin" ?(
                            <LiaChessKingSolid style={{color:"rgb(185, 242, 255)"}}/>
                        ):(
                            currentProgress.logo
                        )}
                    </div>
                </section>
                <section className="flex min-h-[40px] flex-1 flex-col items-baseline justify-between sm:min-h-[56px]">
                    <div className="subtitle font-light text-base opacity-80">Welcome,</div>
                    <div className="text-xl sm:font-medium sm:text-2xl uppercase">{user.firstName} {user.lastName}</div>
                </section>
                </div>
                <hr className="mt-2 opacity-25"/>
                <UnderWelcome/>
            </div>

  )
}

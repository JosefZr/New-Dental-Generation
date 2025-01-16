import { UserContext } from "@/context/UserContext";
import React, { useContext } from "react";
import { progress } from "@/lib/ProgressData";
import { Logo } from "@/components/server/ServerSideBar";


export default function Welcome() {
    const {user} = useContext(UserContext)
    
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

// Calculate percentage within current stage
const calculatePercentage = () => {
    const stageStartDays = currentProgress.progress;
    const stageDuration = 30; // Each stage is 30 days
    const daysInCurrentStage = diffDays - stageStartDays;
    
    const percentage = Math.min((daysInCurrentStage / stageDuration) * 100, 100);
    return Math.max(0, percentage); // Ensure percentage is not negative
};

    const percentage = calculatePercentage();

    // Find next progress stage
    const nextProgress = progress.find(stage => 
        stage.progress > currentProgress.progress
    ) || currentProgress;

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
  return (
    <div className="col-span-3 row-span-3 flex flex-col justify-between gap-2">
        <div className="grid h-full w-full grid-cols-2 grid-rows-1 gap-3">
            <div className="flex flex-col items-between col-span-2 row-span-1  justify-between rounded-xl sm:mt-4 sm:bg-gray-900 sm:p-4 h-full">
                <div className="m-[2px] flex items-start gap-4">
                <section style={{position:"relative"}} className=" flex-shrink-0 rounded-full bg-base-300 mr-2 cursor-pointer">
                    <Logo style={{ backgroundImage: `url(http://localhost:3000/uploads/${user.avatar})` ,width:"40px", height:"40px"}}  className="rounded-full object-cover "  />
                    <div className="absolute text-[22px] w-[22px] h-[22px] left-[25px] " style={{bottom:"2px"}}>
                        {React.createElement(currentProgress.logo)}
                    </div>
                </section>
                <section className="flex min-h-[40px] flex-1 flex-col items-baseline justify-between sm:min-h-[56px]">
                    <div className="subtitle font-light text-base opacity-80">Welcome,</div>
                    <div className="text-xl sm:font-medium sm:text-2xl">{user.firstName} {user.lastName}</div>
                </section>
                </div>
                <hr className="mt-2 opacity-25"/>
                <div className=" items-between mt-4 mb-1 flex flex-col gap-2">
                    <div className="flex w-full items-center flex-col justify-center whitespace-nowrap text-center font-semibold text-md transition-opacity duration-500 ease-linear md:text-md opacity-1 gap-2">
                        <div className="flex flex-row items-center">
                        <div className=" text-[30px] w-[30px] h-[30px] " >
                            {React.createElement(nextProgress.logo)}
                        </div>
                        <span className="hidden md:inline">
                        {getRank(diffDays)}{' '}
                            {diffDays <= 540 ? 
                                `${nextProgress.name} in ${daysRemaining} days` : 
                                'Diamond King'}
                        </span>
                        </div>
                        <div className="relative flex-shrink-0 rounded-md bg-gray-600 w-full" style={{height:"5px"}}>
                        <div className="absolute top-0 left-0 h-full origin-left rounded-md bg-my-gold transition-transform duration-500 ease-linear" 
                            style={{width:`${percentage}%`}}
                        ></div>
                        <div className="absolute top-0 left-0 rounded-full bg-my-gold transition-transform duration-500 ease-linear will-change-transform" 
                            style={{
                                width: "8px",
                                height: "8px" ,
                                top: "-1.5px", 
                                left:`${percentage}%`}}></div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

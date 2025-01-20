import { UserContext } from "@/context/UserContext";
import { progress } from "@/lib/ProgressData";
import React, { useContext } from "react";


export default function SmallProgress() {
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
    <div className="flex flex-col gap-2">
    <div className="flex w-full items-center justify-center whitespace-nowrap text-center text-sm transition-opacity duration-500 ease-linear md:text-md opacity-1">
    <div className="flex w-full items-center flex-col justify-center whitespace-nowrap text-center font-semibold text-md transition-opacity duration-500 ease-linear md:text-md opacity-1 gap-2">
        <div className="flex flex-row items-center">
        <div className=" text-[30px] w-[30px] h-[30px] " >
            {React.createElement(nextProgress.logo)}
        </div>
        <span className="">
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
  )
}

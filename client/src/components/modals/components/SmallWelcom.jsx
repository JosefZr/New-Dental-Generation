import React, { useContext } from 'react'
import { Logo } from "@/components/server/ServerSideBar";
import { UserContext } from '@/context/UserContext';
import { progress } from '@/lib/ProgressData';

export default function SmallWelcom() {
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
  return (
    <div className="Card bg-gradient-to-br from-[#353F47] to-[rgba(6,14,21,0)]">
    <div className="Card Card-side card-compact m-[2px] h-full gap-4 border-transparent bg-next-cloudstone p-4">
        <section style={{position:"relative"}} className=" flex-shrink-0 rounded-full bg-base-300 ">
            <Logo style={{ backgroundImage: `url(http://localhost:3000/uploads/${user.avatar})` ,width:"50px", height:"50px"}}  className="rounded-full object-cover "  />
            <div className="absolute text-[22px] w-[22px] h-[22px] left-[30px] " style={{bottom:"-6px"}}>
                {React.createElement(currentProgress.logo)}
            </div>
        </section>
        <section className="flex min-h-[40px] flex-1 flex-col items-baseline justify-between sm:min-h-[56px]">
            <div className="subtitle font-light text-base opacity-80">Welcome,</div>
            <div className="text-xl sm:font-medium sm:text-2xl">{user.firstName} {user.lastName}</div>
        </section>  
    </div>
</div>
  )
}

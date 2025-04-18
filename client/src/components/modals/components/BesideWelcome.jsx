import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";

export default function BesideWelcome() {
        const { user } = useContext(UserContext);
        const [timeLeft, setTimeLeft] = useState("");
    
      // Calculate time left for subscription
        useEffect(() => {
            const calculateTimeLeft = () => {
            const currentDate = new Date();
            const endDate = new Date(
                user.subscriptionPlan === "freeTrial" ? user.trialEndDate : user.subscriptionEndDate
            );
            const timeDifference = endDate - currentDate;
        
            if (timeDifference <= 0) {
                setTimeLeft("Subscription Expired");
                return;
            }
        
            const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            if (daysLeft > 1) {
                setTimeLeft(`${daysLeft} days left`);
            } else if (daysLeft === 1) {
                setTimeLeft("1 day left");
            } else {
                const minutesLeft = Math.floor(timeDifference / (1000 * 60));
                setTimeLeft(`${minutesLeft} minutes left`);
            }
            };
        
            calculateTimeLeft();
            const timer = setInterval(calculateTimeLeft, 60000); // Update every minute
        
            return () => clearInterval(timer);
        }, [user]);
    return (
        <div className="bg-my-Modal-back col-span-1 gap-5 row-span-1 flex flex-col justify-center h-[200px] rounded-xl sm:mt-4  sm:p-4">
            <div>
                <div className="flex flex-row items-center text-xl">
                    <span className="font-normal opacity-50">My Coins: </span>
                    <span className="font-medium">{user.coin}</span>
                </div>
            </div>
            <div >
            <div className="flex flex-row items-center text-xl">
                <span className="font-normal opacity-50">My Role: </span>
                <span className="font-medium">{user.role}</span>
            </div>
            </div>
            <div>
            <div className="">
                <span className="font-normal opacity-50 text-xl">My Subscription: </span>
                <div className="bg-gradient-to-r from-my-from to-my-to h-10 w-full mt-3 rounded-md text-black text-center flex justify-center items-center font-semibold text-lg uppercase">
                    <div className="">{timeLeft}</div>
                </div>
            </div>
            </div>
        </div>
    )
}

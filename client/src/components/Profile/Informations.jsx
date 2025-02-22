
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { progress } from "./Preview";
import { FaRegChessKnight } from "react-icons/fa6";
import { GiLaurelCrown } from "react-icons/gi";

export default function Informations({user}) {
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
    <div className=" h-[370px] overflow-y-auto p-[24px] swipe-dialog-scroll-descendant w-full">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between ">
                        <div className="flex items-center gap-1 transition-all text-sm font-semibold ">Power Level:
                            <span className="bg-primary-gradient bg-clip-text text-my-gold">{user.coin}</span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger> 
                                        <IoIosInformationCircleOutline className=" self-start w-4 h-auto text-my-gray"/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                    <div className="bg-[hsl(211.3 46.939% 9.6078%)] p-4 rounded-lg text-lg">Gain Power Level By:
                                        <ul className="list-disc ml-8 ">
                                            <li>By Logging in Daily</li>
                                            
                                        </ul>
                                    </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="flex items-end gap-1 text-grey-500 text-sm">
                            <div className=" text-my-gold  text-[35px] w-[35px] h-[35px] left-[70px]" style={{bottom:"-2px"}}>{currentProgress.logo}</div>
                            <span >{user.role ==="admin" && user.role==="moderator"? <FaRegChessKnight className="h-8 w-auto "/>: user.subscriptionPlan==="freeTrial" ?<GiLaurelCrown className=" h-8 w-auto text-my-gray"/> : <GiLaurelCrown className=" h-8 w-auto text-my-gold"/>}</span>
                            <span className="text-yellow-500 text-[22px] self-center">⚡</span>
                        </div>
                    </div>
                </div> 
            </div>
            <section>
                <div className="flex items-center justify-between">
                    <div className="font-semibold text-sm">Roles</div>
                </div>
                <div className="mt-[14px] flex flex-wrap gap-1">
                        <div className="flex items-center rounded-md bg-neutral-900 px-2 py-1 font-semibold text-sm">
                            <div className="mr-2 h-3 w-3 rounded-full" 
                            style={{
                                backgroundColor:`${user.role==="dentist" ?  "#ECC879":
                                    user.role==="store" ?"rgb(52, 152, 219)":
                                    user.role==="lab"? "rgb(255, 255, 255)":
                                    user.role==="admin"? "rgb(179, 51, 51)":
                                    user.role==="moderator"?"#C0C0C0"
                                    :"rgb(201, 142, 215)"
                                }`
                            }}
                            ></div>
                            <span 
                                style={{
                                    fontWeight:"bold",
                                    color:`${user.role==="dentist" ?  "#ECC879":
                                        user.role==="store" ?"rgb(52, 152, 219)":
                                        user.role==="lab"? "rgb(255, 255, 255)":
                                        user.role==="admin"? "rgb(179, 51, 51)":
                                        user.role==="moderator"?"#C0C0C0"
                                        :"rgb(201, 142, 215)"
                                    }`
                                }}>
                                {user.role==="dentist" ? "Dentist":
                                user.role==="store" ?"Dental Store":
                                user.role==="lab"? "Dental Lab":
                                user.role==="admin"? "Dr.Truth":
                                user.role==="moderator"?"Soldier of Dr.Truth"
                                :"TOP DENTIST"
                                }
                            </span>
                        </div>
                    </div>
            </section>
        </div>
  )
}

/* eslint-disable react/prop-types */
import { GiLaurelCrown } from "react-icons/gi";
import { FaRegChessKnight } from "react-icons/fa6";
import { LiaChessBishopSolid, LiaChessKingSolid, LiaChessPawnSolid, LiaChessQueenSolid, LiaChessRookSolid } from "react-icons/lia";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { LiaChessKnightSolid } from "react-icons/lia";
import Informations from "./Informations";
import Journey from "./Journey";
import { useState } from "react";

export const progress=[
    {
        name:"Pawn",
        progress:0,
        logo:<LiaChessPawnSolid className="text-my-white-gray"/>,
        maxDays: 30
        },
        {
        name:"Rock",
        progress:30,
        logo:<LiaChessRookSolid className="text-my-white-gray"/>,
        maxDays: 60
        },
        {
        name:"Knight",
        progress:60,
        logo:<LiaChessKnightSolid className="text-my-white-gray"/>,
        maxDays: 90
        },
        {
        name:"Bishop",
        progress:90,
        logo:<LiaChessBishopSolid className="text-my-white-gray"/>,
        maxDays: 120
        },
        {
        name:"Queen",
        progress:120,
        logo:<LiaChessQueenSolid className="text-my-white-gray"/>,
        maxDays: 150
        },
        {
        name:"King",
        progress:150,
        logo:<LiaChessKingSolid className="text-my-white-gray"/>,
        maxDays: 180
        },
        {
        name:"Rock",
        progress:180,
        logo:<LiaChessRookSolid className="text-my-gold"/>,
        maxDays: 210
    
        },
        {
        name:"Knight",
        progress:210,
        logo:<LiaChessKnightSolid className="text-my-gold"/>,
        maxDays: 240
        },
        {
        name:"Bishop",
        progress:240,
        logo:<LiaChessBishopSolid className="text-my-gold"/>,
        maxDays: 270
        },
        {
        name:"Queen",
        progress:270,
        logo:<LiaChessQueenSolid className="text-my-gold"/>,
        maxDays: 300
        },
        {
        name:"King",
        progress:300,
        logo:<LiaChessKingSolid className="text-my-gold"/>,
        maxDays: 330
        },
    
        {
        name:"Knight",
        progress:330,
        logo:<LiaChessKnightSolid style={{color:"rgb(80, 200, 120)"}}/>,
        maxDays: 360
        },
        {
        name:"Bishop",
        progress:360,
        logo:<LiaChessBishopSolid style={{color:"rgb(80, 200, 120)"}}/>,
        maxDays: 390
        },
        {
        name:"Queen",
        progress:390,
        logo:<LiaChessQueenSolid style={{color:"rgb(80, 200, 120)"}}/>,
        maxDays: 420
        },
        {
        name:"King",
        progress:420,
        logo:<LiaChessKingSolid style={{color:"rgb(80, 200, 120)"}}/>,
        maxDays: 450
        },
        {
        name:"Bishop",
        progress:450,
        logo:<LiaChessBishopSolid  style={{color:"rgb(185, 242, 255)"}}/>,
        maxDays: 480
        },
        {
        name:"Queen",
        progress:480,
        logo:<LiaChessQueenSolid style={{color:"rgb(185, 242, 255)"}}/>,
        maxDays: 510
        },
        {
        name:"King",
        progress:510,
        logo:<LiaChessKingSolid style={{color:"rgb(185, 242, 255)"}}/>,
        maxDays: 540
        },
]
const menuItems = [
  {
    label: "infromation",
    value: "infromation",
    component: (props) => <Informations {...props} />,
  },
  {
    label: "Your Dental Journey",
    value: "Your Dental Journey",
    component: (props) => <Journey {...props} />,
  },
]

// eslint-disable-next-line react/prop-types
export default function Preview({user}) {
   // Fix date difference calculation
     const [activeTab, setActiveTab] = useState("infromation")
   
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
const ActiveComponent = menuItems.find((menu) => menu.value === activeTab)?.component;

    return (
        <div className="preview-container relative w-full bg-base-100 text-white">
        {/* Background Image */}
        <div
        className="relative h-[120px] w-full"
        style={{
            backgroundImage: `url(http://localhost:3000/uploads/${user.background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        }}
        >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        {/* Avatar and Name */}
        <div className="relative flex px-4 -mt-[55px]" style={{alignSelf:"flex-start",flexDirection:"row" }}>
        {/* Avatar */}
        <div className="flex-shrink-0 rounded-full border-4 border-black overflow-hidden" style={{ width: "88px", height: "88px" }}>
            <img
            src={`http://localhost:3000/uploads/${user.avatar}`}
            alt="Avatar"
            className="w-full h-full object-cover"
            />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild> 
                        <div className="absolute text-my-gold  text-[35px] w-[35px] h-[35px] left-[70px]" style={{bottom:"-2px"}}>
                            {currentProgress.logo}
                        </div>
                        </TooltipTrigger>
                        <TooltipContent>
                        <div className="bg-black p-4 rounded-lg text-lg w-[400px] text-center">Login each day to receive progress towards your next chess rank
                            <div className="flex flex-row justify-between">
                                <div >
                                    <span className=" underline">Silver</span>
                                    <ul>
                                        {progress.map((prog, idex)=>{
                                            if(prog.progress>=0 && prog.progress<=150){
                                                return <li key={idex} className="flex items-center flex-row text-my-white-gray ">
                                                        {prog.logo}
                                                        {prog.progress}
                                                    </li>
                                            }
                                        })}
                                    </ul>
                                </div>
                                <div><span className=" underline">Gold</span>
                                    <ul>
                                        {progress.map((prog, idex)=>{
                                            if(prog.progress>150 && prog.progress<=300){
                                                return <li key={idex} className="flex items-center flex-row text-my-gold">
                                                        {prog.logo}
                                                        {prog.progress}
                                                    </li>
                                            }
                                        })}
                                    </ul>
                                </div>
                                <div >
                                    <span className=" underline">Emerald</span>
                                <ul>
                                    {progress.map((prog, idex)=>{
                                        if(prog.progress>300 && prog.progress<=420){
                                            return <li key={idex} className="flex items-center flex-row "style={{color:"rgb(80, 200, 120)"}}>
                                                    {prog.logo}
                                                    {prog.progress}
                                                </li>
                                        }
                                    })}
                                </ul>
                                </div>
                                <div >
                                    <span className=" underline">Diamond</span>
                                <ul>
                                    {progress.map((prog, idex)=>{
                                        if(prog.progress>420 && prog.progress<=510){
                                            if(prog.progress===510){
                                                return <li key={idex} className="flex items-center flex-row "style={{color:"rgb(185, 242, 255)"}}>
                                                    {prog.logo}
                                                    {prog.progress} + day&apos;s
                                                </li>
                                            }
                                            return <li key={idex} className="flex items-center flex-row "style={{color:"rgb(185, 242, 255)"}}>
                                                    {prog.logo}
                                                    {prog.progress}
                                                </li>
                                        }
                                    })}
                                </ul>
                                </div>
                            </div>
                        </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
        </div>
        {/* Name and Icon */}
        <div className="inline-flex items-center mb-7 ml-5 max-w-[230px] font-bold text-lg text-white sm:max-w-none  flex-row justify-center">
        <div className="flex items-center gap-1">
            <span className="text-lg font-bold">{user.firstName} {user.lastName}</span>
            <span >{user.role ==="admin" && user.role==="moderator"? <FaRegChessKnight className="h-8 w-auto "/>: user.subscriptionPlan==="freeTrial" ?<GiLaurelCrown className=" h-8 w-auto text-my-gray"/> : <GiLaurelCrown className=" h-8 w-auto text-my-gold"/>}</span>
            <span className="text-yellow-500">⚡</span>
        </div>
        </div>
        </div>

        <section className="flex items-center gap-3 p-4 pt-[10px] w-full">
        <div className="flex-1 ">
            <div className="flex w-full items-center justify-center text-center transition-opacity duration-500 ease-linear opacity-1">
            <div className=" text-my-gold  text-[30px] w-[30px] h-[30px] " >
                {nextProgress.logo}
            </div>
            <div>
                <span className="">
                {getRank(diffDays)}{' '}
                    {diffDays <= 540 ? 
                        `${nextProgress.name} in ${daysRemaining} days` : 
                        'Diamond King'}
                </span>
            </div>
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
        {/* <div className="flex items-center gap-1 rounded-md bg-top px-[6px] py-1 font-bold text-primary text-sm cursor-pointer mt-[15px] bg-my-dark-blue">
            <GiCrownCoin className="flex self-start text-my-gold" style={{height:"18px", width:"18px"}}/>
            <span className="text-my-gold">{user.coin}</span>
        </div> */}
        </section>

        <section className="line-clamp-4 px-[50px] pt-3 text-center text-sm break-words">{user.bio}</section>

        <div
  style={{ position: "relative" }}
  className="flex flex-row font-medium mt-[24px] h-[40px] w-full border-b border-gray-600"
>
  {menuItems.map((menuItem, index) => (
    <button
      key={index}
      className={`flex-1 cursor-pointer flex items-center justify-center transition-all hover:bg-slate-700 border-b-[2px] ${
        activeTab === menuItem.label ? "bg-slate-800 border-blue-50" : "border-transparent"
      }`}
      onClick={() => setActiveTab(menuItem.label)}
    >
      <span className="whitespace-nowrap bg-clip-text text-my-white">{menuItem.label}</span>
    </button>
  ))}
</div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-hidden mt-4 w-[90%]">{ActiveComponent && <ActiveComponent user={user} />}</div>

        </div>
    )
    }

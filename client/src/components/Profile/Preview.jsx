/* eslint-disable react/prop-types */
import { GiCrownCoin, GiLaurelCrown } from "react-icons/gi";
import { FaRegChessKnight } from "react-icons/fa6";
import { LiaChessBishopSolid, LiaChessKingSolid, LiaChessPawnSolid, LiaChessQueenSolid, LiaChessRookSolid } from "react-icons/lia";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { LiaChessKnightSolid } from "react-icons/lia";

const progress=[
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
// eslint-disable-next-line react/prop-types
export default function Preview({user}) {
    const diffrenseDate = new Date().getDate() - new Date(user.createdAt).getDate();

    const currentProgress = progress.find(stage => 
        diffrenseDate <= stage.maxDays
    ) || progress[16];
    const persentage =100- ((currentProgress.maxDays-diffrenseDate)/30)*100
    
    const NextProgress = progress.find(stage => 
        diffrenseDate <=( stage.maxDays-30)
    ) || progress[16];

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
                {NextProgress.logo}
            </div>
            <div>
                <span className="hidden md:inline">
                {
                    diffrenseDate >=0 && diffrenseDate<= 180 ?"Silver ":
                    diffrenseDate >=180 && diffrenseDate<= 330 ?"Gold ":
                    diffrenseDate >=330 && diffrenseDate<= 450 ?"Platinum ":
                    diffrenseDate >=450 && diffrenseDate<= 540 ?"Diamond ":"Diamond King "
                } 
                {diffrenseDate <=540 ? `${NextProgress.name} in ${currentProgress.maxDays-diffrenseDate} days`:''}
                </span>
            </div>
            </div>
            <div className="relative flex-shrink-0 rounded-md bg-gray-600 w-full" style={{height:"5px"}}>
            <div className="absolute top-0 left-0 h-full origin-left rounded-md bg-my-gold transition-transform duration-500 ease-linear" style={{width:`${persentage}%`}}></div>
            <div className="absolute top-0 left-0 rounded-full bg-my-gold transition-transform duration-500 ease-linear will-change-transform" style={{width: "8px",height: "8px" ,top: "-1.5px", left:`${persentage}%`}}></div>
            </div>
        </div>
        <div className="flex items-center gap-1 rounded-md bg-top px-[6px] py-1 font-bold text-primary text-sm cursor-pointer mt-[15px] bg-my-dark-blue">
            <GiCrownCoin className="flex self-start text-my-gold" style={{height:"18px", width:"18px"}}/>
            <span className="text-my-gold">{user.coin}</span>
        </div>
        </section>

        <section className="line-clamp-4 px-[50px] pt-3 text-center text-sm">{user.bio}</section>

        <div className="relative flex font-medium mt-[24px] h-[40px] w-full bg-top hover:bg-slate-700">
        <button className="relative flex flex-1 cursor-pointer items-center justify-center transition-all ">
            <span className="relative whitespace-nowrap bg-clip-text  text-my-white ">Information</span>
        </button>
        </div>
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
                                    <div className="bg-black p-4 rounded-lg text-lg">Gain Power Level By:
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
                            <div className="mr-2 h-3 w-3 rounded-full"style={{backgroundColor:"rgb(52, 152, 219)"}}></div>
                            <span 
                                style={{
                                    fontWeight:"bold",
                                    color:`${user.role==="dentist" ?  "#ECC879":
                                        user.role==="store" ?"rgb(52, 152, 219)":
                                        user.role==="lab"? "rgb(255, 255, 255)":
                                        user.role==="admin"? "rgb(99, 99, 99)":
                                        user.role==="moderator"?"#C0C0C0"
                                        :"rgb(201, 142, 215)"
                                    }`
                                }}>
                                {user.role==="dentist" ? "Dentist":
                                user.role==="store" ?"Dental Store":
                                user.role==="lab"? "Dental Lab":
                                user.role==="admin"? "Boss":
                                user.role==="moderator"?"Soldier of Dr.Truth"
                                :"TOP DENTIST"
                                }
                            </span>
                        </div>
                    </div>
            </section>
        </div>
        </div>
    )
    }

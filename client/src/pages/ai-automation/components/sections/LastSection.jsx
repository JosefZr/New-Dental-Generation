import { Link } from "react-router-dom";
import WideLeftShades from "../Shades/WideLeftShades";
import WideRightShades from "../Shades/WideRightShades";
import styled from "styled-components";

const P = styled.p`
    font-size: 28px;
    font-weight: 500;
    line-height: 26px;
    color: hsla(0, 0%, 100%, .7);
    @media screen and (min-width: 1024px) {
        line-height: 28px;
    }
    @media screen and (min-width: 1024px) {
            font-size: 22px;
    }
`
const paragraph =[
    {p:"Marketing 1.2.3"},
    {p:"Free Guide"},
    {p:" Your Dental Network"}
]
export default function LastSection() {
    return (
        <div className="w-full border-b-[1px] border-b-stroke undefined" style={{position:"relative",fontFamily:"'Funnel Display', sans-serif"}}>
            <div className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-stroke" style={{position:"relative"}}>
                <WideRightShades/>
                <div className="border-x-[1px] border-stroke">
                    <div className="lg:p-[60px] p-2 w-full" style={{position:"relative"}}>
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-4 lg:py-0">
                        {paragraph.map((item, index) => (
                                <Link key={index}>
                                    <P className="mt-2 text-center px-4 text-pretty" >
                                        {item.p}    
                                    </P>               
                                </Link>
                            ))}            
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row border-t-[1px] border-t-stroke">
                        <div className="lg:w-1/2 lg:border-r-[1px] lg:border-r-stroke  py-4 lg:py-0">
                            <div className="lg:p-[60px] p-2 w-full " style={{position:"relative"}}>
                                <p className="text-sm text-white/50 text-center lg:text-left">
                                    <strong className="text-white">Dr. Truth Says:</strong> <br />
                                    AI will never replace the warmth of a real conversation.
                                    The human touch? That’s still yours. <br /><br />
                                    But AI *can* take the pressure off your team.
                                    It can handle the repetitive stuff..
                                    ..so you and your staff can focus on what matters most: your patients. <br /><br />

                                    We’re not replacing care. <br />
                                    <strong className="text-white">We’re giving you more time to deliver it.</strong>
                                </p>
                            </div>
                        </div>
                        <div className="lg:w-1/2 border-t-[1px] border-t-stroke lg:border-none">
                            <div className="lg:p-[60px] p-2 w-full " style={{position:"relative"}}>
                                <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row items-center justify-between  py-4 lg:py-0">
                                    <div>
                                    <p className="text-sm text-white/50 text-center lg:text-left mb-4 lg:mb-0">Support</p>
                                    <a href="mailto:suppor@jointherealworld.com" className="flex justify-end pointer-events-auto items-center text-center lg:text-left">mailto:suppor@jointherealworld.com</a>
                                    </div>
                                    <div className="flex justify-end pointer-events-auto items-center">
                                    <div className="border-[4px] border-[#2b334079]">
                                        <div className="border-[2px] border-[#2b3340be]">
                                            <div className="transition-all duration-500 flex w-auto gap-3 py-2 px-3 border-stroke hover:border-[#6a6d6f] border-[1px] hover:bg-[#202326]">
                                                <img src="	https://www.cobratate.com/jointherealworld/login_icon.png" alt="a"  height={20} width={20}/>
                                                <div >LOG IN</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <WideLeftShades/>
            </div>
        </div>
    )
}

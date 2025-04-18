import useReveal from "@/hooks/useReveal";
import WideLeftShades from "../Shades/WideLeftShades";
import WideRightShades from "../Shades/WideRightShades";
import LeftContent2 from "../LeftContent2";
import SmallRightShades from "../Shades/SmallRightShades";
import SmallLeftShades from "../Shades/SmallLeftShades";
import SmallSection2 from "../SmallSection2";

export default function ReverseSection() {
    useReveal('vertical');
    useReveal('horizontal');
    return (
        <div className="reveal-vertical" style={{position:"relative",fontFamily:"'Funnel Display', sans-serif"}}>
        <div className="w-full border-b-[1px] border-b-[#2b3340] hidden lg:block">
            <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340] " style={{position:"relative"}}>
                <WideLeftShades/>
                <div className="border-x-[1px] border-[#2b3340]">
                    <div className="lg:p-[60px] p-2 w-full" style={{position:"relative"}}>
                        <div className="flex flex-row-reverse">
                            <LeftContent2 
                                top="Time’s Running Out" 
                                title="The world’s moving fast, and AI isn’t coming.<br/> It’s already here."
                                p="
                                    Dental clinics are evolving.
                                    Automation is replacing receptionists.
                                    Patients expect instant replies, 24/7 access, and flawless service.
                                    <br/><br/>
                                    If you’re still running your clinic like it’s 2012…<br/>
                                    You’re already behind.
                                "
                                button="BOOK YOUR FREE DEMO"
                                cutted="true"
                            />
                            {/* <RightVideo/> */}
                            <div className="w-1/2 border-l-[1px] border-l-[#2b3340] top-0 left-0 max-h-[100%] overflow-hidden" style={{position:"absolute"}}>
                                <img 
                                    src="https://www.cobratate.com/jointherealworld/section3.png" 
                                    alt="Section Timeout Background" 
                                    style={{color:"transparent"}} 
                                    className="object-cover h-[100%] w-full"
                                    loading="lazy"
                                    width={1334}
                                    height={1642}
                                    decoding="async"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <WideRightShades/>
            </article>
        </div>
            <div className="w-full border-b-[1px] border-b-[#2b3340] lg:hidden">
                <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340]" style={{position:"relative"}}>
                    <SmallLeftShades/>
                    <div className="border-x-[1px] border-[#2b3340]">
                        <div className="lg:hidden pt-12 pb-8" style={{position:"relative"}}>
                            <img 
                                src="https://www.cobratate.com/jointherealworld/section3.png" 
                                alt="carbon fiber bg" 
                                width="1334" 
                                height="1642" 
                                loading="lazy" 
                                className="object-cover h-[100%] w-full top-0 left-0 pointer-events-none z-0 opacity-75"
                                style={{position:"absolute", color:"transparent"}}
                            />
                                <SmallSection2
                                    top="Time’s Running Out" 
                                    title="The world’s moving fast, and AI isn’t coming. It’s already here."
                                    p="
                                        Dental clinics are evolving.
                                        Automation is replacing receptionists.
                                        Patients expect instant replies, 24/7 access, and flawless service.
                                        <br/><br/>
                                        If you’re still running your clinic like it’s 2012…<br/>
                                        You’re already behind.
                                    "
                                    button="BOOK YOUR FREE DEMO"
                                    cutted="true"
                                />
                                </div>
                            </div>
                    <SmallRightShades/>
                </article>
            </div>
        </div>
    )
}

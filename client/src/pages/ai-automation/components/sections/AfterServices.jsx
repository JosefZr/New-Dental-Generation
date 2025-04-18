import LeftContent from "../LeftContent";
import SmallLeftShades from "../Shades/SmallLeftShades";
import WideLeftShades from "../Shades/WideLeftShades";
import WideRightShades from "../Shades/WideRightShades";
import SmallRightShades from "../Shades/SmallRightShades";
import useReveal from "@/hooks/useReveal";
import SmallSection2 from "../SmallSection2";

export default function AfterServices() {
        useReveal('vertical');
    return (
        <div className="reveal-vertical" style={{position:"relative",fontFamily:"'Funnel Display', sans-serif"}}>
                    <div className="w-full border-b-[1px] border-b-[#2b3340] hidden lg:block">
                        <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340] " style={{position:"relative"}}>
                            <WideLeftShades/>
                            <div className="border-x-[1px] border-[#2b3340]">
                                <div className="lg:p-[60px] p-2 w-full" style={{position:"relative"}}>
                                    <div className="flex">
                                        <LeftContent 
                                            top="Think about it" 
                                            title="And the Best Part?"
                                            p="
                                                All of this runs quietly in the background..
                                                ..so you can focus on what actually matters: <strong>treating patients.</strong>
                                                <br/><br/>
                                                While you're drilling, scaling, diagnosing...<br/>
                                                <strong>AI handles </strong> the calls, the chats, the bookings, the follow-ups.
                                            "
                                            button="BOOK YOUR FREE DEMO"
                                        />
                                        <div className="w-1/2 border-l-[1px] border-l-[#2b3340] top-0 right-0 max-h-[100%] overflow-hidden" style={{position:"absolute"}}>
                                            <img 
                                                src="https://www.cobratate.com/jointherealworld/thinkabout.png" 
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
                                src="https://www.cobratate.com/jointherealworld/thinkabout.png" 
                                alt="carbon fiber bg" 
                                width="1334" 
                                height="1642" 
                                loading="lazy" 
                                className="object-cover h-[100%] w-full top-0 left-0 pointer-events-none z-0 opacity-75"
                                style={{position:"absolute", color:"transparent"}}
                            />
                                <SmallSection2
                                        top="Think about it" 
                                        title="And the Best Part?"
                                        p="
                                            All of this runs quietly in the background..
                                            ..so you can focus on what actually matters: <strong>treating patients.</strong>
                                            <br/><br/>
                                            While you're drilling, scaling, diagnosing...<br/>
                                            <strong>AI handles </strong> the calls, the chats, the bookings, the follow-ups.
                                        "
                                        button="BOOK YOUR FREE DEMO"
                                />
                            </div>
                            </div>
                            <SmallRightShades/>
                        </article>
                    </div>
        </div>
    )
}

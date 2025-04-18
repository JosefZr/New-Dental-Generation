import useReveal from "@/hooks/useReveal";
import WideLeftShades from "../Shades/WideLeftShades";
import WideRightShades from "../Shades/WideRightShades";
import LeftContent2 from "../LeftContent2";
import SmallRightShades from "../Shades/SmallRightShades";
import SmallLeftShades from "../Shades/SmallLeftShades";
import SmallSection2 from "../SmallSection2";

export default function Section2() {
    useReveal('vertical');
    useReveal('horizontal');
    return (
        <div className="reveal-vertical" style={{position:"relative",fontFamily:"'Funnel Display', sans-serif"}}>
        <img 
            src="/ai/carbon_bg.webp" 
            alt="carbon fiber bg" 
            width="1736" 
            height="943" 
            loading="lazy" 
            className="max-h-[100%] h-[100%] opacity-5 w-full object-cover top-0 left-0 pointer-events-none"
            style={{position:"absolute"}}
        />
        <div className="w-full border-b-[1px] border-b-[#2b3340] hidden lg:block">
            <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340] " style={{position:"relative"}}>
                <WideLeftShades/>
                <div className="border-x-[1px] border-[#2b3340]">
                    <div className="lg:p-[60px] p-2 w-full" style={{position:"relative"}}>
                        <div className="flex">
                            <LeftContent2 
                                top="Let’s Be Real" 
                                title="Turn Cold Visitors Into Paying Patients"
                                p="You didn’t spend a decade perfecting clinical skills…<br/>…just to lose patients because 'Luna' took a lunch break. <br/><br/>
                                    Appointments missed. Reviews lost. Referrals bleeding out. <br/><br/>
                                    Not because you’re bad at what you do..
                                    ..<Strong>But<strong/> because you’re still running things the old way.
                                "
                                button="BOOK YOUR FREE DEMO"
                                cutted="true"
                            />
                            {/* <RightVideo/> */}
                            <div className="w-1/2 border-l-[1px] border-l-[#2b3340] top-0 right-0 max-h-[100%] overflow-hidden" style={{position:"absolute"}}>
                                <img 
                                    src="https://www.cobratate.com/jointherealworld/section2.png" 
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
                                src="https://www.cobratate.com/jointherealworld/section2.png" 
                                alt="carbon fiber bg" 
                                width="1334" 
                                height="1642" 
                                loading="lazy" 
                                className="object-cover h-[100%] w-full top-0 left-0 pointer-events-none z-0 opacity-75"
                                style={{position:"absolute", color:"transparent"}}
                            />
                                <SmallSection2
                                    top="Let’s Be Real" 
                                    title="Turn Cold Visitors Into Paying Patients"
                                    p="You didn’t spend a decade perfecting clinical skills…<br/>…just to lose patients because 'Luna' took a lunch break. <br/><br/>
                                        Appointments missed. Reviews lost. Referrals bleeding out. <br/><br/>
                                        Not because you’re bad at what you do..
                                        ..<Strong>But<strong/> because you’re still running things the old way.
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

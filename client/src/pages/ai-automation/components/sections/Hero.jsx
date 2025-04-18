import styled from "styled-components";
import "../../index.css"
import LeftContent from "../LeftContent";
import RightVideo from "../RightVideo";
import SmallLeftContent from "../SmallLeftContent";
import WideLeftShades from "../Shades/WideLeftShades";
import WideRightShades from "../Shades/WideRightShades";
import SmallLeftShades from "../Shades/SmallLeftShades";
import SmallRightShades from "../Shades/SmallRightShades";
const Special = styled.h1`
    color: hsla(0, 0%, 100%, .21);
    font-size: 10px;
    line-height: 30px;
    letter-spacing: -3%;
`
export default function Hero() {
    return (
        <div className="" style={{position:"relative",fontFamily:"'Funnel Display', sans-serif"}}>
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
                                <LeftContent 
                                    top="Scale your dental Practice--like never before" 
                                    title="Turn Cold Visitors Into Paying Patients"
                                    p="<strong>I run a clinic too. I know the chaos.</strong>
                                        You’re mid-root canal, phones are ringing, front desk’s overwhelmed.
                                        Leads get missed. Patients wait. Some never call back.
                                        And just like that—<strong>money’s gone.</strong>"
                                    button="BOOK YOUR FREE DEMO"
                                />
                                <RightVideo/>
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
                        <div className=" w-full group min-h-[200px]" style={{position:"relative"}}>
                            <Special className="top-[-48px] left-[calc(50%-42px)]" style={{position:"absolute"}}>in Less Than 48h</Special>
                            <div className=" undefined" style={{position:"relative"}}>
                                <div className=" w-full  undefined" style={{position:"relative"}}>
                                    <div className="max-w-[100%]  undefined" style={{position:"relative"}}>
                                        <div className="w-full  lg:hidden undefined" style={{position:"relative", paddingTop:"56.25%"}}>
                                        <iframe 
                                            src="https://player.vimeo.com/video/1046354505?h=fe92c2a68a&autoplay=1&muted=1&loop=1" 
                                            frameBorder="0"
                                            height={"100%"}
                                            width={"100%"}
                                            style={{
                                                position:"absolute",
                                                inset:"0px",
                                                width:"100%",
                                                height:"100%",
                                            }}
                                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                            allowFullScreen="true"
                                        ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SmallLeftContent
                            top="Scale your dental Practice--like never before" 
                            title="Turn Cold Visitors Into Paying Patients"
                            p="<strong>I run a clinic too. I know the chaos.</strong>
                                You’re mid-root canal, phones are ringing, front desk’s overwhelmed.
                                Leads get missed. Patients wait. Some never call back.
                                And just like that—<strong>money’s gone.</strong>"
                            button="BOOK YOUR FREE DEMO"
                        />
                    </div>
                    <SmallRightShades/>
                </article>
            </div>
        </div>
    )
}

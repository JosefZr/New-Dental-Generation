import useReveal from "@/hooks/useReveal";
import WideLeftShades from "../Shades/WideLeftShades";
import Subtitle from "../Subtitle";
import TexturedText from "../TexturedText";
import styled from "styled-components";
const P = styled.p`
    font-size: 18px;
    font-weight: 500;
    line-height: 26px;
    color: hsla(0, 0%, 100%, .7);
@media screen and (min-width: 1024px) {
        font-size: 22px;
    }
    @media screen and (min-width: 1024px) {
        line-height: 28px;
    }
`
export default function Services() {
    useReveal('vertical');
    useReveal('horizontal');
    return (
        <div className="reveal-vertical" style={{position:"relative",fontFamily:"'Funnel Display', sans-serif"}}>
            <div className="w-full border-b-[1px] border-b-[#2b3340] hidden lg:block">
                <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340] " style={{position:"relative"}}>
                    <WideLeftShades/>
                    <div className="border-x-[1px] border-[#2b3340]">
                        <div className="lg:p-[60px] p-2 w-full" style={{position:"relative"}}>
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex"></div>
                                    <Subtitle top ="That ends today."/>
                                </div>
                                <TexturedText title="Here’s How We Fix It — Fast."/>
                                <P className={`mt-4 max-w-[550px] text-center mx-auto`} dangerouslySetInnerHTML={{ __html: "Every tool below is designed to save time, lock in more patients, and make your clinic run like a machine." }} />
                        </div>
                    </div>
                    <div className="reveal-vertical-left">
                        <div className="lg:p-[60px] p-2 w-full " style={{position:"relative"}}>
                            <div 
                                className=" top-0 left-0 w-[50px] h-[50px] pointer-events-none"
                                style={{position:"absolute",background: "radial-gradient(129.3% 129.3% at 2.03% 8.33%, rgba(255, 255, 255, 0.21) 0%, rgba(24, 27, 38, 0.24) 100%)"}}
                            ></div>
                            <div 
                                className=" top-0 right-0 w-[50px] h-[50px] pointer-events-none"
                                style={{position:"absolute",background: "radial-gradient(129.3% 129.3% at 2.03% 8.33%, rgba(255, 255, 255, 0.21) 0%, rgba(24, 27, 38, 0.24) 100%)"}}
                            ></div>
                            <div 
                                className=" bottom-0 left-0 w-[50px] h-[50px] pointer-events-none"
                                style={{position:"absolute",background: "radial-gradient(129.3% 129.3% at 2.03% 8.33%, rgba(255, 255, 255, 0.21) 0%, rgba(24, 27, 38, 0.24) 100%)"}}
                            ></div>
                            <div 
                                className=" bottom-0 right-0 w-[50px] h-[50px] pointer-events-none"
                                style={{position:"absolute",background: "radial-gradient(129.3% 129.3% at 2.03% 8.33%, rgba(255, 255, 255, 0.21) 0%, rgba(24, 27, 38, 0.24) 100%)"}}
                            ></div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}

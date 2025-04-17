import styled from "styled-components";
import "../index.css"
import { Link } from "react-router-dom";
const HeroHeading = styled.h1`
    margin-top: 2rem;
    background-color: white;
    text-transform: capitalize;
    background-position: 50%;
    background-repeat: repeat;
    -webkit-text-fill-color: transparent;
    background-image: url("/backs/heading-texture_1heading-texture.webp");
    background-clip: text;
    font-size: 80px;
    font-weight: 600;
    line-height: 75px;
    letter-spacing: -.03em;
    @media screen and (max-width: 991px) {
        font-size: 42px;
        line-height: 42px;
        letter-spacing: -.05em;
    }
`;
const Div = styled.div`
    background: linear-gradient(88.87deg, #2356ff -49.96%, #23bdff 75.85%, #fff 99.26%);
    padding: 2px;
    clip-path: polygon(22px 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%, 0 22px);
    width: 100%;
    @media screen and (min-width: 1024px) {
        width: auto;
    }
`
const Button = styled.button`
    position: relative;
    padding: 16px 32px;
    background: linear-gradient(87.1deg, #2356ff 1.37%, #23bdff 85.79%, #fff 101.5%);
    text-align: center;
    color: #fff;
    clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
    font-size: 22px;
    font-weight: 800;
    line-height: 27.5px;
    letter-spacing: -.05em;
    width: 100%;
    @media screen and (min-width: 1024px) {
        min-width: 400px;
        font-size: 28px;
        line-height: 35px;
        padding: 20px 52px;
        width: auto;
    }
`
const Special = styled.h1`
    color: hsla(0, 0%, 100%, .21);
    font-size: 10px;
    line-height: 30px;
    letter-spacing: -3%;
`
const Texture = styled.h1`
    margin-top: 2rem;
    background-color: white;
    text-transform: capitalize;
    background-position: 50%;
    background-repeat: repeat;
    -webkit-text-fill-color: transparent;
    background-image: url("/backs/heading-texture_1heading-texture.webp");
    background-clip: text;
    font-size: 42px;
    font-weight: 600;
    line-height: 42px;
    letter-spacing: -.05em;
`
export default function Hero() {
    return (
        <div className="" style={{position:"relative",fontFamily:"'Funnel Display', sans-serif"}}>
            <img 
                src="https://www.cobratate.com/jointherealworld/carbon_bg.png" 
                alt="carbon fiber bg" 
                width="1736" 
                height="943" 
                loading="lazy" 
                className="max-h-[100%] h-[100%] opacity-5 w-full object-cover top-0 left-0 pointer-events-none"
                style={{position:"absolute"}}
            />
            <div className="w-full border-b-[1px] border-b-[#2b3340] hidden lg:block">
                <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340] " style={{position:"relative"}}>
                    <div style={{position:"absolute"}} className=" top-0 left-0 h-full w-[15px] lg:w-[41px] hash-background"></div>
                    <div style={{position:"absolute"}} className=" bottom-[-10px] left-[-10px] hidden lg:block">
                        <div className="plus-sign"></div>
                    </div>
                    <div style={{position:"absolute"}} className="bottom-[-10px] right-[5px] lg:right-[30px]">
                        <div className="plus-sign"></div>
                    </div>
                    <div className="border-x-[1px] border-[#2b3340]">
                        <div className="lg:p-[60px] p-2 w-full" style={{position:"relative"}}>
                            <div className="flex">
                                <div className="w-1/2 ">
                                    <div className="subtitle-container">
                                        <div className="subtitle">
                                            <div className="subtitle-background">
                                                <h3>
                                                Scale your dental Practice--like never before
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <HeroHeading>
                                        Turn Cold Visitors Into Paying Patients                                     </HeroHeading>
                                    <p className="mt-8">
                                        <strong>I run a clinic too. I know the chaos.</strong>
                                        You’re mid-root canal, phones are ringing, front desk’s overwhelmed.
                                        Leads get missed. Patients wait. Some never call back.
                                        And just like that—<strong>money’s gone.</strong>
                                    </p>
                                    <div className="flex mt-8">
                                        <Link>
                                            <Div className="hover:scale-105 duration-300 transition-all">
                                                <Button className="hover:scale-105 duration-300 transition-all">BOOK YOUR FREE DEMO</Button>
                                            </Div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="w-1/2 pl-[60px]">
                                    <figure className=" w-full h-[100%] group" style={{position:"relative"}}>
                                        <Special className="top-[-48px] left-[calc(50%-42px)]" style={{position:"absolute"}}>in Less Than 48h</Special>
                                        <div className="h-[100%]" style={{position:"relative"}}>
                                            <div className=" w-full  h-[100%]" style={{position:"relative"}}>
                                                <div style={{position:"relative"}} className="max-w-[100%] h-[100%]">
                                                    <div className="w-full h-full hidden lg:block" style={{position:"relative", paddingTop:"56.338%"}}>
                                                        <iframe 
                                                            src="https://player.vimeo.com/video/1046354505?h=fe92c2a68a&autoplay=1&muted=1&loop=1" 
                                                            frameBorder="0"
                                                            height={"100%"}
                                                            width={"100%"}
                                                            style={{
                                                                position:"absolute",
                                                                top:0,
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
                                        <img 
                                            src="https://www.cobratate.com/jointherealworld/hero_frame.png" 
                                            alt="Hero Overlay" 
                                            loading="lazy" 
                                            width={583} 
                                            height={723} 
                                            decoding="async"  
                                            style={{position:"absolute", color:"transparent"}}
                                            className="top-[-20px] left-[-20px] pointer-events-none max-w-none w-[calc(100%+40px)] h-[calc(100%+40px)]"
                                        />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" top-0 right-0 h-full w-[15px] lg:w-[41px] hash-background" style={{position:"absolute"}}></div>
                </article>
            </div>

            <div className="w-full border-b-[1px] border-b-[#2b3340] lg:hidden">
                <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340]" style={{position:"relative"}}>
                    <div className=" top-0 left-0 h-full w-[15px] lg:w-[41px] hash-background" style={{position:"absolute"}}></div>
                    <div className=" bottom-[-10px] left-[-10px] hidden lg:block" style={{position:"absolute"}}>
                        <div className="plus-sign"></div>
                    </div>
                    <div className=" bottom-[-10px] left-[4px] lg:left-[30px]" style={{position:"absolute"}}>
                        <div className="plus-sign"></div>
                    </div>
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
                        <Texture className="mt-2 capitalize text-center">Master the strategies of wealth creation </Texture>
                        <p className="mt-2 text-center px-4 text-pretty">
                            <strong>I run a clinic too. I know the chaos.</strong>
                            You’re mid-root canal, phones are ringing, front desk’s overwhelmed.
                            Leads get missed. Patients wait. Some never call back.
                            And just like that—<strong>money’s gone.</strong>
                        </p>
                        <div className="flex mt-4 justify-center">
                            <Link>
                                <Div className="hover:scale-105 duration-300 transition-all">
                                    <Button className="hover:scale-105 duration-300 transition-all">BOOK YOUR FREE DEMO</Button>
                                </Div>
                            </Link>
                        </div>
                    </div>
                    <div className="bottom-[-10px] right-[5px] lg:right-[30px]" style={{position:"absolute"}}>
                        <div className="plus-sign"></div>
                    </div>
                    <div className=" bottom-[-10px] right-[-11px] hidden lg:block" style={{position:"absolute"}}>
                        <div className="plus-sign"></div>
                    </div>
                    <div className="top-0 right-0 h-full w-[15px] lg:w-[41px] hash-background" style={{position:"absolute"}}></div>
                </article>
            </div>
        </div>
    )
}

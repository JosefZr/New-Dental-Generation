import styled from "styled-components";
import WideLeftShades from "../Shades/WideLeftShades";
import { MdOutlineDone } from "react-icons/md";
import { Link } from "react-router-dom";
import WideRightShades from "../Shades/WideRightShades";
import SmallLeftShades from "../Shades/SmallLeftShades";
import SmallRightShades from "../Shades/SmallRightShades";

const Texture = styled.h1`
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
const P1 = styled.p`
    font-size: 18px;
    font-weight: 500;
    line-height: 26px;
    color: white;
    @media screen and (min-width: 1024px) {
        font-size: 22px;
    }
    @media screen and (min-width: 1024px) {
        line-height: 28px;
    }
`
const Div = styled.div`
    background: linear-gradient(88.87deg, var(--from) -49.96%, var(--to) 99.26%);
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
    background: linear-gradient(87.1deg, var(--from) 1.37%,  var(--to) 101.5%);
    text-align: center;
    color: black;
    clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
    font-size: 22px;
    font-weight: 800;
    line-height: 27.5px;
    letter-spacing: -.05em;
    width: 100%;
    @media screen and (min-width: 1024px) {
        min-width: 450px;
        font-size: 28px;
        line-height: 35px;
        padding: 20px 52px;
        width: auto;
    }
`
export default function Prices() {
    return (
        <div className="reveal-vertical" style={{position:"relative",fontFamily:"'Funnel Display', sans-serif"}}>
            <div className="w-full border-b-[1px] border-b-[#2b3340] hidden lg:block">
                <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340]" style={{position:"relative"}}>
                    <WideLeftShades/>
                    {/* <div className="border-x-[1px] border-[#2b3340]">
                        <div className="lg:p-[60px] p-2 w-full" style={{position:"relative"}}> 
                            <Top top="It's Now Or Never..."/>
                            <TexturedText title="You Only Have 2 Choices"/>
                        </div>
                    </div> */}
                    <div className="flex border-t-[1px] border-t-[#2b3340]">
                        <div className="w-1/2 border-r-[1px] border-r-[#2b3340]">
                            <div className="lg:p-[60px] p-2 w-full "style={{position:"relative"}}>
                                <div className="flex justify-center items-center flex-col">
                                    <Texture className="my-2 capitalize text-center">Why It Matters:</Texture>                                    
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2">
                        <div className="lg:p-[60px] p-2 w-full "style={{position:"relative"}}>
                                <div className="flex justify-center items-center flex-col">
                                    <Texture className="mt-2 capitalize text-center max-w-[70%]">Is This You?</Texture>   
                                    <P className="mt-2 text-center px-4 text-pretty">
                                    If you&apos;re a dentist who wants to:
                                    </P>                                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 border-r-[1px] border-r-[#2b3340]">
                            <div className="p-[30px] w-full relative undefined">
                                <div className="flex justify-center">
                                    <div className="flex flex-col justify-center gap-4">
                                        <div className="flex gap-4 items-center">
                                            <MdOutlineDone height="1rem" width="1rem"/>
                                            <P >No more missed calls</P>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <MdOutlineDone height="1rem" width="1rem"/>
                                            <P >No more calendar chaos</P>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <MdOutlineDone height="1rem" width="1rem"/>
                                            <P >More booked patients, less busywork</P>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2">
                        <div className="p-[30px] w-full relative undefined">
                                <div className="flex justify-center">
                                    <div className="flex flex-col justify-center gap-4">
                                        <div className="flex gap-4 items-center">
                                            <MdOutlineDone height="1rem" width="1rem"/>
                                            <P1 >Stop losing patients when you&apos;re not available</P1>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <MdOutlineDone height="1rem" width="1rem"/>
                                            <P1 >Automate the boring admin crap</P1>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <MdOutlineDone height="1rem" width="1rem"/>
                                            <P1 >Run a modern, sharp, professional clinic that *actually* feels ahead of the curve...</P1>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-t-[1px] border-t-[#2b3340]">
                        <div className="lg:p-[60px] p-2 w-full " style={{position:"relative"}}>
                            <div className="flex justify-center mt-2">
                                <Link>
                                    <Div className="hover:scale-105 duration-300 transition-all">
                                        <Button className="hover:scale-105 duration-300 transition-all">We should talk</Button>
                                    </Div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <WideRightShades/>
                </article>
            </div>
            <div className="w-full border-b-[1px] border-b-[#2b3340] lg:hidden">
                <div className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340]">
                    <SmallLeftShades />
                    <div className="border-x-[1px] border-[#2b3340]">
                        <div className="border-t-[1px] border-t-[#2b3340]">
                            <div className="border-b-[1px] border-b-[#2b3340] pb-2 py-4">
                                <div className="lg:p-[60px] p-2 w-full " style={{position:"relative"}}>
                                    <div className="flex justify-center items-center">
                                        <div className="flex justify-center items-center flex-col">
                                            <Texture className="mb-3 capitalize text-center">Why It Matters:</Texture>  
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:p-[60px] p-2 w-full border-t-[1px] border-t-[#2b3340]" style={{position:"relative"}}>
                                <div className="flex justify-center">
                                    <div className="flex flex-col justify-center gap-4 my-4">
                                            <div className="flex gap-4 items-center">
                                                <MdOutlineDone height="1rem" width="1rem"/>
                                                <P >No more missed calls</P>
                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <MdOutlineDone height="1rem" width="1rem"/>
                                                <P >No more calendar chaos</P>
                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <MdOutlineDone height="1rem" width="1rem"/>
                                                <P >More booked patients, less busywork</P>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="border-b-[1px] border-b-[#2b3340] pb-2 ">
                                <div className="lg:p-[60px] p-2 w-full " style={{position:"relative"}}>
                                    <div className="flex justify-center items-center">
                                        <div className="flex justify-center items-center flex-col">
                                            <Texture className=" capitalize text-center">Is This You?</Texture>  
                                            <P className="text-center px-4 text-pretty">
                                            If you&apos;re a dentist who wants to:
                                            </P>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:p-[60px] p-2 w-full border-t-[1px] border-t-[#2b3340]" style={{position:"relative"}}>
                                <div className="flex justify-center w-[50%] mx-auto">
                                    <div className="flex flex-col justify-center gap-4 my-5">
                                        <div className="flex gap-4 items-center">
                                            <MdOutlineDone height="1rem" width="1rem"/>
                                            <P1 >Stop losing patients when you&apos;re not available</P1>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <MdOutlineDone height="1rem" width="1rem"/>
                                            <P1 >Automate the boring admin crap</P1>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <MdOutlineDone height="1rem" width="1rem"/>
                                            <P1 >Run a modern, sharp, professional clinic that *actually* feels ahead of the curve...</P1>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="flex border-t-[1px] border-t-[#2b3340]">
                                <div className="lg:p-[60px] p-2 w-full " style={{position:"relative"}}>
                                    <div className="flex justify-center">
                                        <Link>
                                            <Div className="hover:scale-105 duration-300 transition-all">
                                                <Button className="hover:scale-105 duration-300 transition-all">We should talk</Button>
                                            </Div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SmallRightShades />
                </div>
            </div>
        </div>
    )
}

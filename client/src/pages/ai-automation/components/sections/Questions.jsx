import styled from "styled-components";
import WideLeftShades from "../Shades/WideLeftShades";
import WideRightShades from "../Shades/WideRightShades";
import SmallLeftContent from "../SmallLeftContent";
import Subtitle from "../Subtitle";
import { Link } from "react-router-dom";
const Special = styled.h1`
    color: hsla(0, 0%, 100%, .21);
    font-size: 15px;
    line-height: 30px;
    letter-spacing: -3%;
`
const HeroHeading = styled.h1`
    margin-top: 2rem;
    background-color: white;
    text-transform: capitalize;
    background-position: 50%;
    background-repeat: repeat;
    -webkit-text-fill-color: transparent;
    background-image: url("/backs/heading-texture_1heading-texture.webp");
    background-clip: text;
    font-size: 55px;
    font-weight: 700;
    letter-spacing: -.03em;
    line-height: 50px;
    text-align: center;
    @media screen and (max-width: 991px) {
        font-size: 30px;
        line-height: 34px;
    }
`;
const P = styled.p`
    font-size: 18px;
    font-weight: 500;
    line-height: 26px;
    color: hsla(0, 0%, 100%, .7);
    strong {
        color: #fff;
        font-weight: 600;
    }
@media screen and (min-width: 1024px) {
        font-size: 20px;
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
        min-width: 400px;
        font-size: 28px;
        line-height: 35px;
        padding: 20px 52px;
        width: auto;
    }
`
export default function Questions() {
  return (
    <div  style={{position:"relative",fontFamily:"'Funnel Display', sans-serif"}}>
        <div className="w-full border-b-[1px] border-b-[#2b3340] block">
            <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340] " style={{position:"relative"}}>
                <WideLeftShades/>
                <div className="border-x-[1px] border-[#2b3340]">
                    <div className="lg:p-[30px] p-2 w-full" style={{position:"relative"}}>
                        <div className="mt-5">
                                <div className="flex flex-col items-center justify-center">
                                    <Subtitle top="Let’s Get You Set Up" />
                                </div>
                                <HeroHeading >
                                    Let’s Automate Your Clinic
                                </HeroHeading>   
                                    <P className="mt-4 max-w-[550px] text-center mx-auto" >
                                        Takes 2 minutes.<br/>
                                            No contracts. No tech headaches. No BS.
                                            <br/><br/>
                                        <strong>Just a smart systems that turns clicks into patients—on autopilot.</strong>
                                    </P>
                                <div className="flex mt-8 justify-center ">
                                    <Link>
                                        <Div className="hover:scale-105 duration-300 transition-all">
                                            <Button className="hover:scale-105 duration-300 transition-all">BOOK YOUR FREE DEMO</Button>
                                    </Div>
                                </Link>
                                </div>
                            <Special className="text-center ">and see it in action.
                            No pressure. Just proof.</Special>
                        </div>
                    </div>
                </div>
                <WideRightShades/>
            </article>
        </div>
            </div>
  )
}

import {  CtaButton } from "@/components";

import { Cadre } from "@/components";
import { size } from "@/lib/mediaQuerys";
import CtaHeaders from "@/pages/landing/path/components/CtaHeaders";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa6";
import styled from "styled-components";

export const GetChecks = (actor) => {
    const { t } = useTranslation();
  
    const transformDescriptionToTable = (description) => {
      return description
        .split('.')
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    };
  
    return transformDescriptionToTable(t(`${actor}.plans.free.checks`));
  };

const SectionPath = styled.section`
    position: relative;
    background-image: url("/backs/path.svg");
    background-repeat: repeat;
    background-size: cover;
    background-position: center;
    -webkit-mask-image: url("/backs/path.svg");
    -webkit-mask-size: cover;
    -webkit-mask-repeat: no-repeat;
    mask-image: url("/backs/path.svg");
    background-color: rgba(0, 0, 0, 0.5); /* Overlay color */
background-blend-mode: overlay;
    `
    const Container = styled.div`
    z-index: 2;
    width: 100%;
    max-width: 80rem;
    margin: 0 auto;
    position: relative;
    `
    const PathContent = styled.div`
    text-align: center;
    flex-direction: column;
    align-items: center;
    display: flex;
    `
    const LinePoint = styled.div`
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50.6vw;
        max-width: 46rem;
        display: flex;
    `
    const PathLine = styled.div`
        display: none;
        @media screen and (max-width:${size.tablet}){
            background-color: #119b4125;
            width: 1px;
            height: 1.25rem;
            display: block;
            position: absolute;
            inset: 0% auto auto 50%;
            transform: translate(-1px, -100%);
        }
    `
    const PathLine2 = styled.div`
    display: none;
    @media screen and (max-width:${size.tablet}){
        background-color: #ffffff26;
        width: 50%;
        height: 1px;
        display: block;
        position: absolute;
        inset: -1px auto auto -1px;
    }
    `
    const PathLineEmbed = styled.div`
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: .9375rem;
        height: 23.5rem;
        display: none;
        @media screen and (max-width: 767px) {
            display: block;
            position: absolute;
            inset: 0% auto auto 0%;
            transform: translate(-50%);
        }
    `
    const LineChoice = styled.div`
    z-index: 2;
    justify-content: space-around;
    flex-direction: row-reverse;
    align-items: flex-start;
    width: 100%;
    display: flex;
    @media screen and (max-width: ${size.laptop}){
        align-items: flex-start;
    }
    @media screen and (max-width: ${size.laptop}){
        grid-column-gap: 2rem;
        grid-row-gap: 2rem;
        flex-direction: column;
        align-items: center;
        margin-top: 1.5rem;
        position: relative;
    }
    `
    const PathItem = styled.div`
    z-index: 20;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    flex-direction: column;
    align-items: center;
    width: 26rem;
    display: flex;
    position: relative;
    @media screen and (max-width: ${size.laptop}){
        justify-content: space-between;
    }
    @media screen and (max-width: ${size.tablet}){
        width: 100%;
        max-width: none;
        height: auto;
        margin-top: -1rem;
    }
    `
    const IconPoint = styled.div`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: .8rem;
    height: auto;
    display: flex;
    @media screen and (max-width: ${size.tablet}){
        display: none;
        position: absolute;
        inset: 0% auto auto 0%;
    }
    `
    const GlowLine = styled.div`
    z-index: 0;
    background-image: radial-gradient(circle closest-corner at 50% 50%, var(--black) 70%, #050815);
    opacity: 1;
    filter: blur(8px);
    border-radius: 50vw;
    width: 3rem;
    height: 3rem;
    position: absolute;
    inset: 0% auto auto 0%;
    transform: translate(-50%, -50%);
    @media screen and (max-width: ${size.laptop}){
        opacity: 1;
        filter: blur(14px);
    }
    @media screen and (max-width: ${size.tablet}){
        display: none;
    }
    `
    const TitleUppercase = styled.div`
    letter-spacing: 3px;
    text-transform: uppercase;
    font-size: .8rem;
    font-weight: 200;
    line-height: 1;
    display: inline-block;
    @media screen and (max-width:${size.laptop}){
        font-size: .9rem;
    }
`
const CtaChecks = styled.div`
  grid-column-gap: .8rem;
  grid-row-gap: .8rem;
  flex-direction: column;
  align-items: center;
  display: flex;
` 
    // eslint-disable-next-line react/prop-types
    export default function PathStore({actor}) {
        const {t} = useTranslation();
        const checks = GetChecks(actor)
    return (
        <SectionPath>
            <div className="padding-global">
            <Container className="container-large">
                <div className="padding-section-medium">
                <PathContent>
                    <CtaHeaders actor={actor}/>
                    <Cadre actor={actor}/>
                    <LinePoint>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 596 31" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                        <path opacity="0.25" d="M0 30.5H596" stroke="var(--white)"></path>
                        <line x1="298.5" x2="298.5" y2="30" stroke="url(#paint0_linear_857_903)"></line>
                        <defs>
                        <linearGradient id="paint0_linear_857_903" x1="297" y1="30" x2="297" y2="0" gradientUnits="userSpaceOnUse">
                            <stop stopColor="var(--white)" stopOpacity="0.25"></stop>
                            <stop offset="1" stopColor="var(--white)" stopOpacity="0"></stop>
                        </linearGradient>
                        </defs>
                    </svg>
                    </LinePoint>

                    <LineChoice>
                    <PathItem>
                        <div className=" relative overflow-visible mt-10">
                            <div className="w-layout-vflex pay_wrap">
                                <TitleUppercase>
                                    {t(`${actor}.plans.free.title`)}
                                </TitleUppercase>
                                <div className="text-2xl font-semibold ">
                                    {t(`${actor}.plans.free.title2`)}
                                </div>
                                <p className="text-my-white-gray mb-0 leading-7">{t(`${actor}.plans.free.after`)}</p>
                                <br />
                                {/* <PathLine/>
                                <PathLine2/>
                                <PathLineEmbed>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 15 376" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                                    <circle opacity="0.25" cx="7.5" cy="52.5" r="7" stroke="white"></circle>
                                    <circle opacity="0.25" cx="7.5" cy="52.5" r="2.5" fill="white"></circle>
                                    <circle cx="7.5" cy="368.5" r="7" stroke="#AD8B3A"></circle>
                                    <circle cx="7.5" cy="368.5" r="2.5" fill="#D0B167"></circle>
                                    <path opacity="0.25" d="M7.49997 60L7.5 361" stroke="white"></path>
                                    <path d="M7.49997 60L7.5 361" stroke="url(#paint0_linear_922_452)"></path>
                                    <path opacity="0.25" d="M7.5 0L7.5 45" stroke="white"></path>
                                    <defs>
                                        <linearGradient id="paint0_linear_922_452" x1="4.55826" y1="317.353" x2="4.55827" y2="165.882" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#AD8B3A"></stop>
                                        <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                                        </linearGradient>
                                    </defs>
                                    </svg>
                                </PathLineEmbed> */}
                                <CtaChecks >
                                    {checks.map((check, index) => (
                                    <div key={index} className="w-layout-hflex hflex-center-8 text-xl text-my-white-gray">
                                        <FaCheck className=" h-5 w-7 "/>
                                        <h3>{check}</h3>
                                    </div>
                                    ))}
                                </CtaChecks >
                                <br />
                                <CtaButton/>
                            </div>
                        <GlowLine/>
                        </div>
                        {/* <CtaStore actor={actor} /> */}
                    </PathItem>
                    </LineChoice>
                </PathContent>
                </div>
            </Container>
            </div>
        </SectionPath>
    )
}

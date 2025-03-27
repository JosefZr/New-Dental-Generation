import styled from "styled-components"
import "../../../styles/fonts.css"
import { useTranslation } from "react-i18next"
import { LiaUniversitySolid } from "react-icons/lia"
import { SiLeaderprice, SiSimplelogin } from "react-icons/si"
import { FaMoneyBillTrendUp, FaRegChessKnight, FaRegChessQueen, FaRegHandshake, FaUsers } from "react-icons/fa6"
import { GiTakeMyMoney } from "react-icons/gi"
import ReactMarkdown from 'react-markdown';
import { size } from "@/lib/mediaQuerys"
import { CtaButton } from "@/components"
import useReveal from "@/hooks/useReveal"

const H3 = styled.h3`
  font-size: 12px;
  font-weight: 200;
  line-height: 12px;
  letter-spacing: .32em;
  color: #a7a297;
  margin: 0 auto;
  font-family: 'Doawnloawd', sans-serif;
  @media screen and (min-width: 1024px) {
    font-size: 16px;
    line-height: 16px;
  }
`
const H2 = styled.h2`
    background-color: #fff;
    background-image: url(https://www.jointherealworld.com/text_texture.webp);
    background-position: 50%;
    /* background: -webkit-linear-gradient(0deg, #fff, hsla(0, 0%, 100%, .61) 70%, hsla(0, 0%, 61%, .6)); */
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
@media screen and (min-width: 1024px) {
    font-size: 55.5px;
    font-weight: 600;
    line-height: 56px;
}
`
const SmallGlow = styled.div`
    background: radial-gradient(42.52% 42.52% at 50% 26.25%, rgba(255, 207, 35, .15) 0, transparent 100%);
    opacity: .5;
    width: 400px;
    height: 400px;
    position: absolute;
    top: 0;
    z-index: 0;
    left: calc(50% - 200px);
    pointer-events: none;
`
const Description = styled.div`
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
    background-color: #ffffff12;
    color: #ffffffbd;
    font-family: var(--font-sf);
    border-radius: 100px;
    padding: 8px 22px;
    gap: 8px;
    font-family: 'Doawnloawd', sans-serif;
    @media screen and (min-width: 1024px) {
        font-size: 1.2rem;
        padding: 12px 30px;
}
`
const Title= styled.div`
font-size: 22px;
    font-weight: 600;
    line-height: 23px;
    margin: 20px 0 16px;
    color: #fff;
    font-family: 'cg', sans-serif;
    @media screen and (min-width: 1024px) {
        font-size: 32px;
        line-height: 33px;
    }
`
const TimelineLeft = styled.div`
display: flex;
    border-radius: 7px;
    justify-content: center;
    height: 45rem;
    width: 100%;
    z-index: 19;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    background-attachment: local;
    flex-direction: row;
  background-image: ${({ bg }) => `url(${bg})`};

  @media screen and (max-width: ${size.laptop}){
    transform: translate(0);
    height: 35rem;

  }
  @media screen and (max-width: ${size.tablet}){

    display: none;
    width: 100%;
    min-width: 100%;
    min-height: 18rem;
  }
`
export const GetTimelineData = (actor) => {
    const { t } = useTranslation();
  
    const transformDescriptionToTable = (description) => {
      return description
        .split('.')
        .map(item => item.trim())
        .filter(item => item.length > 0);
    };
  
    if(actor === "store" || actor === "lab") {
      return [
        {
          logo: <LiaUniversitySolid className="h-10 w-12" />,
          left: "/store/4.svg",
          title: t(`${actor}.services.content.access.title`),
          descriptions: transformDescriptionToTable(t(`${actor}.services.content.access.description`)),
        },
        {
          logo: <SiSimplelogin className="h-10 w-12" />,
          left: "/store/3.svg",
          title: t(`${actor}.services.content.simplified.title`),
          descriptions: transformDescriptionToTable(t(`${actor}.services.content.simplified.description`)),
        },
        {
          logo: <SiLeaderprice className="h-10 w-12" />,
          left: "/store/1.svg",
          title: t(`${actor}.services.content.competitive.title`),
          descriptions: transformDescriptionToTable(t(`${actor}.services.content.competitive.description`)),
        },
        {
          logo: <FaRegHandshake className="h-10 w-12" />,
          left: "/store/5.svg",
          title: t(`${actor}.services.content.trust.title`),
          descriptions: transformDescriptionToTable(t(`${actor}.services.content.trust.description`)),
        },
      ];
    } else {
      return [
        {
          logo: <FaRegChessQueen className="h-10 w-12" />,
          left: "/images/5.svg",
          title: t(`${actor}.services.content.opportunity.title`),
          descriptions: transformDescriptionToTable(t(`${actor}.services.content.opportunity.description`)),
        },
        {
          logo: <FaMoneyBillTrendUp className="h-10 w-12" />,
          left: "/images/6.svg",
          title: t(`${actor}.services.content.growth.title`),
          descriptions: transformDescriptionToTable(t(`${actor}.services.content.growth.description`)),
        },
        {
          logo: <GiTakeMyMoney className="h-10 w-12" />,
          left: "/images/3.svg",
          title: t(`${actor}.services.content.finance.title`),
          descriptions: transformDescriptionToTable(t(`${actor}.services.content.finance.description`)),
        },
        {
          logo: <FaRegChessKnight className="h-10 w-12" />,
          left: "/images/2.svg",
          title: t(`${actor}.services.content.plan.title`),
          descriptions: transformDescriptionToTable(t(`${actor}.services.content.plan.description`)),
        },
        {
          logo: <FaUsers className="h-10 w-12" />,
          left: "/images/1.svg",
          title: t(`${actor}.services.content.private.title`),
          descriptions: transformDescriptionToTable(t(`${actor}.services.content.private.description`)),
        },
        {
          logo: <LiaUniversitySolid className="h-10 w-12" />,
          left: "/images/4.svg",
          title: t(`${actor}.services.content.courses.title`),
          descriptions: transformDescriptionToTable(t(`${actor}.services.content.courses.description`)),
        },
      ];
    }
  };
  

export default function Exclusive({actor}) {
  useReveal('vertical');
  useReveal('horizontal');
    const timeline =GetTimelineData(actor)
  return (
    <section className="w-full relative  lg:mt-0 mb-[80px] lg:mb-[126px] z-20 ">
        <div className="z-10  px-4" style={{position:"relative"}}>
            <H3 className="uppercase text-center text-[16px] mb-2 hidden lg:block reveal-vertical">EXCLUSIVE FEATURES</H3>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-4">
                <img alt="Exclusive Features" loading="lazy" width="40" height="52" decoding="async" data-nimg="1" className="h-[30px] lg:h-[52px]" src="https://www.jointherealworld.com/exclusive_lock.svg" style={{color: "transparent"}}/>
                <H3 className="uppercase text-center my-2 lg:hidden">EXCLUSIVE FEATURES</H3>
                <H2 className="uppercase text-center gradient-text texture-text max-w-[280px] lg:max-w-[740px] mx-auto lg:mx-0">YOU WILL GET ACCESS TO</H2>
            </div>
            <>
            {timeline.map((data,index)=>(
                <div key={index} className="max-w-[1170px] mx-auto flex flex-col justify-evenly  gap-4 mt-6 reveal-vertical">
                <div className="access border-[4px] py-4 px-2 lg:p-0 border-[rgba(255,255,255,.04)] hover:border-[#ffffff4d] hover:bg-[#d9d9d90f] bg-[#d9d9d908] flex relative flex-col lg:flex-row items-start justify-start group transition-all duration-500" >
                    <figure className=" my-[-50px]" style={{position:"relative"}}>
                        <SmallGlow className=" !top-[30px] lg:!top-[50px] pointer-events-none"></SmallGlow>
                        <div className="min-h-80 max-h-[450px] max-lg:max-h-[370px] relative">
                        <img alt="STEP-BY-STEP LEARNING" loading="lazy" width="571" height="345" decoding="async" data-nimg="1" className=" z-10 mt-4 lg:mt-0 p-8" src={data.left} style={{color:"transparent",position:"relative"}}/>
                        </div>
                    </figure>
                    <div className="flex flex-col gap-2 py-4 lg:py-8 lg:pl-8 lg:pr-10">
                        <Title className="title pl-4 lg:pl-0">{data.title}</Title>
                        {data.descriptions.map((des, i)=>(
                            <Description key={i} className="description group-hover:bg-[#ffffff29] transition-all duration-500">
                                <img alt="Checkmark" loading="lazy" width="32" height="32" decoding="async" data-nimg="1" className="pr-2" src="https://www.jointherealworld.com/check.svg" style={{color:"transparent"}}/>
                                <span ><ReactMarkdown>{des+"."}</ReactMarkdown></span>
                            </Description>
                        ))
                        }
                    </div>
                </div>
            </div>
            )) 
            }
            </>
        </div>
            <div className="pt-10">
            <CtaButton className="mt-10" content="Our_Dentists_Are_Winning!"/>
            </div>
    </section>
  )
}

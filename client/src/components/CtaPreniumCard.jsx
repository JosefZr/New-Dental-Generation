import { CtaButton } from "@/components";
import styled from "styled-components"
import { FaCheck } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaRegWindowClose } from "react-icons/fa";
import { size } from "@/lib/mediaQuerys";
import { useTranslation } from "react-i18next";
import { GiLaurelCrown } from "react-icons/gi";
import "../pages/landing/exclusive/index.css"
export const GetChecks = (actor) => {
  const { t } = useTranslation();

  const transformDescriptionToTable = (description) => {
    return description
      .split('.')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  return transformDescriptionToTable(t(`${actor}.plans.paid.checks`));
};

const Cta = styled.div`
    width: 100%;
    max-width: 512px;
    background: url(https://www.jointherealworld.com/card1.png);
    background-position: 50%;
    padding: 31px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    @media screen and (min-width: 1024px) {
        min-height: 856px;
    }
    
    &:last-child {
      background-image: url(https://www.jointherealworld.com/card2.png);
    }
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(255, 187, 56, 0.15);
    }
    
    &:hover .glow-effect {
      opacity: 0.3;
    }
`
const IconImbedCustom = styled.div`
  flex-direction: column;
  margin: 0 auto;
  width: 4rem;
  height: 3.125rem;
  display: flex;
`
const SVGPrice = styled.div`
  flex-direction: row;
  -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  background-image: linear-gradient(126deg, #ffcf23, #ff8d3a);
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: .3rem;
  height: 1.25rem;
  display: flex;
  
  font-family: 'Doawnloawd', sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
    color: #fff;
    padding: 0 32px;
@media screen and (min-width: 1024px) {
        font-size: 18px;
        line-height: 22px;
    }
`
const H2 = styled.h2`
    font-weight: 700;
    line-height: 1;
    font-size: 35px;
    line-height: 32px;
    margin-top: 19px;
    background: -webkit-linear-gradient(0deg, #fff, hsla(0, 0%, 100%, .61) 70%, hsla(0, 0%, 61%, .6));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`
const PriceBad = styled.div`
    font-family: 'Doawnloawd', sans-serif;
    line-height: 64px;
    letter-spacing: -.05em;
    font-size: 32px;
    font-weight: 400;
    color: #ffffff47;
`
const Price =styled.div `
    font-family: 'cg', sans-serif;
    line-height: 64px;
    letter-spacing: -.05em;
    background-image: linear-gradient(126deg, #ff7e7e, var(--redClaire));
    font-size: 41px;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    font-weight: 500;
    color: #8d8f92;
`
const Description= styled.div`
    font-family: 'Doawnloawd', sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
    color: #fff;
    padding: 0 32px;
@media screen and (min-width: 1024px) {
        font-size: 18px;
        line-height: 22px;
    }
`
const Small = styled.div`
    font-family: 'Doawnloawd', sans-serif;
    font-size: 16px;
    font-weight: 200;
    line-height: 14px;
    color: hsla(0, 0%, 100%, .5);

`
// eslint-disable-next-line react/prop-types
export default function CtaPreniumCard({actor}) {
  const {t} = useTranslation();
  const checks = GetChecks(actor)
  return (
    <Cta>
      <div className="flex group flex-col items-center w-full">
        <IconImbedCustom>
          <GiLaurelCrown className=" h-14 w-auto text-my-gold"/>
        </IconImbedCustom>
        <H2 className="text-center ">ZIRCONIUM PLAN</H2>
        <div className="w-[240px] mx-auto h-[1px] bg-[#383531] mt-8"></div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <PriceBad className="price-bad line-through">€59</PriceBad>
          <Price className="price gradient-text-2">€19.9</Price>
        </div>
        <div>
        {checks.map((check, index) => (
          <div key={index} className="flex items-center mt-6">
            <FaCheck className=" h-5 w-7 text-white"/>
            <Description>{check}</Description>
        </div>
        ))}
        <div className="w-full h-[1px] bg-[#383531] my-8"></div>
        </div>
        <div style={{filter:"blur(100px)"}} className="opacity-0 group-hover:opacity-30 bg-[#ffbb38] h-48 w-full pointer-events-none rounded-xl absolute bottom-0 left-0 duration-500 transition-all"></div>
        <Description className="flex items-center description gap-4 mt-4">
            <FaRegWindowClose className=" self-center"/>
            <h3>{t(`${actor}.plans.paid.cta`)}</h3>
        </Description>
        <SVGPrice className=" flex items-center justify-center gap-4 mt-4 ">
          <img alt="Checkmark" loading="lazy" width="16" height="20" decoding="async" data-nimg="1" className="w-[22px] h-[18px] lg:w-[16px] lg:h-[20px]" src="https://www.jointherealworld.com/lock.svg" style={{color:"transparent"}}/>
            <h3 className="text-nowrap ">{t(`${actor}.plans.paid.cta2`)}</h3>
        </SVGPrice>
        <Description className="flex items-center  gap-4 mt-4">
          <Small>Lock in your price before it increases </Small>
        </Description>
      </div>
        <div className=" w-fit lg:max-w-[36rem] mt-10">
        <CtaButton isSmall={true}/>
        </div>
    </Cta>
  )
}

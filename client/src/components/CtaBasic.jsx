/* eslint-disable react/prop-types */
import { EmployeeBtn } from "@/components";
import styled from "styled-components"
import { FaCheck } from "react-icons/fa6";
import { size } from "@/lib/mediaQuerys";
import { useTranslation } from "react-i18next";
import { GiLaurels } from "react-icons/gi";
import "../pages/landing/exclusive/index.css"
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

const Cta = styled.div`
   width: 100%;
    max-width: 512px;
    background: url(https://www.jointherealworld.com/card1.png);
    background-position: 50%;
    padding: 31px;
    display: flex
;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    @media screen and (min-width: 1024px) {
        min-height: 856px;
    }
    /* @media screen and (max-width:${size.tablet}){
      grid-column-gap: 2rem;
      grid-row-gap: 2rem;
      background-image: none;
      background-repeat: repeat;
      background-size: auto;
      border-radius: 4px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      max-width: 26rem;
      margin: 0 auto;
      padding: 2.5rem 2rem;
      height: fit-content;
      margin-top: 2rem;
      margin-bottom: 2rem;
      padding: 2.5rem 2rem;
      display: flex;
      position: relative;
    }
  @media screen and (max-width:${size.mobileL}){
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        border: 1px solid #ffffff1a;
        border-radius: 8px;
        width: 100%;
        height: auto;
        margin-top: 1rem;
        margin-bottom: 1rem;
        padding: 2rem 1.25rem;
  } */
`
const IconImbedCustom = styled.div`
  flex-direction: column;
  margin: 0 auto;
  width: 4rem;
  height: 3.125rem;
  display: flex;
`

const H3 = styled.h3`
  margin-top: 8px;
    font-size: 2rem;
    font-weight: 400;
    line-height: 1;
    background: -webkit-linear-gradient(0deg, #fff, hsla(0, 0%, 100%, .61) 70%, hsla(0, 0%, 61%, .6));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    .pricesheet h2 {
        font-size: 2rem;
    }
`
const BadPrice = styled.div`
    font-family: 'Doawnloawd', sans-serif;
    line-height: 64px;
    letter-spacing: 2px;
    font-size: 32px;
    font-weight: 400;
    color: #ffffff47;
`
const Description = styled.div`
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
const BadP = styled.div`
      text-align: left;
    color: #ffffffa3;
    font-weight: 300;
`
export default function CtaBasicCard({actor}) {
  const {t} = useTranslation();
  const checks = GetChecks(actor)
  return (
    <Cta className="rounded-lg border-[1px] border-[#ffffff1a]">
      <div className="flex flex-col items-center">
        <IconImbedCustom>
          <GiLaurels className=" h-12 w-auto"/>
        </IconImbedCustom>
        <H3>{t(`${actor}.plans.free.title`)}</H3>
        <div className="w-[240px] mx-auto h-[1px] bg-[#383531] mt-8"></div>
        <div className="flex items-center justify-center gap-4 mt-4">
            <BadPrice>Stay an amateur</BadPrice>
        </div>
        {checks.map((check, index) => (
          <div key={index} className="w-full justify-start">
            <Description className="flex items-center gap-4 mt-6">
              <FaCheck className=" h-5 w-7 "/>
              <BadP>{check}</BadP>
            </Description>
        </div>
        ))}
        
      </div>
        <div className="text-center w-full mt-[45px]">
          <EmployeeBtn actor={actor} />
        </div>
    </Cta>
  )
}

/* eslint-disable react/prop-types */
import { EmployeeBtn } from "@/components";
import styled from "styled-components"
import { FaCheck } from "react-icons/fa6";
import { size } from "@/lib/mediaQuerys";
import { useTranslation } from "react-i18next";
import { GiLaurels } from "react-icons/gi";

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
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    background-image: none;
    background-repeat: repeat;
    background-size: auto;
    border-radius: 4px;
    border: 1px solid #ffffff1a;
    background-color: #ffffff1a;
    opacity: .5;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    max-width: 26rem;
    margin: 0 auto;
    height: fit-content;
    margin-bottom: 2rem;
    padding: 2.5rem 2rem;
    display: flex;
    position: relative;
    @media screen and (max-width:${size.laptop}){
      margin-bottom:0;
    }
    @media screen and (max-width:${size.tablet}){
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
  }
`
const IconImbedCustom = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 3.125rem;
  display: flex;
`
const IconLine = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 12.5rem;
  height: .125rem;
  display: flex;
  color: var(--whiteGray);
`
const H3 = styled.h3`
  color: var(--smallTittle);
  margin-top: 0;
  margin-bottom: 0;
  font-family: Clashdisplay Variable, sans-serif;
  line-height: 1.2;
  text-transform: uppercase;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  @media screen and (max-width:${size.tablet}){
    font-size: 1.8rem;
  }
`

const CtaChecks = styled.div`
  grid-column-gap: .8rem;
  grid-row-gap: .8rem;
  flex-direction: column;
  align-items: flex-start;
  display: flex;
` 
const CtaPrice = styled.div`
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  @media screen and (max-width:${size.tablet}){
    grid-column-gap: .9rem;
    grid-row-gap: .9rem;
    margin-right: 17px;
  }
`
export default function CtaBasicCard({actor}) {
  const {t} = useTranslation();
  const checks = GetChecks(actor)
  return (
    <Cta>
        <div className="vflex-center-8 w-layout-vflex">
        <IconImbedCustom>
          <GiLaurels className=" h-12 w-auto"/>
        </IconImbedCustom>
        <H3>{t(`${actor}.plans.free.title`)}</H3>
        </div>
        <IconLine>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 2" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
            <line opacity="0.3" x1="-0.000549316" y1="1.29199" x2="199.999" y2="1.29199" stroke="currentColor"></line>
        </svg>
        </IconLine>
        <CtaPrice className="w-layout-hflex font-medium text-4xl ">
        <h1 className=" text-my-small-white-title opacity-70 capitalize">{t("dentist.plans.free.head")}</h1>
        </CtaPrice>
        <CtaChecks>
        {checks.map((check, index) => (
          <div key={index} className="w-layout-hflex hflex-center-8 text-xl text-my-white-gray">
            <FaCheck className=" h-5 w-7 "/>
            <h3>{check}</h3>
          </div>
        ))}
        </CtaChecks >
        <IconLine>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 2" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
            <line opacity="0.3" x1="-0.000549316" y1="1.29199" x2="199.999" y2="1.29199" stroke="currentColor"></line>
        </svg>
        </IconLine>
        
        <div className=" w-[80%] max-w-[40rem] mt-10 mb-10">
        <EmployeeBtn actor={actor} />
        </div>
    </Cta>
  )
}

import { EmployeeBtn } from "@/components";
import styled from "styled-components"
import { FaCheck } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaRegWindowClose } from "react-icons/fa";
import { size } from "@/lib/mediaQuerys";
import { useTranslation } from "react-i18next";


export const GetChecks = () => {
  const { t } = useTranslation();

  const transformDescriptionToTable = (description) => {
    return description
      .split('.')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  return transformDescriptionToTable(t("plans.free.checks"));
};

const Cta = styled.div`
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    box-shadow: inset 0 -3em 3em rgba(0,0,0,0.1),
                0 0  0 2px rgb(190, 190, 190),
                0.3em 0.3em 1em rgba(0,0,0,0.3);
    background-image: none;
    background-repeat: repeat;
    background-size: auto;
    border-radius: 4px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 26rem;
    margin: 0 auto;
    height: 57rem;
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
    height: 55.3rem;
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
`
const H3 = styled.h3`
  color: var(--gray);
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
const SVGPrice = styled.div`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: .3rem;
  height: 1.25rem;
  display: flex;
`

export default function CtaBasicCard() {
  const {t} = useTranslation();
  const checks = GetChecks()
  return (
    <Cta>
        <div className="vflex-center-8 w-layout-vflex">
        <IconImbedCustom>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 42 41" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
          <path d="M21.0833 0C9.82577 0 0.666626 9.15914 0.666626 20.4167C0.666626 31.6742 9.82577 40.8333 21.0833 40.8333C32.3408 40.8333 41.5 31.6742 41.5 20.4167C41.5 9.15914 32.3408 0 21.0833 0ZM21.0833 38.5648C11.0735 38.5648 2.93514 30.4208 2.93514 20.4167C2.93514 10.4125 11.0735 2.26852 21.0833 2.26852C31.0931 2.26852 39.2314 10.4125 39.2314 20.4167C39.2314 30.4208 31.0931 38.5648 21.0833 38.5648Z" fill="url(#paint0_linear_1238_2936)" fillOpacity="0.3"></path>
          <path d="M21.6505 9.70345C21.0267 9.70345 20.5163 10.2139 20.5163 10.8377V19.5942C20.5163 19.9459 20.3915 20.2919 20.1646 20.564L13.4044 28.7703C13.0075 29.2524 13.0754 29.967 13.5574 30.3697C13.7673 30.5397 14.0227 30.6248 14.2778 30.6248C14.6068 30.6248 14.93 30.483 15.1512 30.2107L21.917 22.01C22.4784 21.3295 22.7847 20.4731 22.7847 19.594V10.8375C22.7847 10.2137 22.2742 9.70325 21.6504 9.70325L21.6505 9.70345Z" fill="url(#paint1_linear_1238_2936)" fillOpacity="0.3"></path>
          <defs>
            <linearGradient id="paint0_linear_1238_2936" x1="21.0833" y1="7.572e-07" x2="71.8981" y2="101.176" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5E5E5E"></stop>
              <stop offset="1" stopColor="#5E5E5E" stopOpacity="0"></stop>
            </linearGradient>
            <linearGradient id="paint1_linear_1238_2936" x1="17.9654" y1="9.70325" x2="50.3024" y2="39.3656" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5E5E5E"></stop>
              <stop offset="1" stopColor="#5E5E5E" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
        </svg>
        </IconImbedCustom>
        <H3>{t("plans.free.title")}</H3>
        </div>
        <IconLine>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 2" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
            <line opacity="0.3" x1="-0.000549316" y1="1.29199" x2="199.999" y2="1.29199" stroke="currentColor"></line>
        </svg>
        </IconLine>
        {/* <CtaPrice className="w-layout-hflex font-medium text-5xl ">
        <h1 className=" text-gray-400 line-through  ">€35</h1>
        <h1 className=" text-my-gold">€14.5</h1>
        </CtaPrice> */}
        <CtaChecks>
        {checks.map((check, index) => (
          <div key={index} className="w-layout-hflex hflex-center-8 text-xl">
            <FaCheck className=" h-5 w-7 "/>
            <h3>{check}</h3>
          </div>
        ))}
        </CtaChecks>
        <IconLine>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 2" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
            <line opacity="0.3" x1="-0.000549316" y1="1.29199" x2="199.999" y2="1.29199" stroke="currentColor"></line>
        </svg>
        </IconLine>
        <CtaChecks className="text-xl font-medium">
        <div className="w-layout-hflex hflex-center-8 items-end ">
            <FaRegWindowClose className=" self-center"/>
            <h3>{t("plans.paid.cta")}</h3>
        </div>
        <SVGPrice className=" text-my-gold w-full ">
            <GiTakeMyMoney className=" self-center h-10 w-7"/>
            <h3 className="text-nowrap ">{t("plans.paid.cta2")}</h3>
        </SVGPrice>
        <data className=" opacity-70 ">{t("plans.paid.cta3")}</data>
        </CtaChecks>
        <div className=" w-fit max-w-[36rem]">
        <EmployeeBtn />
        </div>
    </Cta>
  )
}

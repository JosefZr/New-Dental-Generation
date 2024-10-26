import { CtaButton } from "@/components";
import styled from "styled-components"
import { FaCheck } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaRegWindowClose } from "react-icons/fa";
import { size } from "@/lib/mediaQuerys";
import { useTranslation } from "react-i18next";
import { GiLaurelCrown } from "react-icons/gi";

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
    background-image: url("https://www.jointherealworld.com/revamp/images/CTA-bg.svg") !important;
    background-position: center;
    /* background-color: #ffffff1a; */
    opacity: .7;
    background-repeat: no-repeat;
    background-size: cover;
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    border-radius: 4px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 26rem;;
    margin: 0 auto;
    height: fit-content;
    margin-bottom: 2rem;
    padding: 2.5rem 2rem;
    display: flex;
    overflow: hidden;
    position: relative;
    @media screen and (max-width:${size.laptop}){
        margin-bottom:0;
    }
@media screen and (max-width:${size.tablet}){
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    border-radius: 4px;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    align-items: center;
    max-width: 26rem;
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
  color:var(--whiteGray);
`
const H3 = styled.h3`
  color: var(--gold);
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

// eslint-disable-next-line react/prop-types
export default function CtaPreniumCard({actor}) {
  const {t} = useTranslation();
  const checks = GetChecks(actor)
  return (
    <Cta>
        <div className="vflex-center-8 w-layout-vflex">
        <IconImbedCustom>
          <GiLaurelCrown className=" h-14 w-auto text-my-gold"/>
        </IconImbedCustom>
        <H3>{t(`${actor}.plans.paid.title`)}</H3>
        </div>
        <IconLine>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 2" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
            <line opacity="0.3" x1="-0.000549316" y1="1.29199" x2="199.999" y2="1.29199" stroke="currentColor"></line>
        </svg>
        </IconLine>
        <CtaPrice className="w-layout-hflex font-medium text-5xl ">
        <h1 className=" text-my-white line-through  ">€29</h1>
        <h1 className=" text-my-gold">€14.5</h1>
        </CtaPrice>
        <CtaChecks>
        {checks.map((check, index) => (
          <div key={index} className="w-layout-hflex hflex-center-8 text-xl text-my-white-gray">
            <FaCheck />
            <h3>{check}</h3>
          </div>
        ))}
        </CtaChecks>
        <IconLine>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 2" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
            <line opacity="0.3" x1="-0.000549316" y1="1.29199" x2="199.999" y2="1.29199" stroke="currentColor"></line>
        </svg>
        </IconLine>
        <CtaChecks className="text-xl font-medium text-my-small-white-title">
        <div className="w-layout-hflex hflex-center-8 items-end ">
            <FaRegWindowClose className=" self-center"/>
            <h3>{t(`${actor}.plans.paid.cta`)}</h3>
        </div>
        <SVGPrice className=" text-my-gold w-full ">
            <GiTakeMyMoney className=" self-center h-10 w-7"/>
            <h3 className="text-nowrap ">{t(`${actor}.plans.paid.cta2`)}</h3>
        </SVGPrice>
        <data className=" opacity-70 ">{t(`${actor}.plans.paid.cta3`)}</data>
        </CtaChecks>
        <div className=" w-fit lg:max-w-[36rem] mt-10">
        <CtaButton isSmall={true}/>
        </div>
    </Cta>
  )
}

import { CtaButton } from "@/components";
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

  return transformDescriptionToTable(t("plans.paid.checks"));
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
    max-width: 26rem;;
    margin: 0 auto;
    height: 57rem;
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
    background-image: none;
    background-repeat: repeat;
    background-size: auto;
    border-radius: 4px;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    align-items: center;
    max-width: 26rem;
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

export default function CtaPreniumCard() {
  const {t} = useTranslation();
  const checks = GetChecks()
  return (
    <Cta>
        <div className="vflex-center-8 w-layout-vflex">
        <IconImbedCustom>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 64 50" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
            <g opacity="1">
                <path d="M31.0607 12.9741C29.0863 14.9484 29.0875 18.1411 31.0607 20.1144C33.0336 22.0873 36.2277 22.0883 38.2011 20.1144L43.5315 14.7838L41.9586 13.211L36.6279 18.5415C35.5236 19.6457 33.7367 19.6457 32.6329 18.5415C31.5286 17.4375 31.5286 15.6505 32.6329 14.5466L37.9634 9.21611L36.391 7.64343L31.0607 12.9741Z" fill="#D9D9D9"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M48.7486 2.31316C46.7757 0.34027 43.5816 0.339302 41.6082 2.31316L36.2778 7.64385L37.8503 9.21652L41.8455 13.2114L43.4183 14.7842L48.7486 9.45349C50.7228 7.47915 50.7218 4.28612 48.7486 2.31316ZM45.775 4.47132C45.7323 4.06411 45.3616 3.77272 44.9604 3.81149C44.6258 3.8469 44.1365 3.97922 43.705 4.41002L41.1325 6.98289C40.8429 7.27249 40.8429 7.74207 41.1325 8.03119C41.4221 8.32079 41.8913 8.32079 42.1809 8.03119L44.7534 5.45832C44.8526 5.35873 44.975 5.30089 45.1154 5.28608C45.5229 5.24314 45.8185 4.87815 45.775 4.47132Z" fill="white"></path>
            </g>
            <path d="M3.7519 46.1827L35.5154 47.4947L59.5375 30.963L57.4217 29.013C56.7254 28.3716 55.8326 27.9777 54.896 27.8524C53.9593 27.7287 52.9711 27.872 52.0765 28.3049L41.8968 33.227C41.4791 34.6888 39.9566 38.0859 34.7848 38.0859H20.5593C19.7524 38.0859 19.1 37.5276 19.1 36.8407C19.1 36.1522 19.7543 35.5955 20.5593 35.5955H34.7848C38.5354 35.5955 39.0943 32.6312 39.1422 32.3172C39.1459 31.9477 39.0372 29.8348 36.1432 29.3676C33.1481 28.8858 26.0647 28.1908 20.4789 27.6438L17.7012 27.3704C17.104 27.3117 16.5147 27.2824 15.9347 27.2824C12.2795 27.2824 9.37809 28.4739 7.32892 30.1603C5.28006 31.8433 4.07244 34.0068 3.80727 35.9569C3.77105 36.2141 3.75387 36.4762 3.75387 36.7415V46.1843L3.7519 46.1827ZM35.9293 49.9983L2.33067 48.6115H2.29258C1.48568 48.6115 0.833252 48.0532 0.833252 47.3663V36.7402C0.833252 36.4001 0.858092 36.0436 0.909634 35.6724C1.24725 33.1933 2.75628 30.4654 5.30876 28.3669C7.8594 26.2704 11.4441 24.7891 15.9346 24.7891C16.6024 24.7891 17.3024 24.8233 18.031 24.8964L20.8087 25.1699C26.421 25.72 33.5388 26.4168 36.6791 26.923C39.8478 27.4342 41.1527 29.0978 41.6868 30.4731L50.6397 26.1448C52.1201 25.4286 53.7703 25.1926 55.3422 25.4009C56.9123 25.6093 58.4002 26.2637 59.5563 27.3298L62.662 30.193C62.7096 30.232 62.7556 30.2744 62.7974 30.3184C63.301 30.8523 63.2019 31.6353 62.5743 32.065L36.91 49.7266C36.643 49.9105 36.2996 50.0131 35.9295 49.9984L35.9293 49.9983Z" fill="url(#paint0_linear_1238_2960)" fillOpacity="0.3"></path>
            <defs>
                <linearGradient id="paint0_linear_1238_2960" x1="31.9759" y1="24.7891" x2="31.6228" y2="63.347" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5E5E5E"></stop>
                <stop offset="1" stopColor="#5E5E5E" stopOpacity="0"></stop>
                </linearGradient>
            </defs>
            </svg>
        </IconImbedCustom>
        <H3>{t("plans.paid.title")}</H3>
        </div>
        <IconLine>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 2" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
            <line opacity="0.3" x1="-0.000549316" y1="1.29199" x2="199.999" y2="1.29199" stroke="currentColor"></line>
        </svg>
        </IconLine>
        <CtaPrice className="w-layout-hflex font-medium text-5xl ">
        <h1 className=" text-gray-400 line-through  ">€35</h1>
        <h1 className=" text-my-gold">€14.5</h1>
        </CtaPrice>
        <CtaChecks>
        {checks.map((check, index) => (
          <div key={index} className="w-layout-hflex hflex-center-8 text-xl">
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
        <div className=" w-fit lg:max-w-[36rem]">
        <CtaButton isSmall={true}/>
        </div>
    </Cta>
  )
}

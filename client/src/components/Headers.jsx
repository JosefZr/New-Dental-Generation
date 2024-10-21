import styled from "styled-components"
import { GiTakeMyMoney } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { FaMoneyBillTrendUp, FaRegChessKnight } from "react-icons/fa6";
import { MdOutlinePhonelinkSetup } from "react-icons/md";
import { MdOutlineNotificationsActive } from "react-icons/md";
import CtaButton from "./CtaButton";
const getExtraServices = (t)=>{
    return[
        {
            logo:<MdOutlineNotificationsActive className=" h-10 w-12"/>,
            title:t("store.plusServices.notifications.title"),
            description:t("store.plusServices.notifications.description"),
        },
        {
            logo:<GiTakeMyMoney className=" h-10 w-12"/>,
            title:t("store.plusServices.financial.title"),
            description:t("store.plusServices.financial.description"),
        },
        {
            logo:<FaMoneyBillTrendUp className=" h-10 w-12"/>,
            title:t("store.plusServices.growth.title"),
            description:t("store.plusServices.growth.description"),
        },
        {
            logo:<FaRegChessKnight className=" h-10 w-12"/>,
            title:t("store.plusServices.plan.title"),
            description:t("store.plusServices.plan.description"),
        },
        
        {
            logo:<MdOutlinePhonelinkSetup className=" h-10 w-12"/>,
            title:t("store.plusServices.setup.title"),
            description:t("store.plusServices.setup.description"),
        }
    ]
}
const HeaderSection = styled.section`
    background-image: url(/backs/final.svg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    background-color: black;
`
const Content = styled.div`
    grid-column-gap: 1.75rem;
    grid-row-gap: 1.75rem;
    color: var(--whiteGray);
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4rem;
    display: flex;
`
const H2 = styled.h2`
    text-align: center;
    text-transform: uppercase;
    -webkit-text-fill-color: transparent;
    background-image: url(../images/heading-texture_1heading-texture.webp), linear-gradient(125deg, #fff 85%, #fff0);
    background-position: 0 0, 0 0;
    background-size: auto, auto;
    -webkit-background-clip: text;
    background-clip: text;
    margin-top: 0;
    margin-bottom: 0;
    font-family: Clashdisplay Variable, sans-serif;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1.1;
`
const Description = styled.p`
    color: var(--whiteGray);
    text-align: center;
    text-transform: none;
    -webkit-text-fill-color: inherit;
    background-image: none;
    background-clip: border-box;
    margin-bottom: 0;
    font-family: Inter Variablefont Slnt Wght, sans-serif;
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1;
`
export default function Headers() {
    const {t} = useTranslation();
    const extra = getExtraServices(t)
    return (
        <HeaderSection>
            <div className=" container-large">
                <div className=" padding-section-medium">
                    <Content>
                            {extra.map((service, index)=>{
                                return(
                                <div key={index} className="vflex-center-16 w-layout-vflex  items-center">
                                    <div  className="hflex-center-16">
                                        {service.logo}
                                        <H2>{service.title}</H2>
                                    </div>
                                    <p className="text-my-white-gray mb-0 leading-7">{service.description}</p>
                                </div>
                                )
                            })}
                    </Content>
                    <CtaButton cta={true}/>

                </div>
            </div>
        </HeaderSection>
    )
}

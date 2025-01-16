import styled from "styled-components"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import { GiTakeMyMoney } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { FaMoneyBillTrendUp, FaRegChessKnight, FaRegChessQueen } from "react-icons/fa6";
import { MdOutlinePhonelinkSetup } from "react-icons/md";
import { MdOutlineNotificationsActive } from "react-icons/md";
import CtaButton from "./CtaButton";
import { Plus } from "@/components";
const getExtraServices = (t)=>{
    return[
        {
            logo:<FaRegChessQueen className=" h-10 w-12  max-[400px]:h-5 max-[400px]:w-6"/>,
            title:t("store.plusServices.top.title"),
            description:t("store.plusServices.top.description"),
        },
        {
            logo:<FaMoneyBillTrendUp className=" h-10 w-12  max-[400px]:h-5 max-[400px]:w-6"/>,
            title:t("store.plusServices.growth.title"),
            description:t("store.plusServices.growth.description"),
        },
        {
            logo:<GiTakeMyMoney className=" h-10 w-12  max-[400px]:h-5 max-[400px]:w-6"/>,
            title:t("store.plusServices.financial.title"),
            description:t("store.plusServices.financial.description"),
        },
        {
            logo:<MdOutlineNotificationsActive className=" h-10 w-12 max-[400px]:h-5 max-[400px]:w-6"/>,
            title:t("store.plusServices.notifications.title"),
        },
        {
            logo:<FaRegChessKnight className=" h-10 w-12  max-[400px]:h-5 max-[400px]:w-6"/>,
            title:t("store.plusServices.plan.title"),
            description:t("store.plusServices.plan.description"),
        },
        {
            logo:<MdOutlinePhonelinkSetup className=" h-10 w-12  max-[400px]:h-5 max-[400px]:w-6"/>,
            title:t("store.plusServices.setup.title"),
            description:t("store.plusServices.setup.description"),
        }
    ]
}
const HeaderSection = styled.section`
    margin-top: 2rem;
`
const Content = styled.div`
    grid-column-gap: 1.75rem;
    grid-row-gap: 1.75rem;
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4rem;
    display: flex;
    position: relative;
    @media screen and (max-width:520px){
        gap: 1rem;
    }
`
const H2 = styled.h2`
    text-align: center;
    text-transform: uppercase;
    /* -webkit-text-fill-color: transparent; */
    /* background-image: url(../images/heading-texture_1heading-texture.webp), linear-gradient(125deg, #fff 85%, #fff0); */
    background-position: 0 0, 0 0;
    background-size: auto, auto;
    color: var(--whiteGray);
    /* -webkit-background-clip: text; */
    -webkit-background-clip: text;
    background-clip: text;
    margin-top: 0;
    margin-bottom: 0;
    font-family: Clashdisplay Variable, sans-serif;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1.1;
    @media screen and (max-width:520px){
        font-size: 1.2rem;
    }
    @media screen and (max-width:400px){
        font-size: 1.2rem;
    }
`
const Description = styled.p`
    color: var(--gold);
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
                    
                    <Dialog >
                        <DialogTrigger className=" w-full"><Plus/></DialogTrigger>
                        <DialogContent className=" bg-black border-my-gray max-w-[60%] max-[991px]:max-w-[80%] max-sm:max-w-[95%]">
                            {/* <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription> */}
                                        <Content className="w-full">
                                        {extra.map((service, index)=>{
                                            return(
                                            <div key={index} className="vflex-center-16 w-layout-vflex text-wrap items-center">
                                                <div  className="hflex-center-16 ">
                                                    {service.logo}
                                                    <H2 className=" ">{service.title}</H2>
                                                </div>
                                                <p className=" mb-0 leading-7 max-[520px]:leading-4 max-[400px]:text-sm  text-wrap text-my-gold">{service.description}</p>
                                            </div>
                                            )
                                        })}
                                </Content>
                                <CtaButton cta={true}/>
                        </DialogContent>
                        </Dialog>
        </HeaderSection>
    )
}

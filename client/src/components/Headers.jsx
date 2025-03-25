import styled from "styled-components"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {  FaRegHandPointRight } from "react-icons/fa6";
import { MdDone} from "react-icons/md";
import CtaButton from "./CtaButton";
import { Plus } from "@/components";
import { TiWarningOutline } from "react-icons/ti";
// const getExtraServices = (t)=>{
//     return[
//         {
//             logo:<FaRegChessQueen className=" h-10 w-12  max-[400px]:h-5 max-[400px]:w-6"/>,
//             title:t("store.plusServices.top.title"),
//             description:t("store.plusServices.top.description"),
//         },
//         {
//             logo:<FaMoneyBillTrendUp className=" h-10 w-12  max-[400px]:h-5 max-[400px]:w-6"/>,
//             title:t("store.plusServices.growth.title"),
//             description:t("store.plusServices.growth.description"),
//         },
//         {
//             logo:<GiTakeMyMoney className=" h-10 w-12  max-[400px]:h-5 max-[400px]:w-6"/>,
//             title:t("store.plusServices.financial.title"),
//             description:t("store.plusServices.financial.description"),
//         },
//         {
//             logo:<MdOutlineNotificationsActive className=" h-10 w-12 max-[400px]:h-5 max-[400px]:w-6"/>,
//             title:t("store.plusServices.notifications.title"),
//         },
//         {
//             logo:<FaRegChessKnight className=" h-10 w-12  max-[400px]:h-5 max-[400px]:w-6"/>,
//             title:t("store.plusServices.plan.title"),
//             description:t("store.plusServices.plan.description"),
//         },
//         {
//             logo:<MdOutlinePhonelinkSetup className=" h-10 w-12  max-[400px]:h-5 max-[400px]:w-6"/>,
//             title:t("store.plusServices.setup.title"),
//             description:t("store.plusServices.setup.description"),
//         }
//     ]
// }
const HeaderSection = styled.section`
    margin-top: 2rem;
`
const Content = styled.div`
    grid-column-gap: 1.75rem;
    grid-row-gap: 1.75rem;
    text-align: center;
    flex-direction: column;
    align-items: center;
    display: flex;
    position: relative;
    @media screen and (max-width:520px){
        gap: 1rem;
    }
`
// const H2 = styled.h2`
//     text-align: center;
//     text-transform: uppercase;
//     /* -webkit-text-fill-color: transparent; */
//     /* background-image: url(../images/heading-texture_1heading-texture.webp), linear-gradient(125deg, #fff 85%, #fff0); */
//     background-position: 0 0, 0 0;
//     background-size: auto, auto;
//     color: var(--whiteGray);
//     /* -webkit-background-clip: text; */
//     -webkit-background-clip: text;
//     background-clip: text;
//     margin-top: 0;
//     margin-bottom: 0;
//     font-family: Clashdisplay Variable, sans-serif;
//     font-size: 1.8rem;
//     font-weight: 600;
//     line-height: 1.1;
//     @media screen and (max-width:520px){
//         font-size: 1.2rem;
//     }
//     @media screen and (max-width:400px){
//         font-size: 1.2rem;
//     }
// `
// const Description = styled.p`
//     color: var(--gold);
//     text-align: center;
//     text-transform: none;
//     -webkit-text-fill-color: inherit;
//     background-image: none;
//     background-clip: border-box;
//     margin-bottom: 0;
//     font-family: Inter Variablefont Slnt Wght, sans-serif;
//     font-size: 1.5rem;
//     font-weight: 300;
//     line-height: 1;
// `
// const Container = styled.div`
//   background-color: #111;
//   color: #fff;
//   padding: 2rem;
//   border-radius: 8px;
//   text-align: center;
//   max-width: 600px;
//   margin: auto;
//   box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.1);
// `;
const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--vertRolex);
  margin-bottom: .5rem;
`;

const Subtitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: .5rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  color: #ddd;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
`;
export default function Headers() {
    return (
        <HeaderSection>
                    <Dialog >
                        <DialogTrigger className=" w-full"><Plus/></DialogTrigger>
                        <DialogContent className=" bg-black border-my-gray max-w-[60%] max-[991px]:max-w-[80%] max-sm:max-w-[95%]">
                            <Content>
                                <Title className="flex flex-row justify-center items-center gap-1">
                                    <TiWarningOutline/> BRAND-NEW FEATURE <TiWarningOutline/>
                                </Title>
                                <Subtitle className=" underline">
                                    CLINIC-MANAGEMENT SYSTEM  
                                    <br /> 
                                </Subtitle>
                                <Title className="flex flex-row justify-center items-center gap-1">
                                    <FaRegHandPointRight className="text-my-goldRolex mr-2"/>
                                    YOUR DENTAL ASSISTANT 
                                    <div className=" text-my-white text-xs italic font-normal">( BETA VERSION )</div>
                                </Title>
                                <Description className="font-bold">
                                    Finally, a system that keeps your clinic running like a well-oiled machine.
                                </Description>
                                <FeatureList>
                                    <FeatureItem><MdDone className="text-2xl text-my-vertRolex"/> <span className="text-my-vertRolex">Schedule patients</span> & <span className="underline">track</span> <span className="font-bold">appointments, cancellations, and no-shows.</span></FeatureItem>
                                    <FeatureItem><MdDone className="text-2xl text-my-vertRolex"/> <span className="text-my-vertRolex"> Store patient records </span>– Dental history, treatment plans, X-rays, and notes —<span className="font-bold">all in one place.</span></FeatureItem>
                                    <FeatureItem><MdDone className="text-2xl text-my-vertRolex"/> <span className="text-my-vertRolex">Track dental supply expenses, lab fees, and payroll</span> so you know exactly where your money is going.</FeatureItem>
                                    <FeatureItem><MdDone className="text-2xl text-my-vertRolex"/> <span className="text-my-vertRolex"> Staff Management</span> – Register and organize your <span className="font-bold">team&apos;s schedules, tasks, and responsibilities.</span></FeatureItem>
                                </FeatureList>
                                <Description>
                                    <span className="text-my-vertRolex text-xl font-semibold">⍟ Know Your Numbers</span> <br /> 
                                    <span className="text-my-goldRolex text-xl font-semibold">Monitor patient flow, financial health, and clinic performance.</span>
                                </Description>
                                </Content>
                                <CtaButton cta={true}/>
                        </DialogContent>
                        </Dialog>
        </HeaderSection>
    )
}

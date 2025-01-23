import { Faq, Footer, GlobalNavbar, PathStore,  TimeLineSection } from "@/components";
import DentistHero from "@/components/DentistHero";
import { useTranslation } from "react-i18next";
import { FaMoneyBillTrendUp, FaRegChessKnight, FaRegChessQueen } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { LiaUniversitySolid } from "react-icons/lia";

export const GetTimelineData = ( ) => {
  const { t } = useTranslation();

  const transformDescriptionToTable = (description) => {
    // Split the description by '.' and filter out any empty strings
    return description
      .split('.')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  };

  return [
    {
      logo: <LiaUniversitySolid className="h-10 w-12" />,
      left: "/store/1.svg",
      title: t("store.services.content.access.title"),
      descriptions: transformDescriptionToTable(t("store.services.content.access.description")),
    },
    {
      logo: <FaRegChessKnight className="h-10 w-12" />,
      left: "/store/2.svg",
      title: t("store.services.content.simplified.title"),
      descriptions: transformDescriptionToTable(t("store.services.content.simplified.description")),
    },
    {
      logo: <GiTakeMyMoney className="h-10 w-12" />,
      left: "/store/3.svg",
      title: t("store.services.content.competitive.title"),
      descriptions: transformDescriptionToTable(t("store.services.content.competitive.description")),
    },
    {
      logo: <FaRegChessQueen className="h-10 w-12" />,
      left: "/store/5.svg",
      title: t("store.services.content.trust.title"),
      descriptions: transformDescriptionToTable(t("store.services.content.trust.description")),
    },
    {
      logo: <FaRegChessKnight className="h-10 w-12" />,
      left: "/store/4.svg",
      title: t("store.services.content.Plan.title"),
      descriptions: transformDescriptionToTable(t("store.services.content.Plan.description")),
    },
    {
      logo: <FaMoneyBillTrendUp className="h-10 w-12" />,
      left: "/store/6.svg",
      title: t("store.services.content.management.title"),
      descriptions: transformDescriptionToTable(t("store.services.content.management.description")),
    },
    {
      logo: <FaMoneyBillTrendUp className="h-10 w-12" />,
      left: "/store/6.svg",
      title: t("store.services.content.growth.title"),
      descriptions: transformDescriptionToTable(t("store.services.content.growth.description")),
    },
    {
      logo: <FaMoneyBillTrendUp className="h-10 w-12" />,
      left: "/store/6.svg",
      title: t("store.services.content.setup.title"),
      descriptions: transformDescriptionToTable(t("store.services.content.setup.description")),
    },
    {
      logo: <FaMoneyBillTrendUp className="h-10 w-12" />,
      left: "/store/6.svg",
      title: t("store.services.content.notifications.title"),
      descriptions: transformDescriptionToTable(t("store.services.content.notifications.description")),
    },
  ];
};
export default function DentalStore() {

  return (
    <div className="overflow-x-hidden zoom-in-0">
      <GlobalNavbar/>
      <DentistHero actor="store"/>
      <TimeLineSection actor="store" />
      <PathStore actor="store"/>
      <Faq/>
      <Footer/>
    </div>
  )
}

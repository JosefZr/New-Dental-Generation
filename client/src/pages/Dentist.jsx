import { Faq, FinalSection, Footer, GlobalNavbar, Path, TimeLineSection } from "@/components";
import DentistHero from "@/components/DentistHero";
import { useTranslation } from "react-i18next";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaMoneyBillTrendUp, FaRegChessKnight, FaRegChessQueen } from "react-icons/fa6";
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
      left: "/images/1.svg",
      title: t("dentist.services.content.private.title"),
      descriptions: transformDescriptionToTable(t("dentist.services.content.private.description")),
    },
    {
      logo: <FaRegChessKnight className="h-10 w-12" />,
      left: "/images/2.svg",
      title: t("dentist.services.content.plan.title"),
      descriptions: transformDescriptionToTable(t("dentist.services.content.plan.description")),
    },
    {
      logo: <GiTakeMyMoney className="h-10 w-12" />,
      left: "/images/3.svg",
      title: t("dentist.services.content.finance.title"),
      descriptions: transformDescriptionToTable(t("dentist.services.content.finance.description")),
    },
    {
      logo: <FaRegChessQueen className="h-10 w-12" />,
      left: "/images/5.svg",
      title: t("dentist.services.content.opportunity.title"),
      descriptions: transformDescriptionToTable(t("dentist.services.content.opportunity.description")),
    },
    {
      logo: <FaRegChessKnight className="h-10 w-12" />,
      left: "/images/4.svg",
      title: t("dentist.services.content.courses.title"),
      descriptions: transformDescriptionToTable(t("dentist.services.content.courses.description")),
    },
    {
      logo: <FaMoneyBillTrendUp className="h-10 w-12" />,
      left: "/images/6.svg",
      title: t("dentist.services.content.growth.title"),
      descriptions: transformDescriptionToTable(t("dentist.services.content.growth.description")),
    },
  ];
};
export default function Dentist() {
  const {t} = useTranslation();

  return (
    <div>
      <GlobalNavbar/>
      <DentistHero title={t("dentist.hero.title")} description={t("dentist.hero.description")}/>
      <TimeLineSection p={t("dentist.services.p")} GetTimelineData ={GetTimelineData}/>
      <Path/>
      <FinalSection/>
      <Faq/>
      <Footer/>
    </div>
  );
}

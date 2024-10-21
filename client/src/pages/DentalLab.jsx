import { Faq, FinalSection, Footer, GlobalNavbar, Path, TimeLineSection } from "@/components";
import DentistHero from "@/components/DentistHero";

export default function DentalLab() {
  return (
      <div>
      <GlobalNavbar/>
      <DentistHero actor="lab"/>
      <TimeLineSection actor="lab" />
      <Path actor="dentist"/>
      <FinalSection actor="dentist"/>
      <Faq/>
      <Footer/>
    </div>
  )
}

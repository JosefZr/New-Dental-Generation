import { Faq, FinalSection, Footer, GlobalNavbar, PathStore, TimeLineSection } from "@/components";
import DentistHero from "@/components/DentistHero";

export default function DentalLab() {
  return (
      <div>
      <GlobalNavbar/>
      <DentistHero actor="lab"/>
      <TimeLineSection actor="lab" />
      <PathStore actor="lab"/>
      <FinalSection actor="dentist"/>
      <Faq/>
      <Footer/>
    </div>
  )
}

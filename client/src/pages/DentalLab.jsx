import { Faq, Footer, GlobalNavbar, PathStore, TimeLineSection } from "@/components";
import DentistHero from "@/components/DentistHero";

export default function DentalLab() {
  return (
    <div className="scrollbar-custom overflow-x-hidden zoom-in-0">
      <GlobalNavbar/>
      <DentistHero actor="lab"/>
      <TimeLineSection actor="lab" />
      <PathStore actor="lab"/>
      <Faq/>
      <Footer/>
    </div>
  )
}

import { FinalSection, GlobalNavbar, Path, TimeLineSection } from "@/components";
import DentistHero from "@/components/DentistHero";


export default function Dentist() {

  return (
    <div className=" bg-my-white ">
      <GlobalNavbar/>
      <DentistHero/>
      <TimeLineSection/>
      <Path/>
      <FinalSection/>
    </div>
  );
}

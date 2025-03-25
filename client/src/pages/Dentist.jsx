import { useState, useEffect } from "react";
import { Faq, FinalSection, Footer, GlobalNavbar, Path, TimeLineSection } from "@/components";
import DentistHero from "@/components/DentistHero";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";

export default function Dentist() {
  const [countdown, setCountdown] = useState(2); // Countdown for delay note
  const {onOpen}= useModal()

  useEffect(() => {
    const hasSubmittedEmail = localStorage.getItem("emailSubmitted");

    if (!hasSubmittedEmail) {
      let timeLeft = 2;
      const timer = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);
        if (timeLeft === 0) {
          clearInterval(timer);
          onOpen(MODAL_TYPE.LEADS_MODAL);
        }
      }, 1000); // Countdown updates every second
    }
  }, []);


  return (
    <div className="scrollbar-custom overflow-x-hidden zoom-in-0 bg-[#02040e]">
      <GlobalNavbar />
      <DentistHero actor="dentist" />
      <TimeLineSection actor="dentist" />
      <Path actor="dentist" />
      <FinalSection actor="dentist" />
      <Faq />
      <Footer />
    </div>
  );
}

import { GlobalNavbar } from "@/components";
import Hero from "@/pages/landing/hero-section/Hero";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TimeLineSection } from "@/components";
import { PathStore } from "@/components";
import { FinalSection } from "@/components";
import { Faq } from "@/components";
import { Footer } from "@/components";
import OneYear from "./one-year";
import AskYourself from "./ask-yourself";
import Exclusive from "./exclusive";
import Path from "./path";


export default function Landing() {
    const [countdown, setCountdown] = useState(2); // Countdown for delay note
    const {onOpen}= useModal()
    const params = useParams()
        useEffect(() => {
            console.log('1111')
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
        <Hero actor={params.name} />
        <TimeLineSection actor={params.name} />
        <OneYear actor={params.name}/>
        <Exclusive actor={params.name}/>
        <AskYourself actor={params.name}/>

        {(params.name === "lab"|| params.name === "store" )?
            <PathStore actor={params.name}/>:<Path actor={params.name} />
        }
        <FinalSection actor={params.name}/>
        <Faq />
        <Footer />
    </div>
  )
}

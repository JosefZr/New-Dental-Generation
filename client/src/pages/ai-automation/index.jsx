import Hero from "./components/sections/Hero";
import Section2 from "./components/sections/Section2";
import ReverseSection from "./components/sections/ReverseSection";
import Services from "./components/sections/Services";
import AfterServices from "./components/sections/AfterServices";
import Prices from "./components/sections/Price";
import Questions from "./components/sections/Questions";
import LastSection from "./components/sections/LastSection";

export default function AiAutomation() {
    return (
        <div >
            <Hero/>
            <Section2/>
            <ReverseSection/>
            <Services/>
            <AfterServices/>
            <Prices/>
            <Questions/>
            <LastSection />
        </div>
    )
}

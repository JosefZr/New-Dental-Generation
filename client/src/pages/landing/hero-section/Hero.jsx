import { CtaButton } from "@/components";
import { size } from "@/lib/mediaQuerys";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";

const dropUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const HeroSection = styled.section`
  /* background-image: url("/backs/dentist-landing-1.svg"); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  background-color: #02040e;
`;
const Content = styled.div`
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -2rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  /* gap: 10px; */
  animation: ${dropUp} 0.5s ease-out forwards;

  @media screen and (max-width: ${size.laptop}) {
    margin-left: 40px;
    margin-right: 40px;
  }
  @media screen and (max-width: ${size.tablet}) {
    margin-top: 2rem;
    margin-left: 0;
    margin-right: 0;
  }
`;
const Subtitle = styled.div`
    font-size: 14px;
    text-transform: uppercase;
    background-clip: text;
    letter-spacing: 3px;
    line-height: 1;
    font-weight: 400;
    line-height: 14px;
    color: #fff;
    text-align: center;
    font-family: "Open Sans", sans-serif;

`
const SubtitleGold = styled.div`
  font-family: "Open Sans", sans-serif;

    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    color: #fff;
    text-align: center;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-image: linear-gradient(126deg,#BC1823,#BC1823);
    text-transform: uppercase;
`
const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  font-family: var(--font-sf);
  letter-spacing: 0;
  text-align: center;
  color: #fff;
  font-family: "Open Sans", sans-serif;

  
  @media screen and (min-width: ${size.laptopM}){
    font-size: 38px;
  }
`
const TitleGold = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 30px;
  font-weight: 600;
  font-family: var(--font-sf);
  letter-spacing: 0;
  text-align: center;
  color: #fff;
  -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-image: linear-gradient(126deg,#BC1823,#BC1823);
  @media screen and (min-width: ${size.laptopM}){
    font-size: 38px;
  }
`
const Description = styled.div`
  margin: 0 0 24px;
  font-size: 16px;
  font-weight: 500;
  padding: 0 16px;
  text-align: center;
  color: hsla(0, 0%, 100%, .7);
  font-family: "Open Sans", sans-serif;
`
const Bad = styled.div`
  background: #212833;
    display: flex;
    justify-content: center;
    border: 3px solid #212833;
    cursor: pointer;
    &:hover{
    width: 100%;
    box-shadow: 0 4px 75px 0 rgba(0, 0, 0, .95);
    }
`
const ButtonBad = styled.button`
    background: #212833;
    font-size: 20px;
    line-height: 25px;
    font-weight: 400;
    cursor: pointer;
    text-align: center;
    color: hsla(0, 0%, 100%, .5);
    text-align: center;
    padding: 17px 37px;
    width: 100%;
`
const Good = styled.div`
  border: 4px solid;
    border-image-slice: 4;
    border-image-source: linear-gradient(92.15deg, #ffcf23 2.09%, #ff8d3a 86.55%);
    overflow: hidden;
    position: relative;
    display: flex
;
    align-items: center;
    justify-items: center;
    text-align: center;
`
const ButtonGood = styled.div`
  background: linear-gradient(100.33deg, rgba(255, 207, 35, .2) 5.1%, rgba(255, 141, 58, .2) 83.56%);
    box-shadow: 0 4px 50px 0 rgba(254, 180, 75, .24);
    color: #fff;
    backdrop-filter: blur(25px);
    font-size: 22px;
    font-weight: 600;
    line-height: 22px;
    text-align: center;
    padding: 16px 26px;
    width: 100%;
`

import { useEffect, useState } from "react";
import HeroViddeo from "./components/HeroViddeo";
import HeroHeader from "./components/HeroHeader";
import Lines from "./components/Lines";

export const GetHeroData = (actor) => {
  const { t } = useTranslation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 810); // Adjust this breakpoint as needed
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const transformTextToLines = (text) => {
    if (!isSmallScreen) return [text]; // On larger screens, return as is

    return text
      .split(".")
      .map((line, index) => (index === text.split(".").length - 1 ? line.trim() : `${line.trim()}.`))
      .filter((line) => line.length > 0);
  };

  return [
    {
      title: transformTextToLines(t(`${actor}.hero.title`)),
      description: transformTextToLines(t(`${actor}.hero.description`)), // Apply only on small screens
    },
  ];
};


// eslint-disable-next-line react/prop-types
export default function Hero({ actor }) {


  return (
    <HeroSection>
      <div className="relative container-large w-full max-w-7xl">
        <div className="padding-section-medium w-full">
          <Content>
            <HeroHeader actor={actor}/>
            
            <HeroViddeo/>
            <Lines/>
              <div className="flex w-full gap-12 lg:gap-0 flex-col lg:flex-row items-center justify-evenly mt-4 lg:mt-32 max-w-[1280px] mx-auto">
                {/* left content */}
                <div className="max-w-[320px] pt-2 mt-0">
                  <Subtitle>FAIL TO ACHIEVE</Subtitle>
                  <Title>Stay Stagnant</Title>
                  <Description>
                    • Work long hours for mediocre pay
                    <br />
                    • Be trapped in a system that undervalues you
                    <br />
                    • Hope to retire in 50 years after decades of stress
                  </Description>
                  {/* <a href="">
                    <Bad style={{position:"relative"}} className="overflow-hidden flex items-center justify-center text-center w-auto duration-500 transition-all">
                      <ButtonBad className="uppercase duration-500 transition-all">Remain an Employee</ButtonBad>
                    </Bad>
                  </a> */}
                </div>
                {/* vs */}
                <div className="hidden lg:block">
                  <img alt="Versus" loading="lazy" width="82" height="82" decoding="async" data-nimg="1" srcset="	https://www.jointherealworld.com/_next/image?url=%2Fvs.png&w=256&q=75" src="	https://www.jointherealworld.com/_next/image?url=%2Fvs.png&w=256&q=75" style={{color: "transparent"}}/>
                </div>
                {/* left content */}
                <div className="max-w-[320px] pt-2 mt-0">
                  <SubtitleGold >pay</SubtitleGold>
                  <TitleGold>$19.99</TitleGold>
                  <Description>
                    <div className="text-my-white">
                    Unlock the blueprint to a stress-free, high-profit clinic. & Master the business side of dentistry & scale FAST
                    </div>
                  </Description>
                  {/* <a href="">
                    <Good  className="button-container duration-500 transition-all w-full hover:w-[105%] hover:ml-[-2.5%] group">
                      <ButtonGood className="uppercase duration-500 transition-all alt !text-[20px] lg:!text-[22px]">BUILD YOUR DENTAL NETWROK</ButtonGood>
                      <div style={{
                        willChange:"height,width,top,left",position:'absolute'
                      }} className="left-[50%] top-[50%] w-[0px] h-[0px] bg-[#ffffff1a] rounded-full 
                                        group-hover:w-[500px] group-hover:h-[500px] duration-500 transition-all 
                                         pointer-events-none text-center group-hover:left-[calc(50%-250px)] group-hover:top-[calc(50%-250px)]"></div>
                    </Good>
                  </a> */}
                </div>
              </div>
            <CtaButton withSubscribers="true" />
          </Content>
        </div>
      </div>
    </HeroSection>
  );
}

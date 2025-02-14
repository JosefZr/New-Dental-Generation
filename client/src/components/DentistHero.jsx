import { CtaButton, Logo } from "@/components";
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
  background-image: url("/backs/dentist-landing-1.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
`;

const HeroHeading = styled.h1`
  background-color: white;
  text-transform: uppercase;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-text-fill-color: transparent;
  background-image: url("/backs/heading-texture_1heading-texture.webp");
  background-clip: text;
  font-size: 3.88rem;
  font-weight: 600;
  line-height: 1;

  @media screen and (max-width: 991px) {
    font-size: 2.8rem;
    margin-top: 1rem;
  }
  @media screen and (max-width: 591px) {
    font-size: 1.8rem;
    margin-top: 1rem;
  }
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
  gap: 10px;
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

const VideoWrapper = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 600px;
  max-width:340px;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2.3rem;
  position: relative;
  box-shadow: 0 0 0 3px var(--gold), 0 0 0 8px #ffffff3d;

  @media screen and (max-width: ${size.laptop}) {
    width: 100%;
  }
  @media screen and (max-width: ${size.tablet}) {
    box-shadow: none;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const SubParagraph = styled.h2`
  color: var(--whiteGray);
  text-align: center;
  text-transform: none;
  font-family: Inter Variablefont Slnt Wght, sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1;

  @media screen and (max-width: ${size.laptopL}) {
    font-size: 1.6rem;
  }
  @media screen and (max-width: ${size.laptop}) {
    font-size: 1.2rem;
  }
`;

import { useEffect, useState } from "react";

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
export default function DentistHero({ actor }) {
  const heroData = GetHeroData(actor);

  return (
    <HeroSection>
      <div className="relative container-large w-full max-w-7xl">
        <div className="padding-section-medium w-full">
          <Content>
            <Logo />
            <HeroHeading>
              {heroData.map((data, index) => (
                <div key={index}>
                  <h1>
                    {data.title.map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                  </h1>
                </div>
              ))}
            </HeroHeading>
            <SubParagraph>
              {heroData.map((data, index) => (
                <div key={index}>
                  {data.description.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              ))}
            </SubParagraph>
            <VideoWrapper>
              <div className=" ">
                <iframe
                  className="border-none absolute top-0 left-0 w-full h-full"
                  src="https://player.vimeo.com/video/1046354505?h=dc0d9f5e14&autoplay=1&muted=1&loop=1"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                ></iframe>
              </div>
            </VideoWrapper>
            <CtaButton withSubscribers="true" />
          </Content>
        </div>
      </div>
    </HeroSection>
  );
}

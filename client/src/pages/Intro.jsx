import { useEffect, useState } from "react";
import { Loader, NavBar } from "../components";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import { size } from '@/lib/mediaQuerys';
const dropUp = keyframes`
  0% {
    transform: translateY(100%); // Start off-screen above
    opacity: 0;
  }
  100% {
    transform: translateY(0); // Move into place
    opacity: 1;
  }
`;

const Content = styled.div`
  text-align: center;
  margin-top: -2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${dropUp} 0.5s ease-out forwards;
  opacity: 1;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1);
  @media screen and (max-width: ${size.laptop}) {
    margin-top: -2rem;
    margin-left: 40px;
    margin-right: 40px;
  }
`;

const HeroHeading = styled.h1`
  background-color: var(--white);
  text-transform: uppercase;
  -webkit-text-fill-color: transparent;
  background-image: url("../../public/backs/heading-texture_1heading-texture.webp");
  background-clip: text;
  margin-top: 0.5rem;
  font-size: 3.88rem;
  font-weight: 600;
  line-height: 1;
  @media screen and (max-width: ${size.laptop}) {
    font-size: 1.8rem;
  }
`;

const ContentWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubParagraph = styled.button`
    color: var(--white);
    text-align: center;
    text-transform: none;
    -webkit-text-fill-color: inherit;
    background-image: none;
    background-clip: border-box;
    margin-bottom: 0;
    /* font-family: Inter Variablefont Slnt Wght, sans-serif; */
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1;
    @media screen and(max-width: ${size.laptopL}){
      font-size: 1.6rem;
    }
    @media screen and(max-width: ${size.laptop}){
      font-size: 1.2rem;
    }
`;

export default function Intro() {
  const [isFading, setIsFading] = useState(false);
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
    }, 1500);

    const navBarTimer = setTimeout(() => {
      setShowNavBar(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(navBarTimer);
    };
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Loader isFading={isFading} />
      {showNavBar && (
        <main className="main">
          <ContentWrapper>
            <NavBar />
            <Content className="gap-5 ">
              <HeroHeading>{t('identifing')}</HeroHeading>
              <div className=" flex flex-col gap-2 ">
                <SubParagraph className=" cursor-pointer hover:text-gold" onClick={()=>window.location.href="/dentist"}>Dentist</SubParagraph>
                <SubParagraph className=" cursor-pointer hover:text-gold" onClick={()=>window.location.href="/dental-lab"}>Dental Lab</SubParagraph>
                <SubParagraph className=" cursor-pointer hover:text-gold" onClick={()=>window.location.href="/dental-store"}>Dental store</SubParagraph>
              </div>
              <SubParagraph className=" cursor-pointer hover:text-gold" onClick={()=>window.location.href="/patient"}>Patient</SubParagraph>
            </Content>
          </ContentWrapper>
        </main>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { Loader, NavBar } from "../components";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import { size } from '@/lib/mediaQuerys';
import { Link } from "react-router-dom"; // Import Link for navigation

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
// const heroContent = styled.div`
//   text-align: center;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     margin-top: -2rem;
//     margin-left: auto;
//     margin-right: auto;
//     display: flex;
//     @media screen and (max-width: ${size.laptop}) {
//       margin-top: -2rem;
//       margin-left: 40px;
//       margin-right: 40px;
//   }
// `
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
  @media screen and (max-width: ${size.mobileL}) {
    margin-top: -2rem;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const SubParagraph = styled(Link)` // Use Link instead of button
    color: var(--white);
    text-align: center;
    text-transform: none;
    -webkit-text-fill-color: inherit;
    background-image: none;
    background-clip: border-box;
    margin-bottom: 0;
    font-size: 2rem;
    font-weight: 400;
    line-height: 1;
    text-transform: capitalize;
    line-height: 1.25;
    padding: 0.75rem 1.75rem;
    transition: border 0.2s, background-color 0.2s;

    cursor: pointer; // Add cursor style here
    &:hover {
      color: gold; // Change text color on hover
      background-color: #c2c2c22b;
    }
    @media screen and(max-width: ${size.laptopL}) {
      font-size: 1.6rem;
    }
    @media screen and(max-width: ${size.laptop}) {
      font-size: 1.2rem;
    }
`;


export default function Intro() {
  const [isFading, setIsFading] = useState(false);
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    const navBarTimer = setTimeout(() => {
      setShowNavBar(true);
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearTimeout(navBarTimer);
    };
  }, []);

  const { t } = useTranslation();

  return (
    <div className=" bg-black">
      <Loader isFading={isFading} />
      {showNavBar && (
        <main className="main ">
          <div className="intro-wrapper">
            <NavBar/>
            <Content className=" gap-5 ">
              <h1 className=" hero-heading">{t('identifing')}</h1>
              <div className="flex flex-col ">
                <SubParagraph to="/Dentist">dentist</SubParagraph>
                <SubParagraph to="/Dental-lab">dental Lab</SubParagraph>
                <SubParagraph to="/Dental-store">dental Store</SubParagraph>
              </div>
            </Content>
          </div>
        </main>
      )}
    </div>
  );
}

import { GlobalNavbar } from "@/components";
import DentistHero from "@/components/DentistHero";
import { size } from "@/lib/mediaQuerys";
import styled from "styled-components";

const TimeLineSection = styled.section`
    background-image: url("/backs/dentist-landing-2.svg");
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
`
const TitleGrey = styled.div`
  letter-spacing: 3px;
    text-transform: uppercase;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(106deg, #777, #9c9c9c);
    -webkit-background-clip: text;
    background-clip: text;
    font-size: .88rem;
    font-weight: 500;
    line-height: 1;
    display: inline-block;
    @media screen and (max-width: ${size.laptop}) {
      font-size: .9rem;
      text-align: center;
    } 
`
const H2 = styled.h2`
  text-align: center;
    text-transform: uppercase;
    background-image: url(../images/heading-texture_1heading-texture.webp), linear-gradient(125deg, #fff 85%, #fff0);
    background-position: 0 0, 0 0;
    background-size: auto, auto;
    -webkit-background-clip: text;
    background-clip: text;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 2.75rem;
    font-weight: 600;
    text-align: center;
    color: var(--black);
    line-height: 1.1;
    @media screen and (max-width: ${size.tablet}) {
      font-size: 1.8rem;
    } 
`
export default function Dentist() {
  return (
    <>
    <GlobalNavbar/>
    <DentistHero/>
    <TimeLineSection>
      <div className="padding-section-large">
        <div className="padding-global">
          <div className="container-large">
            <div className="w-layout-vflex vflex-center-8">
              <TitleGrey>Connecting dentists, Labs and Stores for smarter collaboration </TitleGrey>
              <H2>YOUR DENTAL NETWORK</H2>
            </div>
          </div>
        </div>
      </div>
    </TimeLineSection>
    </>
      // <div className="content-wrapper">
      //   <Content className="gap-5 ">
      //     <h1 className=" hero-heading">EXCLUSIVE FOR DENTISTS</h1>
      //     
      //   </Content>
      // </div>
      
  )
}

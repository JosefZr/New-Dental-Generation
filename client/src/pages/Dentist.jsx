import { GlobalNavbar, TimeLine } from "@/components";
import DentistHero from "@/components/DentistHero";
import { size } from "@/lib/mediaQuerys";
import styled from "styled-components";

const TimeLineSection = styled.section`
  background-image: url("/backs/dentist-landing-2.svg");
  background-position: 50%;
  background-repeat: repeat;
  background-size: cover;
  position: relative;
  height: 100%; /* Set height relative to the viewport */
`;

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
`;

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
  color: var(--black);
  line-height: 1.1;
  @media screen and (max-width: ${size.tablet}) {
    font-size: 1.8rem;
  } 
`;

const TimeLineGrid = styled.div`
  place-content: center;
  place-items: center;
  width: 100%;
  margin-top: 3rem;
  margin-bottom: 3rem;
  position: relative;
`


const MidleInside = styled.div`
  background-image: linear-gradient(to top, #fff, #ffffff80 55%, #ffffff1f 79%, #fff0);
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%; /* 100% height relative to the parent container */
  display: flex;
  position: relative;
`;

const MiddleSicle = styled.div`
  justify-content: center;
  align-items: center;
  width: 2px;
  height: 2px; /* This could be adjusted based on percentage as needed */
  display: flex;
  position: absolute;
  box-shadow: 0 0 70px 15px #0003;
`;

const IconCercel = styled.div`
  z-index: 3;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1.2rem;
  height: 10%; /* Height now based on percentage relative to the parent container */
  display: flex;
  position: absolute;
`;

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
                <TitleGrey>Connecting dentists, Labs and Stores for smarter collaboration</TitleGrey>
                <H2>YOUR DENTAL NETWORK</H2>
                
                <TimeLineGrid>
                <TimeLine/>

                  {/* <MidleInside>
                    <MiddleSicle>
                      <IconCercel>
                        <img src="/backs/icon.jpg" alt="king" />
                      </IconCercel>
                    </MiddleSicle>
                  </MidleInside> */}
                </TimeLineGrid>
              </div>
            </div>
          </div>
        </div>
      </TimeLineSection>
    </>
  );
}

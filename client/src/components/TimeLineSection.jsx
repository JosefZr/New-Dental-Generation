import { CtaButton, Headers, TimeLine } from "@/components";
import useReveal from "@/hooks/useReveal";
import { size } from "@/lib/mediaQuerys";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const SectionTimeLine = styled.section`
    background-image: url("https://www.jointherealworld.com/revamp/images/cubes-bg.svg");
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    background-color: #02040e;
`;

const TitleGrey = styled.div`
  letter-spacing: .32em;
  text-transform: uppercase;
  background-clip: text;
  font-size: 16px;
  line-height: 16px;
  font-weight: 500;
  line-height: 1;
  display: inline-block;
  
  color: var(--redClaire);
  @media screen and (max-width: ${size.laptop}) {
    font-size: .9rem;
    text-align: center;
  } 
`;

const H2 = styled.h2`
  font-size: 55.5px;
  font-weight: 600;
  line-height: 56px;
  background-color: var(--smallTittle);
  text-align: center;
  text-transform: uppercase;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-text-fill-color: transparent;
  background-image: url(/backs/heading-texture_1heading-texture.webp);
  background-clip: text;
  background-clip: text;
  margin-top: 0;
  margin-bottom: 0;
  color: var(--whiteGray);
  @media screen and (max-width: ${size.tablet}) {
    font-size: 2.2rem;
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
const SubText = styled.p`
  font-size: 1.5rem;
  line-height: 2rem;

  max-width: 90%;
  text-align: center;
  font-weight: 400;
  color: var(--whiteGray);
  padding-bottom: 4rem;
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


// eslint-disable-next-line react/prop-types
export default function TimeLineSection({actor}) {
  const {t} = useTranslation();
  useReveal('vertical');
  useReveal('horizontal');

  return (
    <SectionTimeLine>
          <div className="padding-global " >
            <div className="container-large" >
              <div className="max-sm:w-layout-vflex max-sm:vflex-center-8 items-center text-center ">
                  <SubText >{t(`${actor}.services.subText`)}</SubText>
                  <TitleGrey className="reveal-horizontal-left reveal-vertical ">{t(`${actor}.services.p`)}</TitleGrey>
                  <H2 className="reveal-vertical">YOUR DENTAL NETWORK</H2>
              </div>
            </div>
          </div>
          <TimeLine actor={actor}/>
          <CtaButton className="mt-10" content="JOIN_YDN & SCALE_NOW"/>
          <Headers/>


          {/* <MidleInside>
            <MiddleSicle>
              <IconCercel>
                <img src="/backs/icon.jpg" alt="king" />
              </IconCercel>
            </MiddleSicle>
          </MidleInside> */}
      </SectionTimeLine>
  )
}

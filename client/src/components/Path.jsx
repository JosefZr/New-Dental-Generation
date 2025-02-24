import { CtaBasicCard, CtaHeaders, Vs } from "@/components";

import { Cadre } from "@/components";
import CtaPreniumCard from "@/components/CtaPreniumCard";
import { size } from "@/lib/mediaQuerys";
import styled from "styled-components";

const SectionPath = styled.section`
  position: relative;
  background-image: url("/backs/path.svg");
  background-repeat: repeat;
  background-size: cover;
  background-position: center;
`
const Container = styled.div`
  z-index: 2;
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  position: relative;
`
const PathContent = styled.div`
  text-align: center;
  flex-direction: column;
  align-items: center;
  display: flex;
`
const LinePoint = styled.div`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50.6vw;
    max-width: 46rem;
    display: flex;
`
const LineChoice = styled.div`
  z-index: 2;
  justify-content: space-around;
  flex-direction: row-reverse;
  align-items: flex-start;
  width: 100%;
  display: flex;
  @media screen and (max-width: ${size.laptop}){
    align-items: flex-start;
  }
  @media screen and (max-width: ${size.laptop}){
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    flex-direction: column;
    align-items: center;
    margin-top: 1.5rem;
    position: relative;
  }
`
const PathItem = styled.div`
  z-index: 20;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  flex-direction: column;
  align-items: center;
  width: 26rem;
  display: flex;
  position: relative;
  @media screen and (max-width: ${size.laptop}){
    justify-content: space-between;
  }
  @media screen and (max-width: ${size.tablet}){
    width: 100%;
    max-width: none;
    height: auto;
    margin-top: -1rem;
  }
`
const IconPoint = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: .8rem;
  height: auto;
  display: flex;
  @media screen and (max-width: ${size.tablet}){
    display: none;
    position: absolute;
    inset: 0% auto auto 0%;
  }
`
const GlowLine = styled.div`
  z-index: 0;
  background-image: radial-gradient(circle closest-corner at 50% 50%, var(--black) 70%, #050815);
  opacity: 1;
  filter: blur(8px);
  border-radius: 50vw;
  width: 3rem;
  height: 3rem;
  position: absolute;
  inset: 0% auto auto 0%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: ${size.laptop}){
    opacity: 1;
    filter: blur(14px);
  }
  @media screen and (max-width: ${size.tablet}){
    display: none;
  }
`

// eslint-disable-next-line react/prop-types
export default function Path({GetChecks,actor}) {
  return (
    <SectionPath>
        <div className="padding-global">
          <Container className="container-large">
            <div className="padding-section-medium">
              <PathContent>
                <CtaHeaders actor={actor}/>
                <Cadre actor={actor}/>
                <LinePoint>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 596 31" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                    <path opacity="0.25" d="M0 30.5H596" stroke="var(--white)"></path>
                    <line x1="298.5" x2="298.5" y2="30" stroke="url(#paint0_linear_857_903)"></line>
                    <defs>
                      <linearGradient id="paint0_linear_857_903" x1="297" y1="30" x2="297" y2="0" gradientUnits="userSpaceOnUse">
                        <stop stopColor="var(--white)" stopOpacity="0.25"></stop>
                        <stop offset="1" stopColor="var(--white)" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <line x1="298.5" x2="298.5" y2="30" stroke="var(--white)"></line>
                </LinePoint>
                <LineChoice>
                  <PathItem>
                    <div className=" relative overflow-visible">
                      <IconPoint>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 13 113" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img" >
                          <circle opacity="0.25" cx="6.5" cy="106.5" r="6" stroke="var(--gold)"></circle>
                          <circle opacity="0.25" cx="6.5" cy="106.5" r="1.5" fill="var(--gold)"></circle>
                          <line opacity="0.25" x1="6.5" y1="2.18557e-08" x2="6.5" y2="100" stroke="var(--gold)"></line>
                        </svg>
                        </IconPoint>
                      <GlowLine/>
                    </div>
                      <CtaPreniumCard actor={actor} />
                      {/* <Image src="https://www.jointherealworld.com/revamp/images/CTA-bg.svg">
                      </Image> */}
                  </PathItem>
                  <Vs/>
                  <PathItem>
                    <div className=" relative overflow-visible">
                      <IconPoint>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 13 113" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                          <circle opacity="0.25" cx="6.5" cy="106.5" r="6" stroke="var(--white)"></circle>
                          <circle opacity="0.25" cx="6.5" cy="106.5" r="1.5" fill="var(--white)"></circle>
                          <line opacity="0.25" x1="6.5" y1="2.18557e-08" x2="6.5" y2="100" stroke="var(--white)"></line>
                        </svg>
                      </IconPoint>
                      <GlowLine/>
                    </div>
                    <CtaBasicCard actor={actor} GetChecks={GetChecks}/>
                    
                  </PathItem>
                </LineChoice>
              </PathContent>
            </div>
          </Container>
        </div>
      </SectionPath>
  )
}

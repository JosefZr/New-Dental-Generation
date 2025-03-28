import styled from "styled-components";
import { size } from "@/lib/mediaQuerys";
import CtaButton from "./CtaButton";
import { useTranslation } from "react-i18next";
import { TiWarningOutline } from "react-icons/ti";
import useReveal from "@/hooks/useReveal";

// const Final = styled.section`
//     background-repeat: no-repeat;
//     background-size: cover;
//     background-position:top;
//     position: relative;
//     background-color: #02040e;
// `
// const Increasing = styled.div`
//   grid-column-gap: 1.75rem;
//   grid-row-gap: 1.75rem;
//   color: var(--whiteGray);
//   text-align: center;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 8rem;
//   display: flex;
// `
const IconEmbed = styled.div`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 2.75rem;
    height: 2.5rem;
    display: flex;
`
const H2 = styled.h2`
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
  font-size: 3.5rem;
  font-weight: 600;
  color: var(--whiteGray);
  line-height: 1.1;
@media screen and (max-width: ${size.laptop}) {
    font-size: 1.8rem;
}
@media screen and (max-width: ${size.tablet}) {
  background-image: linear-gradient(125deg, #fff 85%, #fff0);
  background-position: 0 0;
  background-size: auto;
}
`
const H3 = styled.h3`
  font-size: 12px;
  font-weight: 200;
  line-height: 12px;
  letter-spacing: .32em;
  color: #a7a297;
  margin: 0 auto;
  font-family: 'Doawnloawd', sans-serif;
  @media screen and (min-width: 1024px) {
    font-size: 16px;
    line-height: 16px;
  }
`
const P = styled.p`
      font-size: 17px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0.4px;
    color: #ffffffb2;
    font-family: 'Doawnloawd', sans-serif;
    @media screen and (min-width: 1024px) {
        font-size: 20px;
    }
`
// eslint-disable-next-line react/prop-types
export default function FinalSection({actor}) {
  useReveal('vertical');
  useReveal('horizontal');
  return (
        <section className="w-full reveal-vertical mt-0 lg:mt-[120px] mb-[80px] lg:mb-[120px] z-20" style={{position:"relative"}}>
          <div className="z-10 px-4" style={{position:"relative"}}>
            <H3 className="hidden lg:block uppercase text-center">LOCK IN YOUR PRICE</H3>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-4">
              <img alt="Exclusive Features" loading="lazy" width="52" height="47" decoding="async" data-nimg="1" src="https://www.jointherealworld.com/warning.svg" style={{color:"transparent"}}/>
              <H3 className="lg:hidden uppercase text-center mt-1 lg:mt-0">LOCK IN YOUR PRICE</H3>
              <H2 className="uppercase text-center gradient-text texture-text">PRICE INCREASING SOON</H2>
            </div>
              <P className="text-center max-w-[761px] mx-auto mt-4 lg:mt-8 text-pretty">
                <span className="font-bold text-white">The price will be increased to $59 a month shortly.</span>
                <br />
                <br />
                Enjoy a 2-day free trial and explore all the powerful features inside YDN.
                <br />
                <br />
                <span className="font-bold text-white">Lock in your price today before it’s too late!</span>
              </P>
              <div className="flex mx-auto justify-center mt-8"><CtaButton/></div>
              

          </div>
        </section>
  )
}

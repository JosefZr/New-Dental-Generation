import { FaArrowRight } from "react-icons/fa6";
import styled from "styled-components";
import { size } from "@/lib/mediaQuerys";
import CtaButton from "./CtaButton";
import { useTranslation } from "react-i18next";
const Final = styled.section`
    background-image: url("/backs/final.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-size: contain;
    background-position: center;
    position: relative;
`
const Increasing = styled.div`
  grid-column-gap: 1.75rem;
  grid-row-gap: 1.75rem;
  text-align: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8rem;
  display: flex;
`
const IconEmbed = styled.div`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 2.75rem;
    height: 2.5rem;
    display: flex;
`
const H2 = styled.h2`
  text-align: center;
  background-position: 0 0, 0 0;
  background-size: auto, auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: var(--gray);
  margin-top: 0;
  margin-bottom: 0;
  font-family: Clashdisplay Variable, sans-serif;
  font-size: 2.75rem;
  font-weight: 600;
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
export default function FinalSection() {
  const {t} = useTranslation()

  return (
    <Final>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <Increasing>
                <div className="w-layout-vflex vflex-center-8c sm:flex-row gap-5 items-center">
                  <IconEmbed>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 44 40" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                      <path d="M6.39327 39.5977H36.9383C41.7855 39.5977 44.9208 34.1332 42.4937 29.8897L27.2212 3.18263C24.7939 -1.05243 18.538 -1.06931 16.1108 3.18263L0.838301 29.8897C-1.58063 34.1164 1.53059 39.5977 6.39372 39.5977H6.39327ZM21.6658 34.9671C19.6222 34.9671 17.9123 33.2411 17.9123 31.1783C17.9123 29.107 19.6222 27.3894 21.6658 27.3894C23.7093 27.3894 25.4193 29.107 25.4193 31.1783C25.4193 33.2411 23.7093 34.9671 21.6658 34.9671ZM21.7825 7.81366C24.1606 7.88101 26.0448 10.0112 25.853 12.4025L25.0856 21.6978C24.9772 23.0112 23.8929 24.0216 22.5925 24.0216H20.7399C19.4387 24.0216 18.3552 23.0112 18.2468 21.6978L17.4794 12.4025C17.27 9.9187 19.3219 7.7463 21.7825 7.81366Z" fill="currentColor" fillOpacity="0.24"></path>
                    </svg>
                  </IconEmbed>
                  <div className="hflex-center-16">
                    <H2>{t('increasing.title')}</H2>
                  </div>
                </div>
                <div className=" max-w-[35rem] mt-[-.7] mb-0 leading-7 text-black">
                  <p className=" flex flex-row items-center justify-center gap-4 font-medium text-xl">{t('increasing.from')} €14.5 {<FaArrowRight />} €29/{t("increasing.month")}</p>
                  <br />
                  <br />
                  <p className=" font-normal text-my-gray text-2xl">{t("increasing.dentist")}</p>
                  <br />
                  <br />
                  <p className=" flex flex-row items-center justify-center gap-4 font-medium text-xl">{t("increasing.lock")}</p>
                </div>
              <CtaButton/>

              </Increasing>
            </div>
          </div>
        </div>
      </Final>
  )
}

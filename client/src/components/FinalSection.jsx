import styled from "styled-components";
import { size } from "@/lib/mediaQuerys";
import CtaButton from "./CtaButton";
import { useTranslation } from "react-i18next";
import { TiWarningOutline } from "react-icons/ti";

const Final = styled.section`
    background-image: url("/backs/final.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position:top;
    position: relative;
    background-color: var(--blackblue);
`
const Increasing = styled.div`
  grid-column-gap: 1.75rem;
  grid-row-gap: 1.75rem;
  color: var(--whiteGray);
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
  font-size: 3rem;
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
// eslint-disable-next-line react/prop-types
export default function FinalSection({actor}) {
  const {t} = useTranslation()

  return (
        <Final className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium">
              <Increasing>
                <div className="w-layout-vflex vflex-center-8c sm:flex-row gap-5 items-center">
                    <TiWarningOutline className="h-14 w-14"/>
                  <div className="hflex-center-16">
                    <H2>{t(`${actor}.increasing.title`)}</H2>
                  </div>
                </div>
                <div className=" max-w-[35rem] mt-[-.7] mb-0 leading-7 text-my-small-white-title">
                  <h1 className=" flex flex-row items-center justify-center gap-4 font-medium text-xl">{t(`${actor}.increasing.from`)} €14.5/{t(`${actor}.increasing.month`)} {t(`${actor}.increasing.to`)} €29/{t(`${actor}.increasing.month`)}</h1>
                  <br />
                  <br />
                  <p className=" font-normal text-my-white-gray text-2xl">{t(`${actor}.increasing.dentist`)}</p>
                  <br />
                  <br />
                  <p className=" flex flex-row items-center justify-center gap-4 font-medium text-xl">{t(`${actor}.increasing.lock`)}</p>
                </div>
              <CtaButton/>

              </Increasing>
            </div>
          </div>
        </Final>
  )
}

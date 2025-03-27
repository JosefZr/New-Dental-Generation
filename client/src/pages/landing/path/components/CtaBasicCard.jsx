/* eslint-disable react/prop-types */
import { EmployeeBtn } from "@/components"
import styled from "styled-components"
import { FaCheck } from "react-icons/fa6"
import { useTranslation } from "react-i18next"
import { GiLaurels } from "react-icons/gi"
import "../../exclusive/index.css"

export const GetChecks = (actor) => {
  const { t } = useTranslation()

  const transformDescriptionToTable = (description) => {
    return description
      .split(".")
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
  }

  return transformDescriptionToTable(t(`${actor}.plans.free.checks`))
}

const Cta = styled.div`
  width: 100%;
  max-width: 512px; /* Match premium card width */
  background: url(https://www.jointherealworld.com/card1.png);
  background-position: 50%;
  padding: 31px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  border: 1px solid #ffffff1a;
  height: 100%;
  
  @media screen and (min-width: 1024px) {
    min-height: 856px;
  }
`

const IconImbedCustom = styled.div`
  flex-direction: column;
  margin: 0 auto;
  width: 4rem;
  height: 3.125rem;
  display: flex;
`

const H3 = styled.h3`
  margin-top: 8px;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1;
  background: -webkit-linear-gradient(0deg, #fff, hsla(0, 0%, 100%, .61) 70%, hsla(0, 0%, 61%, .6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const BadPrice = styled.div`
  font-family: 'Doawnloawd', sans-serif;
  line-height: 64px;
  letter-spacing: 2px;
  font-size: 32px;
  font-weight: 400;
  color: #ffffff47;
`

const Description = styled.div`
  font-family: 'Doawnloawd', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
  color: #fff;
  padding: 0 32px;
  width: 100%;
  
  @media screen and (min-width: 1024px) {
    font-size: 18px;
    line-height: 22px;
  }
`

const BadP = styled.div`
  text-align: left;
  color: #ffffffa3;
  font-weight: 300;
  flex: 1;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
`

const ChecksContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
`

export default function CtaBasicCard({ actor }) {
  const { t } = useTranslation()
  const checks = GetChecks(actor)

  return (
    <Cta>
      <ContentWrapper>
        <IconImbedCustom>
          <GiLaurels className="h-12 w-auto" />
        </IconImbedCustom>
        <H3>{t(`${actor}.plans.free.title`)}</H3>
        <div className="w-[240px] mx-auto h-[1px] bg-[#383531] mt-8"></div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <BadPrice>Stay an amateur</BadPrice>
        </div>

        <ChecksContainer>
          {checks.map((check, index) => (
            <div key={index} className="w-full justify-start">
              <Description className="flex items-center gap-4 mt-6">
                <FaCheck className="h-5 w-7 flex-shrink-0" />
                <BadP>{check}</BadP>
              </Description>
            </div>
          ))}
        </ChecksContainer>
      </ContentWrapper>

      <div className="text-center w-full mt-[45px]">
        <EmployeeBtn actor={actor} />
      </div>
    </Cta>
  )
}


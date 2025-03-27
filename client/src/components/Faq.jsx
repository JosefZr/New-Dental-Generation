import styled from "styled-components"
import { useTranslation } from "react-i18next"
import useReveal from "@/hooks/useReveal"
import CtaButton from "./CtaButton"

const FaqSection = styled.section`
  position: relative;
  background-repeat: repeat;
  background-size: cover;
  background-position: center;
  background-color: #02040e;
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

const FaqContainer = styled.div`
  max-width: 856px;
  width: 100%;
  margin: 0 auto;
`

const FaqItem = styled.details`
  border-bottom: 1px solid #2d2d2d;
  overflow: hidden;
  
  &:first-child {
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
  }
  
  &:last-child {
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    border-bottom: none;
  }

  summary {
    padding: 1.5rem;
    cursor: pointer;
    position: relative;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &::-webkit-details-marker {
      display: none;
    }
  }
  
  .faq-content {
    padding: 0 1.5rem 1.5rem 1.5rem;
    color: #d1d1d1;
    line-height: 1.6;
  }
`

const QuestionText = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
  color: white;
  flex: 1;
  padding-right: 1rem;
`

export const GetData = (actor) => {
  const { t } = useTranslation()

  const transformDescriptionToTable = (description) => {
    return description
      .split(".")
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
  }

  return transformDescriptionToTable(t(`${actor}.plans.free.checks`))
}

// New function to format the response text with line breaks after periods
const formatResponseText = (text) => {
  // Split by period followed by optional space
  const sentences = text.split(/(?<=\.)\s*/).filter(s => s.trim().length > 0);
  
  return sentences.map((sentence, index) => (
    <span key={index}>
      {sentence.trim()}
      {/* Add line break if not the last sentence and sentence ends with a period */}
      {index < sentences.length - 1 && sentence.endsWith('.') && <br />}
    </span>
  ));
};
export default function Faq() {
  const { t } = useTranslation()
  useReveal('vertical');
  useReveal('horizontal');
  const faqs = t("faq", { returnObjects: true })

  return (
    <FaqSection className="w-full py-16">
      <div className="z-10 flex flex-col items-center px-4 " style={{ position: "relative" }}>
        <H3 className="uppercase text-center pb-4 reveal-vertical">STILL THINKING?</H3>
        <h2 className="text-center mb-8 uppercase reveal-horizontal-right">
          <span className="gradient-text text-2xl font-semibold text-[55.5px] leading-[56px] max-[440px]:text-[30px] max-[440px]:leading-[30px]">
            {t("faqTitle", "Frequently Asked Questions")}
          </span>
        </h2>

        <FaqContainer className="fade-in visible reveal-vertical">
          <div className="rounded-xl border border-gray-800 bg-transparent overflow-hidden">
            {Object.values(faqs).map((faq, index) => (
              <FaqItem
                className="group"
                key={index}
                open={index === 0}
              >
                <summary>
                  <QuestionText>{faq.question}</QuestionText>
                  <span className="relative size-5 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="faq-content">
                  <p className="leading-relaxed text-gray-200">
                    {formatResponseText(faq.responde)}
                  </p>
                </div>
              </FaqItem>
            ))}
          </div>
        </FaqContainer>
      </div>
     <div className="flex mx-auto justify-center mt-8"><CtaButton/></div>
    </FaqSection>
  )
}
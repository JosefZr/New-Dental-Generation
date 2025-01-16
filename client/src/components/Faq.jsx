import styled from "styled-components";
import { useTranslation } from "react-i18next"; // Assuming you're using `react-i18next`

const FaqSection = styled.section`
  position: relative;
  background-image: url("/backs/HeadlinePath.svg");
  background-repeat: repeat;
  background-size: cover;
  background-position: center;
`;

export default function Faq() {
  const { t } = useTranslation();

  // FAQ data dynamically fetched from translations
  const faqs = t("faq", { returnObjects: true });

  return (
    <FaqSection className="padding-global bg-transparent">
      <div className="container-large">
        <div className="padding-section-large">
          <h2 className="text-center mb-8 uppercase">
            <span className="gradient-text lg:text-[55.5px] lg:font-semibold leading-[56px]">
              {t("faqTitle", "Frequently Asked Questions")}
            </span>
          </h2>
          <div className="divide-y rounded-xl border divide-gray-800 border-gray-800 bg-transparent max-w-5xl mx-auto">
            {Object.values(faqs).map((faq, index) => (
              <details
                className="group p-6 [&_summary::-webkit-details-marker]:hidden"
                key={index}
                open={index === 0} // Open the first FAQ by default
              >
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-white">
                  <h2 className="text-lg font-medium">{faq.question}</h2>
                  <span className="relative size-5 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
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
                      className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
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
                <p className="mt-4 leading-relaxed text-gray-200">{faq.responde}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </FaqSection>
  );
}

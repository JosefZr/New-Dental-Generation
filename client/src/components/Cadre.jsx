import useReavealUp from "@/hooks/useReveal";
import useReveal from "@/hooks/useRevealUp";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Wrap = styled.div`
  width: 100%;
  margin-top: 1rem;
  overflow: visible;

  &.reveal-up {
    opacity: 0; /* Initially hidden */
  }

  &.reveal-up.activation {
    animation: dropUp 0.5s ease-out forwards;
  }
`;

export default function Cadre() {
  const { t } = useTranslation();
  
  // Hook to trigger the animation
  useReveal('up');

  return (
    <Wrap className="reveal-up">
      <div className="outer">
        <div className="dot"></div>
        <div className="card">
          <div className="ray"></div>
          <div className="text"></div>
          <div className="max-w-[80%]">{t("plans.table")}</div>
          <div className="line topl"></div>
          <div className="line leftl"></div>
          <div className="line bottoml"></div>
          <div className="line rightl"></div>
        </div>
      </div>
    </Wrap>
  );
}

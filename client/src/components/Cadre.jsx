import useReveal from "@/hooks/useRevealUp";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { MdPhonelink } from "react-icons/md";
const Wrap = styled.div`
  margin-top: 1rem;
  overflow: visible;
  margin: 0 auto;

  &.reveal-up {
    opacity: 0; /* Initially hidden */
  }

  &.reveal-up.activation {
    animation: dropUp 0.5s ease-out forwards;
  }
`;

// eslint-disable-next-line react/prop-types
export default function Cadre({actor}) {
  const {t}= useTranslation()
  // Hook to trigger the animation
  useReveal('vertical');

  return (
    <Wrap className="reveal-vertical">
      <div className="outer">
        <div className="dot"></div>
        <div className="card">
          <MdPhonelink className=" w-10 h-10"/>
          <div className="ray"></div>
          <div className="text "></div>
          <div className="max-[991px]:text-2xl max-w-[82%]">{t(`${actor}.plans.table`)}</div>
          <div className="line topl"></div>
          <div className="line leftl"></div>
          <div className="line bottoml"></div>
          <div className="line rightl"></div>
        </div>
      </div>
    </Wrap>
  );
}

import styled from "styled-components";
import { Subscribers } from ".";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { size } from "@/lib/mediaQuerys";

const ButtonWrap = styled.div`
  z-index: 5;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 0.75rem;
`;

const StyledButton = styled.button`
  /* Base Variables */
  --main-color: #a9464d;
  --main-bg-color: #bc1823;
  --pattern-color: rgba(255, 255, 255, 0.03);
  
  /* Base Styles */
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: clamp(0.06rem, 2vw, 0.2rem);
  line-height: 1;
  filter: hue-rotate(0deg);
  
  /* Complex Background */
  background: 
    radial-gradient(
      circle,
      var(--main-bg-color) 0%,
      rgba(0, 0, 0, 0) 95%
    ),
    linear-gradient(var(--pattern-color) 1px, transparent 1px),
    linear-gradient(to right, var(--pattern-color) 1px, transparent 1px);
  background-size: 
    cover,
    15px 15px,
    15px 15px;
  background-position: 
    center center,
    center center,
    center center;
    
  /* Border Styling */
  border-image: radial-gradient(
    circle,
    var(--main-color) 0%,
    rgba(0, 0, 0, 0) 100%
  ) 1;
  border-width: 1px 0 1px 0;
  
  /* Text Styling */
  color: var(--white);
  font-weight: 700;
  font-size: clamp(0.75rem, 3vw, 1rem);
  
  /* Size & Spacing */
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 4vw, 3rem);
  width: fit-content;

  /* Transitions */
  transition: all 0.2s ease-in-out;
  
  /* Hover Effect */
  &:hover {
    background-size: 
      cover,
      10px 10px,
      10px 10px;
  }
  
  /* Active Effect */
  &:active {
    filter: hue-rotate(50deg);
  }
   @media screen and (max-width: ${size.mobileS}) {
        letter-spacing:normal;

    }
`;

export default function CtaButton({ withSubscribers = "false" }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <ButtonWrap>
      <StyledButton onClick={() => navigate("/sign-up")}>
        { t('cta') }
      </StyledButton>
      {withSubscribers === "true" && <Subscribers />}
    </ButtonWrap>
  );
}
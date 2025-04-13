import styled from "styled-components";
import { Subscribers } from ".";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { size } from "@/lib/mediaQuerys";

const ButtonWrap = styled.div`
  z-index: 100;
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

export default function CtaButton({ 
  content, 
  defaultAction = true,  // Changed default to false
  withSubscribers = "false", 
  onClick  // Added onClick prop for custom handlers
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isPixelLoaded = () => {
    return typeof window !== 'undefined' && 
           window.fbq && 
           window.fbq.loaded === true;
  };
  
  const handleClick = (e) => {
    // Meta Pixel tracking
    if (isPixelLoaded() && !e.target.dataset.pixelFired) {
      e.target.dataset.pixelFired = true;
      
      window.fbq('track', 'Lead', {
        content_category: 'CTA Click',    // snake_case
        content_name: 'Main CTA Button',   // snake_case
        value: 0.00,
        currency: 'USD',
        page_path: window.location.pathname,
      });

      setTimeout(() => {
        e.target.dataset.pixelFired = false;
      }, 1000);
    }
      
    if (onClick) {
      onClick(e); // Use custom handler if provided
    }
    
    // Only navigate if defaultAction is explicitly true
    if (defaultAction) {
      navigate("/sign-up");
    }
  };

  return (
    <ButtonWrap>
      <StyledButton onClick={handleClick}>
        {content ? content : t('cta')}
      </StyledButton>
      {withSubscribers === "true" && <Subscribers />}
    </ButtonWrap>
  );
}
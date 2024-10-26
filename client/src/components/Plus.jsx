import styled from "styled-components";

const Icon = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 5rem; /* Increased size */
  height: 5rem; /* Increased size */
  margin-bottom: 2rem;
  display: flex;
  margin: 0 auto;
  padding-bottom: 10px;
`;

export default function Plus() {
  return (
    <Icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 40 40"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        role="img"
      >
        <circle
          opacity="0.2"
          cx="20"
          cy="20"
          r="19.25"
          stroke="#BC9C22" /* Changed to gold */
          strokeWidth="1.5"
        ></circle>
        <path
          opacity="0.9"
          d="M20 16V24M16 20H24M30 20C30 25.5228 25.5228 30 20 30C14.4772 30 10 25.5228 10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20Z"
          stroke="#BC9C22" /* Changed to gold */
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear_854_872"
            x1="20"
            y1="2"
            x2="20"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#BC9C22" stopOpacity="0"></stop>
            <stop offset="1" stopColor="#BC9C22"></stop>
          </linearGradient>
          <linearGradient
            id="paint1_linear_854_872"
            x1="20"
            y1="10"
            x2="20"
            y2="32.25"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#BC9C22" stopOpacity="0"></stop>
            <stop offset="1" stopColor="#BC9C22"></stop>
          </linearGradient>
        </defs>
      </svg>
    </Icon>
  );
}

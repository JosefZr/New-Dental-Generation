import styled, { keyframes } from "styled-components"
import { MdGroups } from "react-icons/md";
import { FaCheck} from "react-icons/fa";
import { size } from "@/lib/mediaQuerys";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaMoneyBillTrendUp, FaRegChessKnight, FaRegChessQueen } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import useReveal from "@/hooks/useReveal";
// Timeline Data

export const GetTimelineData = ( ) => {
  const { t } = useTranslation();

  const transformDescriptionToTable = (description) => {
    // Split the description by '.' and filter out any empty strings
    return description
      .split('.')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  };

  return [
    {
      logo: <MdGroups className="h-10 w-12" />,
      left: "/images/1.svg",
      title: t("services.content.private.title"),
      descriptions: transformDescriptionToTable(t("services.content.private.description")),
    },
    {
      logo: <FaRegChessKnight className="h-10 w-12" />,
      left: "/images/2.svg",
      title: t("services.content.plan.title"),
      descriptions: transformDescriptionToTable(t("services.content.plan.description")),
    },
    {
      logo: <GiTakeMyMoney className="h-10 w-12" />,
      left: "/images/3.svg",
      title: t("services.content.finance.title"),
      descriptions: transformDescriptionToTable(t("services.content.finance.description")),
    },
    {
      logo: <FaRegChessQueen className="h-10 w-12" />,
      left: "/images/5.svg",
      title: t("services.content.opportunity.title"),
      descriptions: transformDescriptionToTable(t("services.content.opportunity.description")),
    },
    {
      logo: <FaRegChessKnight className="h-10 w-12" />,
      left: "/images/4.svg",
      title: t("services.content.courses.title"),
      descriptions: transformDescriptionToTable(t("services.content.courses.description")),
    },
    {
      logo: <FaMoneyBillTrendUp className="h-10 w-12" />,
      left: "/images/6.svg",
      title: t("services.content.growth.title"),
      descriptions: transformDescriptionToTable(t("services.content.growth.description")),
    },
  ];
};


const TimelineGrid = styled.div`
  grid-column-gap: 0px;
  grid-row-gap: 1rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: 1fr;
  place-content: center;
  place-items: center;
  width: 100%;
  margin-bottom: 3rem;
  display: grid;
  position: relative;
  @media screen and (max-width: ${size.laptop}){
    grid-template-columns: 1fr;
    padding-left: 1.25rem;
  }
  @media screen and (max-width: ${size.mobileL}){
    width: 80%;
    margin: 0 auto;
  }
  @media screen and (max-width: ${size.mobileM}){
    margin: 0 auto;
  }
`

const CloudSVG = styled.svg`
  position: absolute;
  width: min-content; // Adjust size to your preference
  height: auto;
  z-index: 1; // Ensure it's behind the content
  opacity: 0.05; // Make it semi-transparent for a shadow effect
  filter: blur(15px); // Add a blur effect for a softer shadow
`;

const floatAnimation = keyframes`
0% { transform: translate(0,  0px); }
    50%  { transform: translate(0, 15px); }
    100%   { transform: translate(0, -0px); }    
`;
const TimelineLeftWrap = styled.div`
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  background-position: center;
  background-image: ${({ bg }) => `url(${bg})`};
  background-size: contain; 
  background-repeat: no-repeat;
  background-attachment: local;
  flex-direction: row;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: 1fr;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 36.25rem;
  height: 25rem;
  display: flex;
  position: relative;
  animation: ${floatAnimation} 6s ease-in-out infinite; 
  @media screen and (max-width: ${size.mobileL}){
    width:80%
  }
`

const TimelineLeft = styled.div`
  border-radius: 7px;
  justify-content: flex-end;
  height: 100%;
  position: relative;
  @media screen and (max-width: ${size.laptop}){
    transform: translate(0);
  }
  @media screen and (max-width: ${size.tablet}){
    display: none;
    width: 100%;
    min-width: 100%;
    height: auto;
    min-height: 18rem;
  }
`
const TimelineRightWrap = styled.div`
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-left: 3.5rem;
  padding-right: 2.5rem;
  display: flex;  
  @media screen and (max-width: ${size.laptopM}){
    padding-left: 0rem;
    padding-right: 0rem;
    width: 90%;
    margin:0 auto;
  }
`
const TimelineContent = styled.div`
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  flex-direction: column;
  padding-left: 3.5rem;
  padding-right: 2.5rem;
  display: grid;
  @media screen and (max-width: ${size.laptop}){
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

`;

const Title = styled.div`
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
  flex-direction: row;
  align-items: center;
  display: flex;
  color: var(--gray);
`;

const Logo = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
  display: flex;
`;

const H3 = styled.div`
  background-clip: text;
  margin-top: 0;
  margin-bottom: 0;
  font-family: Clashdisplay Variable, sans-serif;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;z-index: 5;
`;

const TimelineItem = styled.div`
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  grid-auto-columns: 1fr;
  display: grid;
`;

const TimelineItemCheck = styled.div`
  grid-column-gap: 0.8rem;
  grid-row-gap: 0.8rem;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  background-color: #ffffffb4;
  border: 1px solid black;
  border-radius: 100vw;
  align-items: center;
  max-width: 34rem;
  padding: 0.7rem 1rem 0.7rem 1.5rem;
  font-size: 1.13rem;
  transition: background-color 0.2s;
  flex-direction: row;
  align-items: center;
  display: flex;
  @media screen and (max-width: ${size.laptop}){
    font-size: 1rem;
  }
`;

const Check = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1.625rem;
  height: 1.1875rem;
  display: flex;
  @media screen and (max-width: ${size.laptop}){
    flex: none;
    width: 1.4rem;
    height: auto;
  }
`;

const P = styled.p`
  color: var(--black);
  margin-bottom: 0;
  line-height: 1.6;
`;
export default function TimeLine() {
  useReveal('horizontal');
  const timeline = GetTimelineData();
  return (
    <div className=" mx-auto">
      {timeline.map((data, index) => (
        <TimelineGrid key={index}>
          {data.left && (
            <TimelineLeftWrap bg={data.left}>
                  <CloudSVG
                viewBox="0 0 220 130" // Adjust viewBox for a larger cloud
                style={{
                  top: '40%', // Position the first cloud
                  left:'70%', // Position the first cloud
                  transform: 'translate(-50%, -50%)', // Center it
                }}
              >
                <path
                  d="M55 100C35 100 25 90 20 80C15 75 10 70 10 60C10 50 20 45 25 50C20 45 20 40 30 35C30 30 40 30 45 35C50 30 60 30 65 40C70 35 80 30 85 30C90 30 100 40 100 45C100 50 90 55 85 55C90 60 100 70 85 80C70 90 55 100 55 100Z"
                  fill="var(--gold)" // Use the specified gold color
                />
              </CloudSVG>
              {/* Second Cloud */}
              <CloudSVG
                viewBox="0 0 220 130" // Adjust viewBox for a larger cloud
                style={{
                  top: '60%', // Position the second cloud slightly lower
                  left: '100%', // Position the second cloud slightly to the right
                  transform: 'translate(-50%, -50%)', // Center it
                }}
              >
                <path
                  d="M55 100C35 100 25 90 20 80C15 75 10 70 10 60C10 50 20 45 25 50C20 45 20 40 30 35C30 30 40 30 45 35C50 30 60 30 65 40C70 35 80 30 85 30C90 30 100 40 100 45C100 50 90 55 85 55C90 60 100 70 85 80C70 90 55 100 55 100Z"
                  fill="var(--gold)" // Use the specified gold color
                />
              </CloudSVG> {/* Add the cloud SVG here */}
              <TimelineLeft />
              
            </TimelineLeftWrap>
          )}

          <TimelineRightWrap>
            <TimelineContent>
            <Title>
              <Logo>{data.logo}</Logo>
              <H3 className="reveal-horizontal-left">{data.title}</H3>
            </Title>
            <TimelineItem>
              {data.descriptions.map((des, i) => (
                <TimelineItemCheck key={i}>
                  <Check>
                    <FaCheck />
                  </Check>
                  <P>{des+"."}</P>
                </TimelineItemCheck>
              ))}
            </TimelineItem>
            </TimelineContent>
          </TimelineRightWrap>
        </TimelineGrid>
      ))}
    </div>
  );
}
// /* eslint-disable react/prop-types */
// import { useEffect, useRef, useState } from "react";
// import { styled } from "styled-components";
// import { FaCheck} from "react-icons/fa";
// import { MdGroups } from "react-icons/md";
// import { GiTakeMyMoney } from "react-icons/gi";
// import { FaRegChessKnight, FaRegChessQueen, FaMoneyBillTrendUp } from "react-icons/fa6";
// import TimelineObserver from "react-timeline-animation";
// import "./timeline.css";
// const TimeLineGrid = styled.div`
//   width: 600px;
//   display:flex;
//   flex-direction: column;
//   gap: 20px;
// `
// const TimelineContent = styled.div`
//   grid-column-gap: 1rem;
//   grid-row-gap: 1rem;
//   flex-direction: column;
//   padding-left: 3.5rem;
//   padding-right: 2.5rem;
//   display: grid;
// `;

// const Title = styled.div`
//   grid-column-gap: 0.5rem;
//   grid-row-gap: 0.5rem;
//   flex-direction: row;
//   align-items: center;
//   display: flex;
// `;

// const Logo = styled.div`
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 2.4rem;
//   height: 40px;
//   margin-right: 4px;
//   display: flex;
// `;

// const H3 = styled.div`

//   background-clip: text;
//   margin-top: 0;
//   margin-bottom: 0;
//   font-family: Clashdisplay Variable, sans-serif;
//   font-size: 2rem;
//   font-weight: 600;
//   line-height: 1.2;
// `;

// const TimelineItem = styled.div`
//   grid-column-gap: 8px;
//   grid-row-gap: 8px;
//   grid-template-rows: auto;
//   grid-template-columns: 1fr;
//   grid-auto-columns: 1fr;
//   display: grid;
// `;

// const TimelineItemCheck = styled.div`
//   grid-column-gap: 0.8rem;
//   grid-row-gap: 0.8rem;
//   -webkit-backdrop-filter: blur(2px);
//   backdrop-filter: blur(2px);
//   background-color: #ffffffb4;
//   border: 1px solid black;
//   border-radius: 100vw;
//   align-items: center;
//   max-width: 34rem;
//   padding: 0.7rem 1rem 0.7rem 1.5rem;
//   font-size: 1.13rem;
//   transition: background-color 0.2s;
//   flex-direction: row;
//   align-items: center;
//   display: flex;
// `;

// const Check = styled.div`
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 1.625rem;
//   height: 1.1875rem;
//   display: flex;
// `;

// const P = styled.p`
//   color: var(--black);
//   margin-bottom: 0;
//   line-height: 1.6;
// `;

// // Timeline data


// // Styled components (keep your existing styled components here)

// const Timeline = ({ setObserver, callback }) => {
//   const [progress, setProgress] = useState(0);
//   const [triggeredItems, setTriggeredItems] = useState(Array(timelineData.length).fill(false));

//   const timelineRef = useRef(null);
//   const wrapperRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (wrapperRef.current) {
//         const { top, height } = wrapperRef.current.getBoundingClientRect();
//         const windowHeight = window.innerHeight;
//         const scrollProgress = Math.max(
//           0,
//           Math.min(1, (windowHeight - top) / (height + windowHeight))
//         );
//         setProgress(scrollProgress);

//         timelineData.forEach((_, index) => {
//           if (
//             !triggeredItems[index] &&
//             scrollProgress > (index + 1) / (timelineData.length + 1)
//           ) {
//             setTriggeredItems((prev) => {
//               const newTriggered = [...prev];
//               newTriggered[index] = true;
//               return newTriggered;
//             });
//             callback();
//           }
//         });
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [triggeredItems, callback]);

//   useEffect(() => {
//     if (timelineRef.current) {
//       setObserver(timelineRef.current);
//     }
//   }, [setObserver]);

//   return (
//     <div className="timeline-wrapper" ref={wrapperRef}>
//       <div className="timeline-progress" />
//       <div className="timeline" ref={timelineRef} style={{ height: `${progress * 100}%` }} />
//       <div className="timeline-icon" style={{ top: `${progress * 100}%` }}>
//         <img src="/backs/icon.jpg" alt="Timeline Icon" className="text-black" />
//       </div>
//       <TimeLineGrid>
//       {timelineData.map((item, index) => (
//         <TimelineContent key={index} className={triggeredItems[index] ? "message visible" : "message"} style={{ top: `${(index + 1) / (timelineData.length + 1) * 100}%` }}>
//           <Title>
//             <Logo>{item.logo}</Logo>
//             <H3>{item.title}</H3>
//           </Title>
//           <TimelineItem>
//             {item.descriptions.map((des, desIndex) => (
//               <TimelineItemCheck key={desIndex}>
//                 <Check>
//                   <FaCheck />
//                 </Check>
//                 <P>{des}</P>
//               </TimelineItemCheck>
//             ))}
//           </TimelineItem>
//         </TimelineContent>
//       ))}
//       </TimeLineGrid>
//     </div>
//   );
// };

// export default function App() {
//   const onCallback = () => {
//     console.log("Timeline item revealed");
//   };

//   return (
//     <div className="App">
//       <TimelineObserver
//         initialColor="var(--gray)"
//         handleObserve={(setObserver) => <Timeline callback={onCallback} setObserver={setObserver} />}
//       />
//       <div className="bottom-spacer" />
//     </div>
//   );
// }
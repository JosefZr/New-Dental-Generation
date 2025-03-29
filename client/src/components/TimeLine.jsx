import styled, { keyframes } from "styled-components"
import { size } from "@/lib/mediaQuerys";
import { useTranslation } from "react-i18next";
import useReveal from "@/hooks/useReveal";
import { FaCheck, FaUsers} from "react-icons/fa";
import { TbSettingsDollar } from "react-icons/tb";
import { GoGoal } from "react-icons/go";
import ReactMarkdown from 'react-markdown';
import '../styles/fonts.css';

// Timeline Data

export const GetTimelineData = ( actor) => {
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
        logo: <TbSettingsDollar className="h-10 w-12" />,
        left: "/images/7.webp",
        title: t(`${actor}.services.content.manage.title`),
        descriptions: transformDescriptionToTable(t(`${actor}.services.content.manage.description`)),
      },
      {
        logo: <GoGoal className="h-10 w-12" />,
        left: "/images/9.webp",
        title: t(`${actor}.services.content.cheat.title`),
        descriptions: transformDescriptionToTable(t(`${actor}.services.content.cheat.description`)),
      },
      {
        logo: <FaUsers className="h-10 w-12" />,
        left: "/images/8.webp",
        title: t(`${actor}.services.content.network.title`),
        descriptions: transformDescriptionToTable(t(`${actor}.services.content.network.description`)),
      },
    ];
  }


const TimelineGrid = styled.div`
  grid-column-gap: 0px;
  grid-row-gap: 1rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: 1fr;
  place-content: center;
  place-items: center;
  width: 100%;
  margin: 0 auto;
  max-width: 80rem;
  display: grid;
  position: relative;
  padding-bottom:0px ;
  @media screen and (max-width: ${size.laptop}){
    grid-template-columns: 1fr;
    padding-left: 1.25rem;
  }
  @media screen and (max-width: ${size.mobileL}){
    width: 100%;
    margin: 0 auto;
  }
  @media screen and (max-width: ${size.mobileM}){
    margin: 0 auto;
  }
`

const CloudSVG = styled.svg`
  position: absolute;
  background-color: transparent; /* Make sure the SVG background is transparent */

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
  flex-direction: row;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: 1fr;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 36.25rem;
  margin-top:2rem;
  height: 22rem;
  display: flex;
  position: relative;
  animation: ${floatAnimation} 6s ease-in-out infinite; 
  @media screen and (max-width: ${size.mobileL}){
    width:100%;
    margin-top:0rem;
    height: 15rem;
  }
`

const TimelineLeft = styled.div`
display: flex;
    border-radius: 7px;
    justify-content: center;
    height: 45rem;
    width: 100%;
    z-index: 19;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    background-attachment: local;
    flex-direction: row;
  background-image: ${({ bg }) => `url(${bg})`};

  @media screen and (max-width: ${size.laptop}){
    transform: translate(0);
    height: 35rem;

  }
  @media screen and (max-width: ${size.tablet}){
    width: 100%;
    min-width: 100%;
    min-height: 30rem;
  }
`
const Shadow = styled.div`
    opacity: .5;
    width: 1000px;
    height: 1000px;
    position: absolute;
    pointer-events: none;
    background: radial-gradient(42.52% 42.52% at 50% 26.25%, rgba(255, 207, 35, .15) 0, transparent 60%);
`
const TimelineRightWrap = styled.div`
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  flex-direction: column;
  width: 100%;
  padding-left: 3.5rem;
  padding-right: 2.5rem;
  display: flex;  
  @media screen and (max-width: ${size.laptop}){
    align-items: center;

  }
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
  /* padding-left: 3.5rem;
  padding-right: 2.5rem; */
  display: grid;
  @media screen and (max-width: ${size.laptop}){
    /* padding-left: 1.5rem;
    padding-right: 1.5rem; */
  }

`;

const Title = styled.div`
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
  flex-direction: row;
  align-items: center;
  display: flex;
  color: var(--white);
`;

const Logo = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
  display: flex;
`;

const H3 = styled.div`
-webkit-text-fill-color: transparent;
    background-image: linear-gradient(165deg, #fff 35%, #fff3);
    -webkit-background-clip: text;
    background-clip: text;
    margin-top: 0;
    margin-bottom: 0;
    font-family: 'cg', sans-serif;
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.2;
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
  background-color: #ffffff12;
  border: 1px solid #ffffff36;
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
  color: var(--white);
  @media screen and (max-width: ${size.laptop}){
    flex: none;
    width: 1.4rem;
    height: auto;
  }
`;

const P = styled.div`
  color: #ffffffb2;
  margin-bottom: 0;
  line-height: 1.6;
  font-family: 'Doawnloawd', sans-serif;
  /* Style for HTML strong tags */
  strong {
    color: white;
    font-weight: 600;
  }
`;
// eslint-disable-next-line react/prop-types
export default function TimeLine({actor}) {
  useReveal('horizontal');
  const timeline = GetTimelineData(actor);
  return (
    <div className=" mx-auto my-12">
      {timeline.map((data, index) => (
        <TimelineGrid key={index}>
          {data.left && (
            <TimelineLeftWrap >
              <Shadow className="hidden lg:block newglow left-[-200px] z-0 top-0"> </Shadow>
              <TimelineLeft bg={data.left}/>
            </TimelineLeftWrap>
          )}
          <TimelineRightWrap>
            <TimelineContent>
            <Title className="reveal-horizontal-left">
              <Logo>{data.logo}</Logo>
              <H3 >{data.title}</H3>
            </Title>
            <TimelineItem>
              {data.descriptions.map((des, i) => (
                <TimelineItemCheck key={i}>
                  <Check>
                    <FaCheck />
                  </Check>
                  <P><ReactMarkdown>{des+"."}</ReactMarkdown></P>
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
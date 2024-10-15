// import { styled } from "styled-components";
// import { FaCheck, FaChessKnight, FaChessQueen, FaMoneyBill } from "react-icons/fa";
// import { MdGroups } from "react-icons/md";
// import { GiTakeMyMoney } from "react-icons/gi";
// import { FaRegChessKnight, FaRegChessQueen, FaMoneyBillTrendUp } from "react-icons/fa6";

// // Data for timeline messages
// const timelineData = [
//   {
//     logo: <MdGroups />,
//     title: "Private Dental Community",
//     descriptions: [
//       "Full privacy: A secure and private space for dental professionals.",
//       "Professional connections: Connect with dentists for advice, collaboration, or help.",
//       "Online marketplace: Compare prices and order materials from multiple stores."
//     ]
//   },
//   {
//     logo: <FaRegChessKnight />,
//     title: "Plan Like a Pro",
//     descriptions: [
//       "Daily planning: Easily schedule tasks and patient appointments.",
//       "Supply management: Track and manage your dental materials."
//     ]
//   },
//   {
//     logo: <GiTakeMyMoney />,
//     title: "Manage Your Finances",
//     descriptions: [
//       "Expense tracking: Monitor material costs.",
//       "Income management: Track your earnings daily, weekly, or yearly.",
//       "Payment reminders: Track patients and payments with automatic reminders."
//     ]
//   },
//   {
//     logo: <FaRegChessQueen />,
//     title: "Top Dentist Opportunity",
//     descriptions: [
//       "Explore top-level opportunities and recognition in your field."
//     ]
//   },
//   {
//     logo: <FaRegChessKnight />,
//     title: "Advanced Dental Courses",
//     descriptions: [
//       "Learn more: Courses in English and specialized topics like Implant Dentistry with French, Arabic subtitles.",
//       "Dental News: Get the latest trends and news in the dental world."
//     ]
//   },
//   {
//     logo: <FaMoneyBillTrendUp />,
//     title: "Business Growth Support",
//     descriptions: [
//       "Expert help to grow your online presence and social media, with special pricing."
//     ]
//   }
// ];


// const TimelineContent = styled.div`
//   grid-column-gap: 1rem;
//   grid-row-gap: 1rem;
//   flex-direction: column;
//   width: 100%;
//   padding-left: 3.5rem;
//   padding-right: 2.5rem;
//   display: flex;
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
//   -webkit-text-fill-color: transparent;
//   background-image: linear-gradient(165deg, #fff 35%, #fff3);
//   -webkit-background-clip: text;
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
//   background-color: #ffffff12;
//   border: 1px solid #ffffff36;
//   border-radius: 100vw;
//   align-items: center;
//   max-width: 34rem;
//   padding: 0.7rem 1rem 0.7rem 1.5rem;
//   font-size: 1.13rem;
//   transition: background-color 0.2s;
//   flex-direction: row;
//   align-items: flex-start;
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

// const getIcon = (iconName) => {
//   switch (iconName) {
//     case "MdGroups":
//       return <MdGroups />;
//     case "FaRegChessKnight":
//       return <FaChessKnight />;
//     case "GiTakeMyMoney":
//       return <GiTakeMyMoney />;
//     case "FaRegChessQueen":
//       return <FaChessQueen />;
//     case "FaMoneyBillTrendUp":
//       return <FaMoneyBill />;
//     default:
//       return null;
//   }
// };

// export default function TimeLine() {
//   return (
//     <>
//       {timelineData.map((item, index) => (
//         <TimelineContent key={index}>
//           <Title>
//             <Logo>{item.logo && getIcon(item.logo)}</Logo>
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
//     </>
//   );
// }
import React from 'react'

export default function RightTimelineContent() {
  return (
    <div>RightTimelineContent</div>
  )
}

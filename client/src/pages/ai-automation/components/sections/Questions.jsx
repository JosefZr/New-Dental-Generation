import styled from "styled-components";
import WideLeftShades from "../Shades/WideLeftShades";
import WideRightShades from "../Shades/WideRightShades";
import SmallLeftContent from "../SmallLeftContent";
const Special = styled.h1`
    color: hsla(0, 0%, 100%, .21);
    font-size: 15px;
    line-height: 30px;
    letter-spacing: -3%;
`
export default function Questions() {
  return (
    <div  style={{position:"relative",fontFamily:"'Funnel Display', sans-serif"}}>
        <div className="w-full border-b-[1px] border-b-[#2b3340] block">
            <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340] " style={{position:"relative"}}>
                <WideLeftShades/>
                <div className="border-x-[1px] border-[#2b3340]">
                    <div className="lg:p-[60px] p-2 w-full" style={{position:"relative"}}>
                        <div className="mt-10">
                            <SmallLeftContent 
                                top="Let’s Get You Set Up" 
                                title="Let’s Automate Your Clinic"
                                p="
                                    Takes 2 minutes.<br/>
                                    No contracts. No tech headaches. No BS.
                                    <br/><br/>
                                    <strong>Just a smart systems that turns clicks into patients—on autopilot.</strong>
                                "
                                button="BOOK YOUR FREE DEMO"
                            />
                            <Special className="text-center ">and see it in action.
                            No pressure. Just proof.</Special>
                        </div>
                    </div>
                </div>
                <WideRightShades/>
            </article>
        </div>
        {/* <div className="w-full border-b-[1px] border-b-[#2b3340] lg:hidden">
          <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340]" style={{position:"relative"}}>
              <SmallLeftShades/>
              <div className="border-x-[1px] border-[#2b3340]">
          <div className="lg:hidden pt-12 pb-8" style={{position:"relative"}}>
              <img 
                  src="https://www.cobratate.com/jointherealworld/thinkabout.png" 
                  alt="carbon fiber bg" 
                  width="1334" 
                  height="1642" 
                  loading="lazy" 
                  className="object-cover h-[100%] w-full top-0 left-0 pointer-events-none z-0 opacity-75"
                  style={{position:"absolute", color:"transparent"}}
              />
                  <SmallSection2
                          top="Think about it" 
                          title="And the Best Part?"
                          p="
                              All of this runs quietly in the background..
                              ..so you can focus on what actually matters: <strong>treating patients.</strong>
                              <br/><br/>
                              While you're drilling, scaling, diagnosing...<br/>
                              <strong>AI handles </strong> the calls, the chats, the bookings, the follow-ups.
                          "
                          button="BOOK YOUR FREE DEMO"
                  />
              </div>
              </div>
              <SmallRightShades/>
          </article>
      </div> */}
            </div>
  )
}

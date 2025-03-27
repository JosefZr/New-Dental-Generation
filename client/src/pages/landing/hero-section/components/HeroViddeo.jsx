import { size } from "@/lib/mediaQuerys";
import styled from "styled-components";

const VideoWrapper = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 600px;
  max-width:832px;
  width: 100%;
  margin-top: 2rem;
  position: relative;
  z-index: 1; /* Ensure it's above background but below glow */


  @media screen and (max-width: ${size.laptop}) {
    width: 100%;
  }
  @media screen and (max-width: ${size.tablet}) {
    box-shadow: none;
    margin-top: 0.5rem;
  }
`;
const H3 = styled.h3`
font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    letter-spacing: .2em;
    color: #a7a297;
    @media screen and (min-width: 1024px) {
        font-size: 16px;
        line-height: 16px;
    }
`
export default function HeroViddeo() {
  return (
    <div className="max-w-[832px] mt-12 mx-auto w-full pt-4  z-10" style={{position:"relative"}}>
      <H3 className="uppercase text-center mb-3">MAKE A CHOICE</H3>
    <div
      className="block  right-[430px] z-0 "
      style={{
        position: "absolute",
        width: "600px",
        height: "600px",
        background: "radial-gradient(42.52% 42.52% at 50% 26.25%, #59799e59 -50%, transparent 90%)",
      }}
    ></div>
    <div
      className="block right-[20%] z-0 top-[300px]  max-md:hidden"
      style={{
        position: "absolute",
        width: "600px",
        height: "600px",
        background: "radial-gradient(42.52% 42.52% at 50% 26.25%, #59799e59 -50%, transparent 90%)",
      }}
    ></div>
    <div
      className="block left-[430px] z-0 "
      style={{
        position: "absolute",
        width: "600px",
        height: "600px",
        background: "radial-gradient(42.52% 42.52% at 50% 26.25%, #59799e59 -50%, transparent 90%)",
      }}
    ></div>
      <div style={{position:"relative"}}>
        <div style={{position:"relative", width:"100%"}}>
          <div style={{position:"relative", maxWidth:"100%"}}>
            <div className="w-full h-full  undefined" style={{position:"relative", paddingTop:"56%"}}>
              <iframe
                className="border-none "
                style={{position:"absolute", inset:"0px",height:"100%", width:"100%"}}
                src="https://player.vimeo.com/video/1068721558?h=c7ce8b625e&autoplay=1&muted=1&loop=1"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              >
            </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

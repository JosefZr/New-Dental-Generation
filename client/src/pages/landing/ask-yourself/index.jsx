import useReveal from "@/hooks/useReveal"
import styled from "styled-components"
import "../../../styles/fonts.css"
import { CtaButton } from "@/components"
import "./index.css"

const H2 = styled.h2`
  font-size: 28px;
  line-height: 28px;
  @media screen and (min-width: 1024px) {
    font-size: 33.5px;
    font-weight: 600;
    line-height: 30px;
  }
`

const H3 = styled.h3`
  font-size: 12px;
  font-weight: 200;
  line-height: 12px;
  letter-spacing: .32em;
  color: #a7a297;
  font-family: 'Doawnloawd', sans-serif;
  @media screen and (min-width: 1024px) {
    font-size: 16px;
    line-height: 16px;
  }
`

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;
  @media screen and (min-width: 1024px) {
    grid-column-gap: 0;
    grid-row-gap: 2rem;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr;
    display: grid;
  }
`

const Red = styled.span`
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(126deg, rgb(247, 141, 123), var(--redClaire));
`

const BigText = styled.span`
  background-color: #fff;
  background-image: url(https://www.jointherealworld.com/text_texture.webp);
  background-position: 50%;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  font-weight: 600;
`

const Paragraph = styled.p`
  font-family: 'Doawnloawd', sans-serif;
  font-size: 17px;
  font-weight: 400;
  line-height: 25px;
  color: #ffffffb2;
  @media screen and (min-width: 1024px) {
    font-size: 18px;
    line-height: 28px;
  }
`

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  @media screen and (min-width: 1024px) {
    height: auto;
    min-height: 300px;
    max-height: 90vh;
    aspect-ratio: 16/9;
    padding-bottom: 0;
  }

  @media screen and (min-width: 1280px) {
    min-height: 400px;
  }

  @media screen and (min-width: 1536px) {
    min-height: 500px;
  }
`

// New component for mobile video
const MobileVideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  margin-bottom: 1rem;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`

export default function AskYourself() {
  useReveal("vertical")
  useReveal("horizontal")

  return (
    <section className="w-full my-[20px] text-white" style={{ position: "relative" }}>
      <div>
        <Wrapper >
          {/* Mobile Image and Video */}
          <div className="lg:hidden">
            {/* Mobile Image */}
            <figure className="lg:hidden w-full  top-0 left-0 z-0 opacity-50" style={{position:"absolute"}}>
              <img alt="Ask Yourself" loading="lazy" width="934" height="745" decoding="async" data-nimg="1" className="w-full opacity-35 lg:opacity-100 relative z-0"  src="/YDN Hall of Fame.webp" style={{color:"transparent"}}></img>
              <div className="left-fade-b pointer-events-none"></div>
              <div className="right-fade-b pointer-events-none"></div>
              <div className="bottom-fade-b pointer-events-none"></div>
              <div className="top-fade-b pointer-events-none"></div>
            </figure>
          </div>
          {/* Text Content */}
          <div
            className="reveal-vertical w-full lg:w-[554px] z-10  flex flex-col justify-center items-end px-5"
            style={{
              position: "relative",
              placeSelf: "center end",
            }}
          >
            <H3 className="max-w-[554px] uppercase lg:px-0 text-left w-full mb-3 reveal-vertical">
                ASK YOURSELF
            </H3>
            <H2 className="max-w-[554px] capitalize mb-8 lg:px-0 text-left">
              <BigText>
              ARE YOU READY TO BUILD A PROFITABLE DENTAL PRACTICE?
              </BigText>
            </H2>
            <div className="reveal-horizontal-right flex">
              <Paragraph className="max-w-[554px] text-left">
                Running a successful clinic is a <strong className="text-white font-medium">skill</strong>. Just like dentistry itself.<strong className="text-white font-medium"><br />It can be learned.</strong>  And how fast you
                learn depends on:
                <br />
                <br />
                • The <strong className="text-white font-medium">effort</strong> you put in.<br />
                • The <strong className="text-white font-medium">mentors</strong> you learn from.<br />
                • The <strong className="text-white font-medium">environment</strong> you&apos;re surrounded by.
                <br /><br />
                At Your Dental Network, you&apos;re not just learning theory. <strong className="text-white font-medium"><br />You’re learning real, proven strategies from top dentists.</strong>
                <br /><br />
                They know what works. They know what doesn’t. And they’re the first to implement new
                disruptive strategies that take clinics to the next level.
                <br />
                <br />
                There is no better place on the planet to learn how to <strong className="text-white font-medium">maximize your profits, streamline your clinic, and build real wealth.</strong>
              </Paragraph>
            </div>
            <div className="flex mt-8 w-full justify-center lg:justify-start">
              <CtaButton content="Are you ready? Join_YDN_today." />
            </div>
          </div>

          {/* Desktop Video */}
          <div style={{ position: "relative" }} className="reveal-horizontal-right hidden lg:block">
          <img alt="Ask Yourself" loading="lazy" width="934" height="745" decoding="async" data-nimg="1" src="/YDN Hall of Fame.webp" className="w-full opacity-35 lg:opacity-100 relative z-0" style={{color:"transparent"}}/>
              <div className="left-fade-b pointer-events-none"></div>
              <div className="right-fade-b pointer-events-none"></div>
              <div className="bottom-fade-b pointer-events-none"></div>
              <div className="top-fade-b pointer-events-none"></div>
          </div>
        </Wrapper>
      </div>
    </section>
  )
}


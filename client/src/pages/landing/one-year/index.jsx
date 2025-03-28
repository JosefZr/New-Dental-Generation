import useReveal from "@/hooks/useReveal"
import styled from "styled-components"
import "../../../styles/fonts.css"
import { CtaButton } from "@/components"
import "./index.css"

const H2 = styled.h2`
  font-size: 28px;
  line-height: 28px;
  @media screen and (min-width: 1024px) {
    font-size: 55.5px;
    font-weight: 600;
    line-height: 56px;
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

export default function OneYear() {
  useReveal("vertical")
  useReveal("horizontal")

  return (
    <section className="w-full mt-[20px] mb-[50px] text-white" style={{ position: "relative" }}>
      <div>
        <Wrapper className="">
          {/* Mobile Image and Video */}
          <div className="lg:hidden">
            {/* Mobile Image */}
            <figure className="mb-4 w-full" style={{ position: "relative" }}>
            <MobileVideoContainer>
                <iframe
                    src="https://player.vimeo.com/video/1069294845?autoplay=0&loop=1&title=0&byline=0&portrait=0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                ></iframe>
                <div className="left-fade-b pointer-events-none"></div>
                <div className="right-fade-b pointer-events-none"></div>
                <div className="bottom-fade-b pointer-events-none"></div>
                <div className="top-fade-b pointer-events-none"></div>
            </MobileVideoContainer>
            </figure>

            {/* Mobile Video (Optional - uncomment to enable video on mobile) */}
            {/* <MobileVideoContainer>
              <iframe 
                src="https://player.vimeo.com/video/1069294845?autoplay=0&loop=1&title=0&byline=0&portrait=0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
              ></iframe>
              <div className="left-fade-b pointer-events-none"></div>
              <div className="right-fade-b pointer-events-none"></div>
              <div className="bottom-fade-b pointer-events-none"></div>
              <div className="top-fade-b pointer-events-none"></div>
            </MobileVideoContainer> */}
          </div>

          {/* Text Content */}
          <div
            className="reveal-vertical w-full lg:w-[600px] z-10  flex flex-col justify-center items-start px-4"
            style={{
              position: "relative",
              placeSelf: "center end",
            }}
          >
            <H3 className="w-full uppercase px-4 lg:px-0 text-center lg:text-left mt-3 lg:mt-0 reveal-vertical">
              ONE YEAR IS ALL YOU NEED
            </H3>
            <H2 className="capitalize mt-3 mb-6 lg:mb-8 px-4 lg:px-0 text-center lg:text-left mx-auto">
              <BigText>
                <Red>LOCK IN</Red> FOR THE NEXT YEAR
              </BigText>
            </H2>
            <div className="reveal-horizontal-right flex">
              <Paragraph className="text-center lg:text-left text-pretty">
                  Success isn’t a matter of luck, it’s about using the right strategies.
                <br />
                <br />
                <strong className="text-white font-medium">Inside</strong> Your Dental Network, you’ll get access to exclusive rooms that lay out a step-by-step blueprint to grow your practice, increase profitability, and stay ahead of the competition.
                <br />
                <br />
                The sooner you start, the faster you scale.
              </Paragraph>
            </div>
            <div className="flex mt-8 w-full justify-center lg:justify-start">
              <CtaButton content="Your future self will thank you." />
            </div>
          </div>

          {/* Desktop Video */}
          <div style={{ position: "relative" }} className="reveal-horizontal-right w-full hidden lg:flex items-center">
            <VideoContainer>
              <iframe
                src="https://player.vimeo.com/video/1069294845?autoplay=0&loop=1&title=0&byline=0&portrait=0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="left-fade-b pointer-events-none"></div>
              <div className="right-fade-b pointer-events-none"></div>
              <div className="bottom-fade-b pointer-events-none"></div>
              <div className="top-fade-b pointer-events-none"></div>
            </VideoContainer>
          </div>
        </Wrapper>
      </div>
    </section>
  )
}


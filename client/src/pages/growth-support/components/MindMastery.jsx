import styled from "styled-components"
import "./BuisnessSecret.css"
const Hero = styled.div`
  opacity: 1;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
  background-image: radial-gradient(circle at 50% 0, #ff000038 12%, #fff0 50%);  padding-left: 10px;
  padding-left: 10px;
  padding-right: 10px;

  column-gap: 1rem;
  row-gap: 1rem;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  
  margin-left: auto;
  margin-right: auto;
  padding-top: 2rem;
  display: flex
;
`
export default function MindMastery() {
  return (
    <div>
      <Hero>
          <h1 className="h1 text-color-silver business max-md:hidden "
          style={{
            fontFamily:"Handjet, sans-serif",
            fontSize: "120px",
            fontWeight:"400",
            textTransform:"uppercase"
          }}>Do You Truly Own Your Mind ?</h1>
          <h1 className="h1 text-color-silver business md:hidden"style={{
            fontFamily:"Handjet, sans-serif",
            fontSize: "80px",
            fontWeight:"400",
            textTransform:"uppercase"
          }}>Do You Truly Own Your Mind ?</h1>
          <p className="hero_sub-text text-color-silver text-[30px] max-w-[45rem]">99% of people are bound by the limits of their own thoughts.</p>
          
          <p className="p-24 is-opport">
            <span className=""><strong>Your mind is your greatest power—Master it, 
            and you can Break down barriers, redefine reality, and achieve the impossible.</strong></span>
          </p>
      </Hero>

        
        <div className="my-10 flex flex-col gap-4 mx-auto px-5">
          <h2 className="H2 business">Step Into The MIND MASTERY COURSE</h2>
        </div>
    </div>
  )
}

import styled from "styled-components"

const Hero = styled.div`
  opacity: 1;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
  background-image: radial-gradient(circle at 50% 0px, rgba(111, 120, 187, 0.23), rgba(255, 255, 255, 0) 46%);
  padding-left: 10px;
  padding-right: 10px;

  column-gap: 2rem;
  row-gap: 2rem;
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

const exclamation =[
  {
    "name": "Website creation",
    "desc": "”A professional website that turns visitors into patients.”"
  },
  {
    "name": "Marketing",
    "desc": '“The Design is the Slave of The Copy.. hOWEVER We Take Care of both”'
  },
  {
    "name": "Ads management",
    "desc": '”Target the right audience with precision campaigns." -Meta ads-”'
  },
]
export default function Solutions({setActiveTab}) {
  return (
    <div>
      <Hero>
        <h1 className="h1 text-color-silver business max-md:hidden">We’re In 2025 and you still not having a Responsive WEBSITE ? </h1>
        <h1 className="h1 text-color-silver business md:hidden ">We’re In 2025 and you still not having a Responsive WEBSITE ? </h1>
        <p className="hero_sub-text text-color-silver">
          No worries.. 
          <br /> 
          Get it as fast as possible with an exclusive YDN Price !
        </p>
        <div className="grid grid-cols-3 max-md:grid-cols-1 w-full px-10 gap-4">
          {exclamation.map((item,index)=>{
            return(
            <div key={index} className="text-center grid gap-2">
              <h3 className="h3-timeline business">{item.name}</h3>
              <p className="text-[1.13rem] font-light" style={{
                fontFamily:"Oswald, sans-serif"
              }}
              >{item.desc}</p>
          </div>
            )
          })}
        </div>
        <button className="button-2 font-semibold business checkout-btn w-inline-block text-center">
            <div>
              <div style={{
                transform: "translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transformStyle: "preserve-3d",
              }}
              onClick={() => setActiveTab("Free Quote")} // Add click handler
              >
                YES, I WANT THAT!
              </div>
              <div style={{
                transform: "translate3d(0px, -120%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transformStyle: "preserve-3d",
              }}></div>
            </div>
            <div className="button_glow business"></div>
        </button>
      </Hero>
        
    </div>
  )
}

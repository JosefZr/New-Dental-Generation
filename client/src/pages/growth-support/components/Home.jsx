import styled from "styled-components"
import "./index.css"
const Hero = styled.div`
  opacity: 1;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
  background-image: radial-gradient(circle at 50% 0px, rgba(111, 120, 187, 0.23), rgba(255, 255, 255, 0) 46%);
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
const items=[
  {
    "name": "GUARANTEE",
    "desc": "We win when you win. Risk is shared—it’s a true partnership."
  },
  {
    "name": "LOCAL",
    "desc": "We’re not in a call center; we’re local and always reachable."
  },
  {
    "name": "RESULTS",
    "desc": "Actions over words. Delivering results is our priority."
  },
  {
    "name": "SPECIALIZATION",
    "desc": "We focus on industries we know, ensuring expertise and guaranteed."
  },
]
const exclamation =[
  {
    "name": "DO EVERYTHING YOURSELF?",
    "desc": "If you have little to do, it&rsquo;s not a problem. However, if you&rsquo;re busy... this is not feasible."
  },
  {
    "name": "HIRE NEW STAFF?",
    "desc": "Finding good people is difficult,  training them is expensive. Even if you find the perfect person... You still rely on one individual."
  },
  {
    "name": "HIRE AN AGENCY?",
    "desc": "Without a big marketing budget, your account often ends up with the intern of an assistant—not ideal."
  },
]
export default function Home({setActiveTab }) {
  return (
    <div>
      <Hero>
          <h1 className="h1 text-color-silver business max-md:hidden">Scale Your Dental Practice Like never before…</h1>
          <h1 className="h1 text-color-silver business md:hidden ">Scale Your Dental Practice Like never before…</h1>
          <p className="hero_sub-text text-color-silver">More Growth. More Patients.</p>
          <p className="hero_sub-text text-color-silver">Guaranteed.</p>
          <button className="button-2 font-semibold business checkout-btn w-inline-block">
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
          <p className="p-14 is-opport">
            <span className=""><strong>Marketing is important...</strong></span>
            <br />
            <br />
            <span><strong>...However, there are already 101 things on your to-do list.
            And they are all important!</strong></span>
              <br />
              <br />
            <span><strong>So How Do You Get The Most Out Of Your Marketing?</strong></span>
          </p>
      </Hero>
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
        
        <div className="opportunity_component pt-20">
          <h2 className="H2 business">&#34;OK... But What Makes You Different?&#34;</h2>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 w-full">
            {items.map((item, index)=>{
              return(
                <div key={index} className="banner-flex ">
                  <h1 className="font-semibold text-[30px]">{item.name}</h1>
                  <p className="hero_sub-text text-color-silver">{item.desc}</p>
                  <div className="banner_border"></div>
                  <div className="banner_border is-bot"></div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="my-10 flex flex-col gap-4 mx-auto px-5">
          <h2 className="H2 business">Contact Us For A Free Marketing Consultation: </h2>
          <button className="mx-auto button-2 font-semibold business checkout-btn w-inline-block">
            <div>
              <div style={{
                transform: "translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transformStyle: "preserve-3d",
                }}
                onClick={() => setActiveTab("Free Quote")} // Add click handler
              >
                Yes, I WANT THAT!
              </div>
              <div style={{
                transform: "translate3d(0px, -120%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transformStyle: "preserve-3d",
              }}></div>
            </div>
            <div className="button_glow business"></div>
          </button>
        </div>
    </div>
  )
}

import { Logo } from "@/components"
import "./index.css"
import styled from "styled-components"
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore"

const Good = styled.div`
  border: 4px solid;
  border-image-slice: 4;
  border-image-source: linear-gradient(92.15deg, var(--redClaire) 2.09%, #ff7272 86.55%);
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-items: center;
  text-align: center;
  transition: all 0.5s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px 0 rgba(254, 75, 75, 0.4);
  }
`

const ButtonGood = styled.div`
  background: linear-gradient(100.33deg, rgba(255, 35, 35, 0.2) 5.1%, rgba(255, 58, 58, 0.2) 83.56%);
  box-shadow: 0 4px 50px 0 rgba(254, 75, 75, 0.24);
  color: #fff;
  backdrop-filter: blur(25px);
  font-size: 22px;
  font-weight: 600;
  line-height: 22px;
  text-align: center;
  padding: 16px 26px;
  width: 100%;
  transition: all 0.5s ease;
  
  &:hover {
    background: linear-gradient(100.33deg, var(--redClaire) 5.1%, rgba(255, 58, 58, 0.4) 83.56%);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`

export default function WaitingList() {
    const {onOpen} = useModal()
  return (
    <div className="section_hero copywriting pb-20">
      <div className="padding-global is-hero">
        <div className="container-large">
          <div className="hero_component business copywriting">
            <Logo />
            <div className="hero_text_first text-color-silver">
              Right now, Your Dental Network (YDN) is only available to our current members.
            </div>
            <h1 className="h1 text-color-silver copywriting">YDN 2.0 – Exclusive Access Coming Soon!</h1>
            <h2 className="hero_sub-text text-color-silver ">
              But we&apos;re getting ready to launch YDN 2.0, a bigger, better, and more powerful version designed to help
              dentists grow, scale, and stress less.
              <br />
              <br />
              Sign up for the waitlist now, and you&apos;ll be the first to know when we open it to new members.
            </h2>
            <button onClick={()=>{
                onOpen(MODAL_TYPE.WAITLIST_MODAL)
            }}>
              <Good className="button-container duration-500 transition-all w-full hover:w-[105%] hover:ml-[-2.5%] group">
                <ButtonGood className="uppercase duration-500 transition-all alt !text-[20px] lg:!text-[22px]">
                  JOIN THE WAITLIST
                </ButtonGood>
                <div
                  style={{
                    willChange: "height,width,top,left",
                    position: "absolute",
                  }}
                  className="left-[50%] top-[50%] w-[0px] h-[0px] bg-[#ffffff1a] rounded-full 
                                    group-hover:w-[500px] group-hover:h-[500px] duration-500 transition-all 
                                    pointer-events-none text-center group-hover:left-[calc(50%-250px)] group-hover:top-[calc(50%-250px)]"
                ></div>
              </Good>
            </button>
            <p className="hero_sub-text text-color-silver">See you inside,<br />
            YDN Team</p>
          </div>
        </div>
      </div>
    </div>
  )
}


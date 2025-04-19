import styled, { keyframes } from "styled-components";
import "../../index.css"
import LeftContent from "../LeftContent";
import RightVideo from "../RightVideo";
import SmallLeftContent from "../SmallLeftContent";
import WideLeftShades from "../Shades/WideLeftShades";
import WideRightShades from "../Shades/WideRightShades";
import SmallLeftShades from "../Shades/SmallLeftShades";
import SmallRightShades from "../Shades/SmallRightShades";
import { size } from "@/lib/mediaQuerys";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const Special = styled.h1`
    color: hsla(0, 0%, 100%, .21);
    font-size: 10px;
    line-height: 30px;
    letter-spacing: -3%;
    @media screen and (max-width: 991px) {
        display: none;
    }
`
const dropDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`

const Navigation = styled.nav`
  opacity: 1;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
  z-index: 999;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  position: fixed;
  inset: 0% 0% auto;
  animation: ${dropDown} 0.5s ease-out forwards;
  width: 100%;

  @media screen and (max-width: ${size.tablet}) {
    padding-top: 0;
    position: absolute;
  }
`

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
  width: 30%;
  height: 100vh;
  background-color: rgba(26, 26, 26, 0.2); /* Slightly darker but more transparent */
  backdrop-filter: blur(10px); /* Strong blur for glass effect */
  -webkit-backdrop-filter: blur(10px); /* For Safari */
  z-index: 997;
  padding: 6rem 2rem 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $isOpen }) => ($isOpen ? "0 0 15px rgba(0, 0, 0, 0.3)" : "none")};
  border-right: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border for glass effect */

  @media screen and (max-width: ${size.tablet}) {
    width: 70%;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2); /* Very transparent */
  z-index: 996;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(3px); /* Light blur for background */
  -webkit-backdrop-filter: blur(3px); /* For Safari */
`

const MenuItem = styled.div`
  color: ${props => props.$active ? 'var(--redClaire)' : 'var(--white)'};
  font-size: 1.1rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    color: var(--redClaire);
    transform: translateX(10px);
  }
  &.active {
    color: var(--redClaire);
  }
`

const Boss = styled.div`
  z-index: 999;
  cursor: pointer;
  color: var(--redClaire);
  border: 1px solid #00000018;
  padding: .4rem;
  font-size: .88rem;
  font-weight: 500;
  line-height: 1;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #c2c2c27d;
    border: 1px solid #c2c2c22b;
  }
`

const PaddingGlobal = styled.div`
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  position: relative;
  
  @media screen and (max-width: ${size.tablet}) {
    padding: .25rem 1.25rem;
  }
`

const Content = styled.div`
  justify-content: space-between;
  align-items: flex-start;
  display: flex;
  
  @media screen and (max-width: ${size.tablet}) {
    align-items: center;
    height: 100px;
    position: relative;
  }
`

const NavLeft = styled.div`
    z-index: 999;
    align-items: center;
    display: flex;
    position: relative;
    @media screen and (max-width: ${size.tablet}){
        justify-content: space-between;
        /* width: 100%; */
    }
`

const NavCenter = styled.div`
    justify-content: end;
    display: flex;
    padding:0 20px;
    flex: 1; // This ensures it takes enough space for centering
    /* position: absolute; */
    /* left: 50%; */
    color: black;
    /* transform: translateX(-50%); // Proper centering technique using absolute positioning */
    /* z-index: 1000; // Ensure it's above other elements */
    @media screen and ((max-width: ${size.tablet})) {
            font-size: 14px;
            /* padding: 0.1rem; */
}
`

const NavRight = styled.div`
    /* flex: 1; */
    justify-content: flex-end;
    display: flex;
    white-space: nowrap;
    @media screen and (max-width: ${size.tablet}){
        z-index: 999;
        position: relative;
    }
`

const MenuHeader = styled.div`
  color: var(--redClaire);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Text shadow for better readability on glass */
`

const LoginButton = styled.a`
    opacity: .9;
    text-transform: uppercase;
    
    /* border: 1px solid #a3a3a3; */
    padding: .75rem 1rem;
    color: var(--redClaire) ;
    font-family: Clashdisplay Variable, sans-serif;
    font-weight: 600;
    transition: all .1s;
    &:hover{
        opacity: 1;
        background-color:var(--gold-text);
    }
    @media screen and (max-width: ${size.mobileM}){
        padding: .5rem .9rem;
    } 
`
export default function Hero() {
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
        
        const toggleMenu = () => {
            setIsLeftMenuOpen(!isLeftMenuOpen)
        }
        const closeMenu = () => {
            setIsLeftMenuOpen(false)
        }
        const menu = [
            {
                id:"Your ",
                name:"Your Dental Network",
                route:"https://buildydn.com"
            },
            {
            id:"Marketing",
            name:"Marketing 1.2.3",
            route:"https://buildydn.com/#/growthSupport"
            },
            {
            id:"Free",
            name:"Free Guide",
            route:"https://buildydn.com/#/growthSupport"
            }
        ]
    return (
        <div className="" style={{position:"relative",fontFamily:"'Funnel Display', sans-serif"}}>
            <img 
                src="/ai/carbon_bg.webp" 
                alt="carbon fiber bg" 
                width="1736" 
                height="943" 
                loading="lazy" 
                className="max-h-[100%] h-[100%] opacity-5 w-full object-cover top-0 left-0 pointer-events-none"
                style={{position:"absolute"}}
            />
            {/* navbar */}
            <div className=" w-full pointer-events-none hidden lg:block" style={{position:"relative"}}>
                <nav className="text-sm">
                    <div className="w-full border-b-[1px] border-b-stroke undefined">
                        <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-stroke "style={{position:"relative"}}>
                            <WideLeftShades/>
                            <div className="border-x-[1px] border-stroke">
                                <div className="justify-between flex w-full " style={{position:"relative"}}>
                                    <div className="z-40 flex justify-center items-center transition-all duration-500 false p-6 border-r-stroke border-r-[1px]" style={{position:"relative"}}>
                                    <div onClick={toggleMenu} className="group cursor-pointer">
                                <div className="border-[4px] border-[#2b334079]">
                                    <div className="border-[2px] border-[#2b3340be]">
                                    <div className="group cursor-pointer text-white flex items-center gap-4 pointer-events-auto transition-all duration-300 border-stroke hover:border-[#6a6d6f] border-[1px] hover:bg-[#202326] py-1 px-3 w-auto">
                                        <img src="https://www.cobratate.com/jointherealworld/menu_icon.svg" alt="za" className="w-[28px] h-[28px]" width={56} height={56} />
                                        <p className="text-sm">MENU</p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center py-3">
                                        <div className="border-[6px] border-white/50 rounded-full">
                                            <div className="border-[3px] border-white rounded-full">
                                                <img className="w-[60px] h-[60px] rounded-full scale-150" src="/ai/autobank.webp" alt="" height={168} width={168}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex justify-end pointer-events-auto items-center p-6 border-l-stroke border-l-[1px]" style={{position:"relative"}}>
                                        <div onClick={toggleMenu} className="group cursor-pointer">
                                            <div className="border-[4px] border-[#2b334079]">
                                                <div className="border-[2px] border-[#2b3340be]">
                                                <Link to={"https://buildydn.com/#/login"} className="group cursor-pointer text-white flex items-center gap-4 pointer-events-auto transition-all duration-300 border-stroke hover:border-[#6a6d6f] border-[1px] hover:bg-[#202326] py-1 px-3 w-auto">
                                                    <img src="https://www.cobratate.com/jointherealworld/login_icon.png" alt="za" className="w-[28px] h-[28px]" width={56} height={56} />
                                                    <p className="text-sm">LOGIN</p>
                                                </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <WideRightShades/>
                        </article>
                    </div>
                </nav>
            </div>
            <Overlay $isOpen={isLeftMenuOpen} onClick={closeMenu} />

            <Sidebar $isOpen={isLeftMenuOpen}>
                <MenuHeader>Menu</MenuHeader>
                {menu.map((item, index) => (
                    <MenuItem  
                        key={index} 
                        onClick={() => {
                            closeMenu();
                            window.open(item.route, '_blank', 'noopener,noreferrer');
                        }}
                        $active={params.name === item.id}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </Sidebar>
            <div className=" w-full pointer-events-none lg:hidden z-50" style={{position:"relative"}}>
                <div className="text-sm">
                    <div className="justify-between flex w-full " style={{position:"relative"}}>
                        <div className=" z-40 flex justify-center items-center transition-all duration-500 false p-6" style={{position:"relative"}}>
                            <div onClick={toggleMenu} className="group cursor-pointer">
                                <div className="border-[4px] border-[#2b334079]">
                                    <div className="border-[2px] border-[#2b3340be]">
                                    <div className="group cursor-pointer text-white flex items-center gap-4 pointer-events-auto transition-all duration-300 border-stroke hover:border-[#6a6d6f] border-[1px] hover:bg-[#202326] py-1 px-3 w-auto">
                                        <img src="https://www.cobratate.com/jointherealworld/menu_icon.svg" alt="za" className="w-[28px] h-[28px]" width={56} height={56} />
                                        <p className="text-sm">MENU</p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="border-[6px] border-white/50 rounded-full">
                                <div className="border-[3px] border-white rounded-full">
                                    <img className="w-[50px] h-[50px] rounded-full scale-150" src="/ai/autobank.webp" alt="" height={168} width={168}/>
                                </div>
                            </div>
                        </div>
                        <div className=" z-40 flex justify-center items-center transition-all duration-500 false p-6" style={{position:"relative"}}>
                            <div onClick={toggleMenu} className="group cursor-pointer">
                                <div className="border-[4px] border-[#2b334079]">
                                    <div className="border-[2px] border-[#2b3340be]">
                                    <Link to={"https://buildydn.com/#/login"} target="_blank" className="group cursor-pointer text-white flex items-center gap-4 pointer-events-auto transition-all duration-300 border-stroke hover:border-[#6a6d6f] border-[1px] hover:bg-[#202326] py-1 px-3 w-auto">
                                        <img src="https://www.cobratate.com/jointherealworld/login_icon.png" alt="za" className="w-[28px] h-[28px]" width={56} height={56} />
                                        <p className="text-sm">LOGIN</p>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                </div>
            </div>

            <div className="w-full border-b-[1px] border-b-[#2b3340] hidden lg:block">
                <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340] " style={{position:"relative"}}>
                    <WideLeftShades/>
                    <div className="border-x-[1px] border-[#2b3340]">
                        <div className="lg:p-[60px] p-2 w-full" style={{position:"relative"}}>
                            <div className="flex">
                                <LeftContent 
                                    top="Scale your dental Practice--like never before" 
                                    title="Turn Cold Visitors Into Paying Patients"
                                    p="<strong>I run a clinic too. I know the chaos.</strong> <br/>
                                        You’re mid-root canal, phones are ringing, front desk’s overwhelmed.<br/>ss
                                        Leads get missed. Patients wait. Some never call back.<br/>
                                        And just like that—<strong>money’s gone.</strong>"
                                    button="BOOK YOUR FREE DEMO"
                                />
                                <RightVideo/>
                            </div>
                        </div>
                    </div>
                    <WideRightShades/>
                </article>
            </div>
            <div className="w-full border-b-[1px] border-b-[#2b3340] lg:hidden">
                <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340]" style={{position:"relative"}}>
                    <SmallLeftShades/>
                    <div className="border-x-[1px] border-[#2b3340]">
                        <div className=" w-full group min-h-[200px]" style={{position:"relative"}}>
                            <Special className="top-[-48px] left-[calc(50%-42px)] capitalize" style={{position:"absolute"}}>in Less Than 48h</Special>
                            <div className=" undefined" style={{position:"relative"}}>
                                <div className=" w-full  undefined" style={{position:"relative"}}>
                                    <div className="max-w-[100%]  undefined" style={{position:"relative"}}>
                                        <div className="w-full  lg:hidden undefined" style={{position:"relative", paddingTop:"56.25%"}}>
                                        <iframe 
                                            src="https://player.vimeo.com/video/1046354505?h=fe92c2a68a&autoplay=1&muted=1&loop=1" 
                                            frameBorder="0"
                                            height={"100%"}
                                            width={"100%"}
                                            style={{
                                                position:"absolute",
                                                inset:"0px",
                                                width:"100%",
                                                height:"100%",
                                            }}
                                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                            allowFullScreen="true"
                                        ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SmallLeftContent
                            top="Scale your dental Practice--like never before" 
                            title="Turn Cold Visitors Into Paying Patients"
                            p="<strong>I run a clinic too. I know the chaos.</strong>
                                You’re mid-root canal, phones are ringing, front desk’s overwhelmed.
                                Leads get missed. Patients wait. Some never call back.
                                And just like that—<strong>money’s gone.</strong>"
                            button="BOOK YOUR FREE DEMO"
                        />
                    </div>
                    <SmallRightShades/>
                </article>
            </div>
        </div>
    )
}

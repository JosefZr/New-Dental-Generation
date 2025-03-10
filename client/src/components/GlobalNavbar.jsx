import  { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { size } from '@/lib/mediaQuerys';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { IoLogoBitcoin } from 'react-icons/io';

const dropDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

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
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
  width: 30%;
  height: 100vh;
  background-color: #1a1a1a;
  z-index: 997;
  padding: 6rem 2rem 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $isOpen }) => ($isOpen ? '2px 0 8px rgba(0, 0, 0, 0.2)' : 'none')};

  @media screen and (max-width: ${size.tablet}) {
    width: 70%;
  }
`;


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 996;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(2px);
`;

const MenuItem = styled.div`
  color: var(--white);
  font-size: 1.1rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    color: var(--gold);
    transform: translateX(10px);
  }
`;

const Boss = styled.div`
  z-index: 999;
  cursor: pointer;
  color: var(--gold);
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
`;

const PaddingGlobal = styled.div`
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  position: relative;
  
  @media screen and (max-width: ${size.tablet}) {
    padding: .25rem 1.25rem;
  }
`;

const Content = styled.div`
  justify-content: space-between;
  align-items: flex-start;
  display: flex;
  
  @media screen and (max-width: ${size.tablet}) {
    align-items: center;
    height: 100px;
    position: relative;
  }
`;
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
  color: var(--gold);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;
const LoginButton = styled.a`
    opacity: .9;
    text-transform: uppercase;
    background-color: black;
    border: 1px solid #a3a3a3;
    padding: .75rem 1rem;
    color: var(--gold) ;
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
export default function GlobalNavbar() {
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsLeftMenuOpen(!isLeftMenuOpen);
  };
  let token;
  try {
    const tokenString = localStorage.getItem("token");
    token = tokenString ? jwtDecode(tokenString) : null;
  } catch (error) {
    console.error("Error decoding token:", error);
    token = null;
  }
  const handleLogin = () => {
    if (token) {
      console.log("channels");
      navigate("/channels");
    } else {
      console.log("login");
      navigate("/login");
    }
    setIsLeftMenuOpen(false);
  };

  const closeMenu = () => {
    setIsLeftMenuOpen(false);
  };

  return (
    <>
      <Navigation>
        <PaddingGlobal>
          <div className="container-large">
            <Content>
              <div onClick={toggleMenu} className="group cursor-pointer">
                <Boss>
                  <div className="w-10 h-5 flex flex-col items-center justify-center">
                    {/* Menu Icon */}
                    <div
                      className={`w-[50%] h-[2px] bg-my-gold rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] ${
                        isLeftMenuOpen ? "rotate-[-45deg]" : ""
                      }`}
                    />
                    <div
                      className={`w-[50%] h-[2px] bg-my-gold rounded-md transition-all duration-300 origin-center ${
                        isLeftMenuOpen ? "hidden" : ""
                      }`}
                    />
                    <div
                      className={`w-[50%] h-[2px] bg-my-gold rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] ${
                        isLeftMenuOpen ? "rotate-[45deg]" : ""
                      }`}
                    />
                  </div>
                  <span>Menu</span>
                </Boss>
              </div>

              <NavRight>
                <LoginButton className="uppercase">
                  <IoLogoBitcoin className="text-3xl cursor-pointer " onClick={handleLogin} />
                </LoginButton>
              </NavRight>
            </Content>
          </div>
        </PaddingGlobal>
      </Navigation>

      <Overlay $isOpen={isLeftMenuOpen} onClick={closeMenu} />

      <Sidebar $isOpen={isLeftMenuOpen}>
        <MenuHeader>Menu</MenuHeader>
        <MenuItem onClick={handleLogin}>{t("login")}</MenuItem>
        <MenuItem>
          <LanguageSwitcher intro={true} />
        </MenuItem>
      </Sidebar>

    </>
  );
}

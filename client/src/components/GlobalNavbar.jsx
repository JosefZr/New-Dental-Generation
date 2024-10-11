import styled, { keyframes } from 'styled-components'
import { size } from '@/lib/mediaQuerys'
import  LanguageSwitcher  from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
// Define the keyframe for the drop-down animation
const dropDown = keyframes`
  0% {
    transform: translateY(-100%); // Start off-screen above
    opacity: 0;
  }
  100% {
    transform: translateY(0); // Move into place
    opacity: 1;
  }
`;

const Navigation = styled.button`
  opacity: 1;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
  z-index: 999;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  position: fixed;
  inset: 0% 0% auto;

  /* Add the animation for dropping down */
  animation: ${dropDown} 0.5s ease-out forwards;

  @media screen and (max-width:${size.tablet}) { 
    padding-top: 0;
    position: absolute;
    inset: 0% 0% auto;
  }
`;
const PaddingGlobal = styled.div`
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    position: relative;
    @media screen and (max-width:${size.tablet}){
        padding: .25rem 1.25rem;
    }
`
const Content = styled.div`
    justify-content: space-between;
    align-items: flex-start;
    display: flex;
    @media screen and (max-width:${size.tablet}) {
        justify-content: space-between;
        align-items: center;
        height: 100px;
        position: relative
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
const Boss = styled.div`
    z-index: 20;
    grid-column-gap: .5srem;
    grid-row-gap: 1rem;
    letter-spacing: .1em;
    gap: .1rem;
    text-transform: uppercase;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    /* margin-left: 0.5rem; */
    color:var(--gold);
    border: 1px solid #00000018;
    padding: .4rem;
    font-size: .88rem;
    font-weight: 500;
    line-height: 1;
    transition: border .2s, background-color .2s;
    display: flex;
    position: relative;
    &:hover{
        background-color: #c2c2c27d;
        border: 1px solid #c2c2c22b;
    }
    @media screen and (max-width: ${size.tablet}){
        margin-left: 0;
        padding-left: .4rem;
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
const LoginButton = styled.a`
    opacity: .6;
    letter-spacing: .01em;
    text-transform: uppercase;
    background-color: black;
    border: 1px solid #a3a3a3;
    padding: .75rem 2rem;
    color: var(--white) ;
    font-family: Clashdisplay Variable, sans-serif;
    font-weight: 600;
    line-height: 1.25;
    transition: all .1s;
    &:hover{
        opacity: 1;
        background-color:var(--gold);
    }
    @media screen and (max-width: ${size.mobileM}){
        padding: .5rem .9rem;

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
export default function GlobalNavbar() {
    const {t} = useTranslation()
    return (
        <Navigation>
            <PaddingGlobal>
                <div className='container-large'>
                    <Content>
                        <NavLeft>
                            <Boss  href="https://icons8.com/icon/11214/businessman" target='_blank'>
                            <label>
                            <div
                                className="w-10 h-5 cursor-pointer flex flex-col items-center justify-center"
                            >
                                <input className="hidden peer" type="checkbox" />
                                <div
                                className="w-[50%] h-[2px] bg-my-gold rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]"
                                ></div>
                                <div
                                className="w-[50%] h-[2px] bg-my-gold rounded-md transition-all duration-300 origin-center peer-checked:hidden"
                                ></div>
                                <div
                                className="w-[50%] h-[2px] bg-my-gold rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]"
                                ></div>
                            </div>
                            </label>
                            menu
                                {/* <img src='https://img.icons8.com/?size=100&id=11214&format=png&color=ffffff' color='white' width="30px" alt='boss' className=' hover:text-gold'/> */}
                            </Boss>
                        </NavLeft>
                        <NavCenter>
                            <LanguageSwitcher/>
                        </NavCenter>
                        <NavRight>
                            <LoginButton className=' uppercase'>{t('login')}</LoginButton>
                        </NavRight>
                        
                    </Content>
                </div>
            </PaddingGlobal>
        </Navigation>
    )
}

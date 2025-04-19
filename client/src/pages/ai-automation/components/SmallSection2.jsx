import { Link } from "react-router-dom"
import styled from "styled-components"
import TexturedText from "./TexturedText"

const Texture = styled.h1`
    margin-top: 2rem;
    background-color: white;
    text-transform: capitalize;
    background-position: 50%;
    background-repeat: repeat;
    -webkit-text-fill-color: transparent;
    background-image: url("/backs/heading-texture_1heading-texture.webp");
    background-clip: text;
    font-size: 30px;
    line-height: 34px;
    font-weight: 700;
    letter-spacing: -.03em;
`
const Div = styled.div`
    background: linear-gradient(88.87deg, var(--from) -49.96%, var(--to) 99.26%);
    padding: 2px;
    clip-path: polygon(22px 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%, 0 22px);
    width: 100%;
    @media screen and (min-width: 1024px) {
        width: auto;
    }
`
const Button = styled.button`
    position: relative;
    padding: 16px 32px;
    background: linear-gradient(87.1deg, var(--from) 1.37%,  var(--to) 101.5%);
    text-align: center;
    color: black;
    clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
    font-size: 22px;
    font-weight: 800;
    line-height: 27.5px;
    letter-spacing: -.05em;
    width: 100%;
    @media screen and (min-width: 1024px) {
        min-width: 400px;
        font-size: 28px;
        line-height: 35px;
        padding: 20px 52px;
        width: auto;
    }
`
const P = styled.p`
    font-size: 18px;
    font-weight: 500;
    line-height: 26px;
    color: hsla(0, 0%, 100%, .7);
    strong {
        color: #fff;
        font-weight: 600;
    }
`
export default function SmallSection2({top, title, p, button}) {
    return (
        <>
        <div className="lg:p-[60px] p-2 w-full " >
            <div className="flex flex-col items-center z-10 "style={{position:"relative"}}>
                    {top &&<div className="subtitle">
                        <div className="subtitle-background">
                            <h3>
                                {top}
                            </h3>
                        </div>
                    </div>}
                    
                    <TexturedText title={title}/>
            </div>
        </div>
        <div style={{position:"relative"}}>
            <div 
                style={{
                    position: "absolute",
                    background: "linear-gradient(to bottom, transparent, #01020b 35%, #01020b 75%, transparent)",
                    backgroundBlendMode: "overlay" // optional for better blending
                }} 
                className="top-[-140px] left-0 w-full h-[calc(100%+240px)]"
            >
            </div>
            <div className="lg:p-[60px] p-2 w-full " style={{position:"relative"}}>
                <P className="mt-2 text-center px-4 text-pretty" dangerouslySetInnerHTML={{ __html: p }} />               
            </div>
        </div>
        <div className="lg:p-[60px] p-2 w-full " style={{position:"relative"}}>
        {button && <div className="flex justify-center mt-2">
            <Link>
                <Div className="hover:scale-105 duration-300 transition-all">
                    <Button className="hover:scale-105 duration-300 transition-all">{button}</Button>
                </Div>
            </Link>
        </div>}
        </div>
        
        </>
    )
}

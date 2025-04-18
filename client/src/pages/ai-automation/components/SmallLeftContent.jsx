import { Link } from "react-router-dom"
import styled from "styled-components"

const Texture = styled.h1`
    margin-top: 2rem;
    background-color: white;
    text-transform: capitalize;
    background-position: 50%;
    background-repeat: repeat;
    -webkit-text-fill-color: transparent;
    background-image: url("/backs/heading-texture_1heading-texture.webp");
    background-clip: text;
    font-size: 42px;
    font-weight: 600;
    line-height: 42px;
    letter-spacing: -.05em;
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
export default function SmallLeftContent({top, title, p, button}) {
    return (
        <div>
        <>
            <div className="px-4 mt-[-70px] flex justify-center pointer-events-none">
                <div className="subtitle-container">
                    <div className="subtitle">
                        <div className="subtitle-background">
                            <h3>
                            {top}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <Texture className="mt-2 capitalize text-center">{title}</Texture>
            <P className="mt-2 text-center px-4 text-pretty" dangerouslySetInnerHTML={{ __html: p }} />               
            <div className="flex mt-4 justify-center pb-8">
                <Link>
                    <Div className="hover:scale-105 duration-300 transition-all">
                        <Button className="hover:scale-105 duration-300 transition-all">{button}</Button>
                    </Div>
                </Link>
            </div>
        </>
        </div>
    )
}

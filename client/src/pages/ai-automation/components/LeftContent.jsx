import { Link } from "react-router-dom";
import styled from "styled-components";
const HeroHeading = styled.h1`
    margin-top: 2rem;
    background-color: white;
    text-transform: capitalize;
    background-position: 50%;
    background-repeat: repeat;
    -webkit-text-fill-color: transparent;
    background-image: url("/backs/heading-texture_1heading-texture.webp");
    background-clip: text;
    font-size: 80px;
    font-weight: 600;
    line-height: 75px;
    letter-spacing: -.03em;
    @media screen and (max-width: 991px) {
        font-size: 42px;
        line-height: 42px;
        letter-spacing: -.05em;
    }
`;
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
@media screen and (min-width: 1024px) {
        font-size: 22px;
    }
    @media screen and (min-width: 1024px) {
        line-height: 28px;
    }
`
export default function LeftContent({top, title, p, button, cutted}) {
    return (
        <div className={`${cutted?"w-2/5":"w-1/2"}`}>
            <div className="subtitle-container">
                <div className="subtitle">
                    <div className="subtitle-background">
                        <h3>
                        {top}
                        </h3>
                    </div>
                </div>
            </div>
            <HeroHeading>
                {title}                                    
            </HeroHeading>
            <P className={` mt-8  ${cutted?"max-w-[408px]":""}`} dangerouslySetInnerHTML={{ __html: p }} />
            <div className="flex mt-8 ">
                <Link>
                    <Div className="hover:scale-105 duration-300 transition-all pb-8">
                        <Button className="hover:scale-105 duration-300 transition-all">{button}</Button>
                    </Div>
                </Link>
            </div>
        </div>
    )
}

import { Link } from "react-router-dom";
import styled from "styled-components";
import Subtitle from "./Subtitle";
import Paragraph from "./Paragraph";
const HeroHeading = styled.h1`
    margin-top: 2rem;
    background-color: white;
    text-transform: capitalize;
    background-position: 50%;
    background-repeat: repeat;
    -webkit-text-fill-color: transparent;
    background-image: url("/backs/heading-texture_1heading-texture.webp");
    background-clip: text;
    font-size: 55px;
    font-weight: 700;
    letter-spacing: -.03em;
    line-height: 50px;
    @media screen and (max-width: 991px) {
        font-size: 30px;
        line-height: 34px;
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
        min-width: 450px;
        font-size: 28px;
        line-height: 35px;
        padding: 20px 52px;
        width: auto;
    }
`

export default function LeftContent2({top, title, p, button, cutted}) {
    return (
        <div className={`${cutted?"w-2/5":"w-1/2"}`}>
            <Subtitle top ={top}/>
            <HeroHeading dangerouslySetInnerHTML={{ __html: title }}/>   
            <Paragraph p={p}/>
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

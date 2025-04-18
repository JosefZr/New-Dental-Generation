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
    font-size: 30px;
    line-height: 34px;
    font-weight: 700;
    letter-spacing: -.03em;
`
export default function TexturedText({title}) {
    return (
        <Texture className="mt-2 capitalize text-center">{title}</Texture>
    )
}

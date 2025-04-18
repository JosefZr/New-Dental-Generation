import styled from "styled-components"

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
export default function Paragraph({p}) {
    return (
        <P className={` mt-8 max-w-[408px]`} dangerouslySetInnerHTML={{ __html: p }} />
    )
}

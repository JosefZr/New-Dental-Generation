import styled from "styled-components"
import { Subscribers } from "."

const ButtonWrap = styled.div`
    z-index: 5;
    grid-column-gap: .75rem;
    grid-row-gap: .75rem;
    flex-direction: column;
    align-items: center;
    display: flex;
    position: relative;
`
const Button = styled.div`
    line-height: 1;

`
// const ButtonText = styled.div`
//     /* background-color: #41391a; */
//     padding: .9rem 1.8rem;
//     transition: padding .2s;
//     @media screen and (max-width: ${size.laptopL}){
//         /* background-color: #41391a; */
//         padding: .9rem 1.8rem;
//         transition: padding .2s;
//     }
    
// `

export default function CtaButton() {
    return (
        <ButtonWrap>
            <Button>
            <button className="cta-button">Build_Your_Dental_Network</button>

            </Button>
            <Subscribers/>

        </ButtonWrap>
    )
}

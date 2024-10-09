import { size } from "@/lib/mediaQuerys"
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
const Button = styled.button`
    z-index: 5;
    grid-column-gap: .63rem;
    grid-row-gap: .63rem;
    color: var(--white);
    text-align: center;
    border: 2px solid #ffbb3836;;
    background-image: linear-gradient(135deg, #ffcf23, #ff8d3a);
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    transition: filter .5s, box-shadow .2s;
    display: flex;
    position: relative;
    overflow: hidden;
    transition: all .2s;
    box-shadow: 0 0 40px #ffbb3836;
    &:hover{
        padding: .1rem 1.2rem;
        box-shadow:20px 10px 50px #ffcf23be
    }
`
const ButtonText = styled.div`
    /* background-color: #41391a; */
    padding: .9rem 1.8rem;
    transition: padding .2s;
    @media screen and (max-width: ${size.laptopL}){
        /* background-color: #41391a; */
        padding: .9rem 1.8rem;
        transition: padding .2s;
    }
    
`

export default function CtaButton() {
    return (
        <ButtonWrap>
            <Button>
                <ButtonText>Build Your 🦷Network</ButtonText>
            </Button>
            <Subscribers/>

        </ButtonWrap>
    )
}

import styled from "styled-components"
import { TiDirections } from "react-icons/ti";
const IconVs = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--whiteGray);
  display: flex;
  position: relative;
  top: 400px;
  @media screen and (max-width:991px){
    display: none;
  }
`
export default function Vs() {
  return (
    <IconVs>
        <TiDirections className=" w-[5.125rem] h-auto"/>
    </IconVs>
  )
}

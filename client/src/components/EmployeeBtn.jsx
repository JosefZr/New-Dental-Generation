import { useTranslation } from "react-i18next"
import styled from "styled-components"

const Employee = styled.div`
    background: #212833;
    display: flex;
    justify-content: center;
    border: 3px solid #212833;
    align-items: center;
    justify-items: center;
    text-align: center;
    overflow: hidden;
    position: relative;
`
const Button = styled.button`
  background: #212833;
    font-size: 20px;
    line-height: 25px;
    font-weight: 400;
    text-align: right;
    color: hsla(0, 0%, 100%, .5);
    text-align: center;
`
// eslint-disable-next-line react/prop-types
export default function EmployeeBtn({actor}) {
  const {t} = useTranslation()
  return (
    <Employee className="py-[10px] w-auto duration-500 transition-all">
      <Button className="uppercase bad duration-500 transition-all"> {t(`${actor}.plans.free.cta`)}</Button>
    </Employee>
  )
}

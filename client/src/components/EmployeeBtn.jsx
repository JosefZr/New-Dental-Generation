import { useTranslation } from "react-i18next"
import styled from "styled-components"

const Employee = styled.button`
    background-color: #ffffff26;
    color: var(--whiteGray);
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3.6rem;
    margin-top: auto;
    padding: 1rem 1rem;
    font-size: 1.1rem;
    font-weight: 500;
    display: flex;
`
// eslint-disable-next-line react/prop-types
export default function EmployeeBtn({actor}) {
  const {t} = useTranslation()
  return (
    <Employee>
      {t(`${actor}.plans.free.cta`)}
    </Employee>
  )
}

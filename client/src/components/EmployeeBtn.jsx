import styled from "styled-components"

const Employee = styled.button`
    background-color: #21283322;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3.6rem;
    margin-top: auto;
    padding: 1rem 3rem;
    font-size: 1.1rem;
    font-weight: 500;
    display: flex;
`
export default function EmployeeBtn() {
  return (
    <Employee>
      Join for free
    </Employee>
  )
}

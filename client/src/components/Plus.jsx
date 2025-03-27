import { MdFiberNew } from "react-icons/md";
import styled from "styled-components";

const Icon = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 5rem; /* Increased size */
  height: 5rem; /* Increased size */
  margin-bottom: 2rem;
  display: flex;
  margin: 0 auto;
  padding-bottom: 10px;
`;

export default function Plus() {
  return (
    <Icon>
      <MdFiberNew/>
    </Icon>
  );
}

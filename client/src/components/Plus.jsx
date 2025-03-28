import { MdOutlineFiberNew } from "react-icons/md";
import styled from "styled-components";

const Icon = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 0 auto;
  padding-bottom: 5rem;
`;

export default function Plus() {
  return (
    <Icon>
      <MdOutlineFiberNew className="text-[40px] w-16 h-9 rounded-xl bg-my-red"
      />
    </Icon>
  );
}

import styled from "styled-components";

const Logo = styled.div`
    background-position: center center;
    background-size: cover;
`;
// eslint-disable-next-line react/prop-types
export default function ProfileImage({image}) {
  return (
    <div className="h-[60px] w-[60px] rounded-full">
      <Logo
          className="h-full w-full rounded-full"
          style={{ backgroundImage: `url(http://localhost:3000/uploads/${image})` }}
          />
    </div>
    
  )
}

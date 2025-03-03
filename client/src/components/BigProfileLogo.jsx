import styled from "styled-components";

export const Logo = styled.div`
    background-position: center center;
    background-size: cover;
`;
export default function BigProfileLogo({image}) {
  return (
    <>
    {image ==="http://localhost:5173/public/default-avatar.jpg" ?
    (
      <Logo
        className="h-full w-full rounded-full"
        style={{ backgroundImage: `url(http://localhost:5173/public/default-avatar.jpg)`,width:"51px", height:"51px" }}
      />
    )
    :(
      <Logo
      className="h-full w-full rounded-full"
      style={{ backgroundImage: `url(${import.meta.env.VITE_SERVER_API}/uploads/${image})`,width:"51px", height:"51px" }}
    />
    )}
    </>
  )
}

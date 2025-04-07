import styled from "styled-components";

export const Logo = styled.div`
    background-position: center center;
    background-size: cover;
`;
export default function BigProfileLogo({image}) {
  return (
    <>
    {image ===`/default-avatar.webp` ?
    (
      <Logo
        className="h-full w-full rounded-full"
        style={{ backgroundImage: `url(/default-avatar.webp)`,width:"51px", height:"51px" }}
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

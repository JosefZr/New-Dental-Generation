import styled from "styled-components";

export const Logo = styled.div`
    background-position: center center;
    background-size: cover;
`;
export default function SmallProfileLogo({image}) {
    return (
        <>
        {image ===`/default-avatar.webp` ?
        (
            <Logo
                className="rounded-full object-cover"
                style={{ 
                    backgroundImage: `url(/default-avatar.webp)` ,
                    width:"40px",
                    height:"40px"
                }}
            />
        )
        :(
            <Logo
            className="rounded-full object-cover"
            style={{ 
                backgroundImage: `url(${import.meta.env.VITE_SERVER_API}/uploads/${image})`, 
                width:"40px",
                height:"40px"
            }}
        />
        )}
        </>
    )
}

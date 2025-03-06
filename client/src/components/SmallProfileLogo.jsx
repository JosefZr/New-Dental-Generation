import styled from "styled-components";

export const Logo = styled.div`
    background-position: center center;
    background-size: cover;
`;
export default function SmallProfileLogo({image}) {
    return (
        <>
        {image ===`${import.meta.env.VITE_SERVER_API}/default-avatar.jpg` ?
        (
            <Logo
                className="rounded-full object-cover"
                style={{ 
                    backgroundImage: `url(${import.meta.env.VITE_SERVER_API}/default-avatar.jpg)` ,
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

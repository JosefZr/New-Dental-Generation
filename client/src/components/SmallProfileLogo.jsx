import styled from "styled-components";

export const Logo = styled.div`
    background-position: center center;
    background-size: cover;
`;
export default function SmallProfileLogo({image}) {
    return (
        <>
        {image ==="http://localhost:5173/public/default-avatar.jpg" ?
        (
            <Logo
                className="rounded-full object-cover"
                style={{ 
                    backgroundImage: `url(http://localhost:5173/public/default-avatar.jpg)` ,
                    width:"40px",
                    height:"40px"
                }}
            />
        )
        :(
            <Logo
            className="rounded-full object-cover"
            style={{ 
                backgroundImage: `url(http://localhost:3000/uploads/${image})`, 
                width:"40px",
                height:"40px"
            }}
        />
        )}
        </>
    )
}

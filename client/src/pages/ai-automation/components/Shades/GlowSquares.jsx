
export default function GlowSquares() {
    return (
        <div>
        <div 
            className=" top-0 left-0 w-[50px] h-[50px] pointer-events-none"
            style={{position:"absolute",background: "radial-gradient(129.3% 129.3% at 2.03% 8.33%, rgba(255, 255, 255, 0.21) 0%, rgba(24, 27, 38, 0.24) 100%)"}}
        ></div>
        <div 
            className=" top-0 right-0 w-[50px] h-[50px] pointer-events-none"
            style={{position:"absolute",background: "radial-gradient(129.3% 129.3% at 2.03% 8.33%, rgba(255, 255, 255, 0.21) 0%, rgba(24, 27, 38, 0.24) 100%)"}}
        ></div>
        <div 
            className=" bottom-0 left-0 w-[50px] h-[50px] pointer-events-none"
            style={{position:"absolute",background: "radial-gradient(129.3% 129.3% at 2.03% 8.33%, rgba(255, 255, 255, 0.21) 0%, rgba(24, 27, 38, 0.24) 100%)"}}
        ></div>
        <div 
            className=" bottom-0 right-0 w-[50px] h-[50px] pointer-events-none"
            style={{position:"absolute",background: "radial-gradient(129.3% 129.3% at 2.03% 8.33%, rgba(255, 255, 255, 0.21) 0%, rgba(24, 27, 38, 0.24) 100%)"}}
        ></div>
        </div>
    )
}

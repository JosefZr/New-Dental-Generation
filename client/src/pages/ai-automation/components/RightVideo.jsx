import styled from "styled-components"

const Special = styled.h1`
    color: hsla(0, 0%, 100%, .21);
    font-size: 10px;
    line-height: 30px;
    letter-spacing: -3%;
    @media screen and (max-width: 991px) {
        display: none;
    }
`
export default function RightVideo() {
    return (
        <div className="w-1/2 pl-[60px]">
            <figure className=" w-full h-[100%] group" style={{position:"relative"}}>
                <Special className="top-[-48px] left-[calc(50%-42px)] capitalize" style={{position:"absolute"}}>Your website is your waiting room.</Special>
                <div className="h-[100%]" style={{position:"relative"}}>
                    <div className=" w-full  h-[100%]" style={{position:"relative"}}>
                        <div style={{position:"relative"}} className="max-w-[100%] h-[100%]">
                            <div className="w-full h-full hidden lg:block" style={{position:"relative", paddingTop:"56.338%"}}>
                                <iframe 
                                    src="https://vimeo.com/1046354505/fe92c2a68a" 
                                    frameBorder="0"
                                    height={"100%"}
                                    width={"100%"}
                                    style={{
                                        position:"absolute",
                                        top:0,
                                        width:"100%",
                                        height:"100%",
                                    }}
                                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                    allowFullScreen="true"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <img 
                    src="https://www.cobratate.com/jointherealworld/hero_frame.png" 
                    alt="Hero Overlay" 
                    loading="lazy" 
                    width={583} 
                    height={723} 
                    decoding="async"  
                    style={{position:"absolute", color:"transparent"}}
                    className="top-[-20px] left-[-20px] pointer-events-none max-w-none w-[calc(100%+40px)] h-[calc(100%+40px)]"
                />
            </figure>
        </div>
    )
}

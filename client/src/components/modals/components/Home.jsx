import SmallWelcom from "./SmallWelcom";
import SmallProgress from "./SmallProgress";
import SmallBalence from "./SmallBalence";
import SmallCoat from "./SmallCoat";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function Home({handleClose}) {
    const navigate = useNavigate()
  return (
    <div className="carousel carousel-center relative h-[calc(100dvh-7rem)] w-[100dvw] overflow-y-hidden overscroll-none"
        style={{scrollSnapStop:"always",overflowAnchor:"auto",scrollSnapAlign:"start"}}
    >
        <div className="relative size-full animate-fade-in">
            <div 
                className="scrollbar-custom  flex h-full w-full flex-col items-stretch justify-start gap-5 overflow-y-scroll overscroll-y-none bg-next-midnight p-6 swipe-dialog-scroll-descendant"
                style={{backgroundColor:"rgb(6 14 21 )"}}
            >
                <SmallWelcom/>
                <SmallProgress/>
                <SmallBalence/>
                <SmallCoat handleClose={handleClose}/>
                <div className="absolute inset-x-0 bottom-0 z-20 flex w-full px-5 h-[calc(3.5rem+45px)] pb-[45px] bg-gradient-to-t from-[#060E15] via-[#060E15]/75 to-transparent">
                    <button className="btn h-[3.5rem] rounded-lg w-full bg-[rgb(13 26 37)] font-semibold text-primary gap-2 btn-outline" style={{
                        borderColor:"var(--gold)",
                        borderWidth:"1px",
                        color:"var(--gold)",
                        backgroundColor:"rgb(13 26 37)",
                        boxShadow:"rgb(0, 0, 0) 0px 20px 20px -20px"
                    }}
                        onClick={()=>{
                            handleClose()
                            navigate("/channels")
                        }}
                    >
                        <span>Enter Your Dental Network</span>
                        <FaLongArrowAltRight />
                    </button>
                    </div>

            </div>
            </div>
        </div>
  )
}



export default function Lines() {
  return (
    <>
            <div style={{position:"relative"}} className="w-full max-w-[1280px] mx-auto hidden lg:block">
                {/* centered line */}
                <div className="hidden lg:block glow-b z-0 lg:!top-[-200px]"></div>
                <div className="mx-auto  h-[30px] w-[1px]" style={{position:"relative", background:"linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.25))"}}></div>
                {/* the 2 left and right lines */}
                <div className="h-[1px] w-[54%] bg-white/25 mx-auto " style={{position:"relative"}}>
                <div style={{position:"absolute"}} className=" top-0 left-0 h-[100px] w-[1px] bg-white/25">
                    <div style={{position:"absolute"}} className="bottom-[-60px] lg:bottom-[-15px] left-[-7px] border-[1px] rounded-full p-[5px] border-white/25">
                    <div className="w-[3px] h-[3px] rounded-full bg-white/25">
                    </div>
                    </div>
                </div>
                <div style={{position:"absolute",background:"linear-gradient(rgba(255, 255, 255, 0.25), var(--redClaire)"}} className=" top-0 right-0 h-[100px] w-[1px]">
                        <div style={{position:"absolute"}} className="bottom-[-60px] lg:bottom-[-15px] right-[-7px] border-[1px] rounded-full p-[5px] border-my-red">
                            <div className="w-[3px] h-[3px] rounded-full bg-my-red"></div>
                        </div>
                </div>
                </div>
    </div>
        <div className="w-[90%]  max-w-[1280px] mx-auto lg:hidden">
        <div style={{position:"relative",background:"linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.25))"}} className="mx-auto h-[30px] w-[1px]"></div>
        <div style={{position:"relative"}} className="h-[1px] w-[50%] bg-white/25 mx-auto  ml-0">
        <div  className=" top-0 left-0 h-[60px] w-[1px] bg-white/25">
            <div style={{position:"absolute"}} className="bottom-[-60px] lg:bottom-[-15px] left-[-7px] border-[1px] rounded-full p-[5px] border-white/25">
            <div className="w-[3px] h-[3px] rounded-full bg-white/25">
                <div style={{position:"absolute",background:"linear-gradient(rgba(255, 255, 255, 0.25), var(--redClaire)"}} className=" top-[14px] left-[6px] h-[300px] w-[1px]" >
                <div style={{position:"absolute"}} className="bottom-[-15px] right-[-7px] border-[1px] rounded-full p-[5px] border-my-red">
                    <div className="w-[3px] h-[3px] rounded-full bg-my-red"></div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

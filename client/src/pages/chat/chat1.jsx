import Devider from "@/components/chatComponents/Devider";
import Message from "@/components/chatComponents/Message";
import { FaArrowDown, FaArrowUp, FaHashtag } from "react-icons/fa6";
import { TbPinnedFilled } from "react-icons/tb";

export default function Chat1() {
  return (
    <div className="flex h-full flex-col bg-neutral-950">
      <div className="z-20 flex flex-col flex-1">
        <div className="relative h-full flex-1 bg-neutral">
          <div className="absolute top-0 right-0 left-0 z-20 flex flex-col">
            {/* for the title of the channel */}
          <header 
            className="flex flex-shrink-0 items-end justify-between !pt-0 relative z-10 border-grey-secondary border-b bg-base-300"
            style={{height:"48px",minHeight:"48px",maxHeight:"48px",paddingTop:0}}
          >
            <section className="flex h-full w-full items-center justify-between pl-3">
              <div className="flex w-full items-center font-medium">
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center gap-3 font-medium">
                    <span className="flex items-center gap-[2px]">
                      <FaHashtag />
                      | start-here
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </header>

          {/* for the pinned messages */}
          <header className=" flex flex-shrink-0 items-end justify-between !pt-0 relative z-10 border-grey-secondary border-b bg-base-300"  
            style={{height:"60px",minHeight:"60px",maxHeight:"60px",paddingTop:0}}>
            <section className="flex h-full w-full items-center justify-between">
              <div className="flex w-full items-center font-medium bg-slate-600 ">
                <div className="flex items-center justify-center gap-3 ">
                  <button className=" transition-all px-5 py-2 rounded-lg my-2 ml-2 btn-sm border-my-gold  hover:bg-my-gold  text-my-gold hover:text-my-black" style={{border:"1px solid var(--gold)"}}><TbPinnedFilled  className="text-2xl "/></button>
                  <div className="line-clamp-2 cursor-pointer text-xs">
                    <div className="text-my-gold font-bold text-base">Pinned Message</div>
                    <span className="line-clamp-1 text-caption">Good morning students...</span>
                  </div>
                </div>
              </div>
            </section>
          </header>

          {/* for the new messages not watched */}
          <div className="absolute top-[108px] right-0 left-0 z-[11] user-select-none flex h-[28px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap bg-indigo-800 bg-opacity-80 px-3 font-semibold text-accent-content text-md backdrop-blur-[20px] backdrop-filter transform cursor-pointer transition-all duration-200 translate-y-0 opacity-100">
            <div>New since  5 days ago</div>
            <div className="flex items-center"> Jump to unread <FaArrowUp className="ml-2"/></div>
          </div>
          </div>
          

          {/* for the chat  */}
          <div className="absolute translate-y-0 opacity-100" style={{top:"48px", left:"0", width:"100%",bottom:"66px",}}>
            <div className="z-10 overflow-y-auto overflow-x-hidden transition-transform duration-keyboard will-change-transform" style={{height:"575px"}}>
              <div className="viewport relative will-change-transform translate-y-0 " >
                <div className="w-full">
                <Message/>
                <Devider/>
                <Message/>
                <Devider/>
                <Message/>
                <Devider/>
                <Message/>
                <Devider/>
                <Message/>
                <Devider/>
                </div>
              </div>
            </div>
        </div>
          {/* for the input of the message */}
          <div className="absolute right-0 bottom-0 left-0 z-20 flex flex-col">
            <footer className="relative mb-inset-bottom   z-20 w-full bg-base-100 transition-transform duration-keyboard translate-y-0" style={{paddingBottom:"0px"}}>
              {/* this for the user when he scroll up he can return and scroll to the present msg */}
              <div className="w-full user-select-none flex h-[28px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap bg-opacity-80 px-3 font-medium text-sm backdrop-blur-[20px] backdrop-filter  z-100 mb-inset-bottom transform cursor-pointer transition-all duration-75 bg-base-300 text-base-content translate-y-0 opacity-100 bottom-full">
                <div>Viewing older messages</div>
                <div className="flex items-center">See present <FaArrowDown className="ml-2"/></div>
              </div>

              {/* for the input  */}
              <div className="flex flex-shrink-0  w-full items-center gap-3 border-gray-700 border-t px-3 py-2">
                <button className=" relative bg-neutral-950 flex-shrink-0 cursor-pointer overflow-hidden rounded-full p-1" style={{backgroundColor:"hsl(211.3 46.939% 9.6078% / 1 !important) !important"}}>
                  <input type="file" accept="image/*,video/*,audio/*,text/*,application/*,.mp3, .wav, .ogg, .mp4, .mov, .avi, .mkv, .webm, .m4a, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .json" className="absolute bg-my-white opacity-0 shadow-xl"/>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform transition-all "><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <form className="relative block min-h-[32px] rounded-2xl bg-neutral-950 flex-1">
                  <textarea  id="chat-input"className=" top-0 left-0 resize-none border-none bg-transparent px-3 py-[6px] text-sm outline-none  w-full" placeholder="Message #⭐ | lifestyle-flexing" style={{height:"32px"}}></textarea>
                </form>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
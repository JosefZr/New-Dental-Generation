import { TbPinnedFilled } from "react-icons/tb";

export default function PinnedChats() {
  return (
    <header
        className=" flex flex-shrink-0 items-end justify-between !pt-0 relative z-10 border-grey-secondary border-b bg-base-300"
        style={{
            height: "60px",
            minHeight: "60px",
            maxHeight: "60px",
            paddingTop: 0,
        }}
        >
        <section className="flex h-full w-full items-center justify-between">
            <div className="flex w-full items-center font-medium bg-slate-600 ">
            <div className="flex items-center justify-center gap-3 ">
                <button
                className=" transition-all px-5 py-2 rounded-lg my-2 ml-2 btn-sm border-my-gold  hover:bg-my-gold  text-my-gold hover:text-my-black"
                style={{ border: "1px solid var(--gold)" }}
                >
                <TbPinnedFilled className="text-2xl " />
                </button>
                <div className="line-clamp-2 cursor-pointer text-xs">
                <div className="text-my-gold font-bold text-base">
                    Pinned Message
                </div>
                <span className="line-clamp-1 text-caption">
                    Good morning students...
                </span>
                </div>
            </div>
            </div>
        </section>
    </header>
    )
}

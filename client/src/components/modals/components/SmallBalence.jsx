import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { GiCrownCoin } from "react-icons/gi";

export default function SmallBalence() {
      const { user } = useContext(UserContext);
    
  return (
    <div className="Card Card-side gap-4 bg-gradient-to-b from-[rgba(255,255,255,0.15)] to-[rgba(153,153,153,0.087)] p-4 transition-all duration-500 hover:to-[rgba(153,153,153,0.087)]">
        <div className="size-[3.5rem] rounded-full bg-[#ECC870]">
            <div className="m-[0.4rem] flex size-[calc(100%-0.8rem)] items-center justify-center rounded-full bg-[#FFDB84]">
                <GiCrownCoin className=" text-black bg-transparent" style={{height:"35px", width:"35px"}}/>
            </div>
        </div>
        <section className="flex min-h-[40px] flex-1 flex-col items-baseline justify-between sm:min-h-[56px] ">
            <div className="font-light text-xl opacity-80">Balance: </div>
            <div className="card-title !mb-0">
                <div className="flex flex-row items-baseline font-semibold text-2xl">{user.coin} 
                    <div className="font-normal text-xl opacity-60 ml-1"> YDN Coins</div>
                </div>
            </div>
        </section>
    </div>
  )
}

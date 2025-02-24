
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useAuthUser } from "@/hooks/jwt/useAuthUser";

import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { useNavigate } from "react-router-dom";

export default function Limitations() {
  const { isOpen, onClose, type } = useModal();
  const navigate = useNavigate()
  const  userInfo = useAuthUser()
  const isModalOpen = isOpen && type === MODAL_TYPE.LIMITATION_MODAL;
  const handleLimitation = ()=>{
    onClose();
    navigate(`/profile/${userInfo.userId}`)
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl  bg-my-dark-blue p-0 text-white border-[1px] border-my-gold">
        {/* Matrix-style background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0  opacity-10"></div>
        </div>

        <div className="flex flex-col items-center gap-2 p-6 max-sm:p-1">
          {/* Spinning loader */}
          <div className="relative h-28 w-28 max-sm:w-20 max-sm:h-20">
            <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
            <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin"></div>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="space-y-2">
              <p className="text-lg max-sm:text-sm font-medium">Wait… What Just Happened? </p>
              <p className="text-white/80 max-sm:text-sm">You were about to access something BIG—but it’s locked. </p>
              <p className="text-white/80 max-sm:text-sm">Why? Because this feature is only for Zirconium Plan members—the dentists who know that playing small won’t get them far.</p>
              <p className="text-white/80 max-sm:text-sm">Now, you’ve got two options:</p>
              <p className="text-white/80 max-sm:text-sm">
              01- Close this page and pretend you didn’t just see the door to next-level growth.
              </p>
              <p className="text-white/80 max-sm:text-sm">02- Upgrade now and unlock the cheat codes to double your monthly profit.</p>
            </div>
            <br />
            <div  style={{position:"relative"}}>
            <div className="backdrop-modal "></div>
            <button className="buttonCheckout-limit" onClick={handleLimitation}>
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="text">UPGRADE NOW & JOIN THE WINNERS!</div>
            </button>
            </div>
            <br />
            <p className="mt-4 text-white/80 max-sm:text-sm">
            P.S: For less than the price of a single patient visit, you’ll get access to strategies that can 10X your income.
            </p>

            <div className=" text-sm">
              
              <button onClick={onClose} className="mt-2 text-white/60 hover:text-white">
                Logout
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


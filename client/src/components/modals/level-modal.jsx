
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { CoursesContext } from "@/context/CoursesContext";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";

import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { progress } from "../Profile/Preview";
import { UserContext } from "@/context/UserContext";

export default function LevelModal() {
  const { isOpen, onClose, type } = useModal();
  const navigate = useNavigate()
  const  userInfo = useAuthUser()
  const isModalOpen = isOpen && type === MODAL_TYPE.LEVEL_MODAL;
  const handleLimitation = ()=>{
    onClose();
    navigate(`/profile/${userInfo.userId}`)
  }
  const getRank = (days) => {
    if (days < 180) return "Silver";
    if (days < 330) return "Gold";
    if (days < 450) return "Platinum";
    if (days < 540) return "Diamond";
    return "Diamond King";
};
const{user} = useContext(UserContext)
  const {studentViewCourseDetails} = useContext(CoursesContext)

  const studentLevel = studentViewCourseDetails?.level ?? 0; // Default to 0 if null or undefined

  const currentProgress = progress.find(stage => 
      studentLevel <= stage.maxDays
  ) || progress[progress.length - 1];
  
  const nextProgress = progress.find(stage => 
      stage.progress > currentProgress.progress
  ) || currentProgress;
  
  const getDaysDifference = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    
    // Reset time portion to ensure accurate day calculation
    created.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    
    const diffTime = Math.abs(now - created);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

const diffDays = getDaysDifference(user.createdAt);
const rank = getRank(studentLevel);

  // Find current progress stage

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl border-0 bg-[#0a1520]/95 p-0 text-white">
        {/* Matrix-style background */}
        <DialogTitle>
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0  opacity-10"></div>
        </div>
        </DialogTitle>
        <div className="flex flex-col items-center gap-2 p-6 max-sm:p-1">
          {/* Spinning loader */}
        <div className="relative h-28 w-28 max-sm:w-20 max-sm:h-20">
            <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
            <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin"></div>
        </div>

          {/* Content */}
        <div className="flex flex-col items-center gap-1 text-center">
            <div className="space-y-2">
                <p className="text-lg max-sm:text-sm font-medium">This Lesson is Locked... But Not for Long!</p>
                <p className="text-white/80 max-sm:text-sm">Unlock knowledge worth $3,596 at [Level {rank} {nextProgress.name}] (after {studentLevel-diffDays} days on YDN). </p>
                <p className="text-white/80 max-sm:text-sm">Keep learning, keep progressing, and this valuable knowledge will be yours before you know it!</p>
                <p className="text-white/80 max-sm:text-sm">In the meantime, check out DENTAL-$-CHEAT-CODES. 
                <button  
                  className="hover:underline"
                  onClick={()=>{
                    
                  navigate("/channels")
                  onClose()
                }}>[Link to channels]</button> </p>
                
            </div>
            <br />
            <div className="backdrop "></div>
            <button className="buttonCheckout-limit" onClick={handleLimitation}>
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="text">Track Your Progress</div>
            </button>
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


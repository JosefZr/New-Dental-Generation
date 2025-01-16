import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";

import { IoMdClose } from "react-icons/io";
import Welcome from "./components/Welcome";
import Carousels from "./components/Carousels";
import DAilyCheckList from "./components/DAilyCheckList";

export default function BireModal() {
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === MODAL_TYPE.BIR;
    
    const handleClose = () => {
        onClose();
    };
    return (
    <Dialog open={isModalOpen} onOpenChange={handleClose} className="modal-container pointer-events-auto fixed inset-0 flex transform cursor-auto justify-center transition-all duration-[250ms] lg:items-center items-center animate-scale-fade-in" style={{
        animationFillMode:"both"
    }}>
        <DialogContent  className="flex flex-col bg-neutral sm:w-full lg:rounded-lg mx-auto shadow-xl w-full max-h-[95%] md:w-[100dvw] md:h-[100dvh] pointer-events-auto overflow-hidden rounded-t-3xl md:max-h-[93dvh] md:max-w-[93dvw] md:rounded-lg md:border md:border-primary md:border-solid">
            <div className="max-md:hidden grid w-full grid-flow-row grid-cols-6 grid-rows-12 gap-3 bg-next-midnight px-5 h-full md:[&>_*]:[zoom:95%] xl:[&>_*]:[zoom:90%]">
                <div className="absolute top-[-48px] right-2 z-10 flex items-center justify-end sm:top-1">
                    <button
                        className="h-[2rem] w-[2rem] rounded-full px-1 bg-slate-950 text-center"
                        onClick={handleClose}
                        >
                        < IoMdClose className=" text-2xl text-my-white"/>
                    </button>
                </div>
                <Welcome/>
                <Carousels handleClose={handleClose}/>
                <DAilyCheckList/>
            </div>
            <div className="hideen z-[10] max-md:flex h-full min-h-full w-[100dvw] flex-col" >
                <div className="flex h-auto w-full flex-col swipe-dialog-scroll-descendant"> 
                    <div className="flex w-full items-center justify-end px-3">
                    <button
                        className="h-[2rem] w-[2rem] rounded-full px-1 bg-slate-950 text-center"
                        onClick={handleClose}
                        >
                        < IoMdClose className=" text-2xl text-my-white"/>
                    </button>
                    </div>
                    <div className="flex h-auto w-full justify-stretch"></div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
)
}

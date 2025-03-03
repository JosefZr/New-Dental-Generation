import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogFooter } from "../../components/ui/dialog";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { Button } from "../ui/button";

export default function ProffessionModal() {
    const { user } = useContext(UserContext);
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === MODAL_TYPE.PROFFESSION;
    return (
        <Dialog  open={isModalOpen} onOpenChange={onClose} className="border-none border-black">
            <DialogContent className="border-none rounded-none text-white p-0 overflow-hidden bg-my-dark-blue">
                <DialogHeader className="bg-slate-800 flex flex-row px-10 h-[50px] flex-shrink-0 items-center justify-between border-b border-slate-700 capitalize">
                    <DialogTitle className="flex flex-1 items-center font-bold text-my-white">
                        Proffession
                    </DialogTitle>
                </DialogHeader>
                    <div className="mt-3 dialog-body m-3 overflow-y-auto overflow-x-hidden bg-neutral lg:m-4 swipe-dialog-scroll-descendant flex flex-col">
                        <div>
                            <img 
                            src={`${import.meta.env.VITE_SERVER_API}/uploads/proffession/${user.proofOfProfession}`} 
                            alt="proffession" 
                            height="100%" 
                            width="100%" 
                            className="object-cover h-full w-full"
                        />
                        </div>
                    </div>
                    <DialogFooter>
                    <Button
                        className="btn btn-ghost text-my-black" 
                        onClick={onClose} 
                    >
                        Close
                    </Button>
                    </DialogFooter>

            </DialogContent>

        </Dialog>
    )
}

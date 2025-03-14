import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogFooter } from "../../components/ui/dialog";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { Button } from "../ui/button";
import { deleteUser } from "@/services";
import toast from "react-hot-toast";

export default function DeleteMessage() {
    const { user } = useContext(UserContext);
    const { setUsers} = useContext(UserContext)
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === MODAL_TYPE.DELETE_MESSAGE;
    const handleDeleteMessage = async()=>{
        try{
            const response = await deleteUser(user._id)
            if(response?.success){
                setUsers(response.data)
                toast.success(response?.message)
                onClose();
            }
            else{
                toast.error(response?.message)
            }
        }catch(error){
            console.log(error)
        }
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} className="border-none border-black">
            <DialogContent className="border-none rounded-none text-white p-0 overflow-hidden bg-my-dark-blue">
                <DialogHeader className="bg-slate-800 flex flex-row px-10 h-[50px] flex-shrink-0 items-center justify-between border-b border-slate-700 capitalize">
                    <DialogTitle className="flex flex-1 items-center font-bold text-my-white">
                        delete User
                    </DialogTitle>
                </DialogHeader>
                    <div className="mt-3 dialog-body m-3 overflow-y-auto overflow-x-hidden bg-neutral lg:m-4 swipe-dialog-scroll-descendant flex flex-col">
                        <div>
                            do U Want realy Want to Delete this Chat
                        </div>
                    </div>
                    <DialogFooter className="flex flex-shrink-0 justify-end gap-3 border-slate-800 border-t p-2 md:p-4">
                    <Button
                        className="btn btn-ghost text-my-black" 
                        onClick={onClose} 
                    >
                        Close
                    </Button>
                    <Button
                        className="btn btn-ghost text-my-white bg-red-800 " style={{background:"red"}} 
                        onClick={handleDeleteMessage} 
                    >
                        delete
                    </Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogFooter } from "../ui/dialog";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function LogoutModal() {
    const navigate = useNavigate()
    const {setUser } = useContext(UserContext);
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === MODAL_TYPE.LOGOUT_MODAL;
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token'); // Get JWT from storage
            
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/logout`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
        
            if (!response.ok) throw new Error('Logout failed');
        
            // Clear client-side storage
            localStorage.removeItem('token');
            setUser(null);
            navigate('/login');
            onClose()
            } catch (error) {
            console.error('Logout error:', error);
            // Optional: Show error message to user
            }
        };
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} className="border-none border-black rounded-none">
            <DialogContent className="border-none rounded-none text-white p-0 overflow-hidden bg-my-dark-blue">
                <DialogHeader className="bg-slate-800 flex flex-row px-10 h-[50px] flex-shrink-0 items-center justify-between border-b border-slate-700 capitalize">
                    <DialogTitle className="flex flex-1 items-center font-bold text-my-white">
                        Logout
                    </DialogTitle>
                </DialogHeader>
                    <div className="dialog-body m-3 overflow-y-auto overflow-x-hidden bg-neutral lg:m-4 swipe-dialog-scroll-descendant">
                        <div>
                            Are you sure you want to logout of this device?
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
                        onClick={handleLogout} 
                    >
                        Logout
                    </Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogFooter } from "../ui/dialog"
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore"
import { UserContext } from "@/context/UserContext"
import { useContext } from "react"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"

export default function LogoutModal() {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    const { isOpen, onClose, type } = useModal()
    const isModalOpen = isOpen && type === MODAL_TYPE.LOGOUT_MODAL

    const handleLogout = async () => {
        try {
        const token = localStorage.getItem("token") // Get JWT from storage

        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/logout`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: token,
            },
        })

        if (!response.ok) throw new Error("Logout failed")

        // Clear client-side storage
        localStorage.removeItem("token")
        setUser(null)
        navigate("/login")
        onClose()
        } catch (error) {
        console.error("Logout error:", error)
        // Optional: Show error message to user
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} className="border-none border-black rounded-none">
        <DialogContent className="border-none rounded-none text-white p-0 overflow-hidden bg-my-dark-blue w-[95%] max-w-md sm:max-w-lg md:max-w-xl">
            <DialogHeader className="bg-slate-800 flex flex-row px-4 sm:px-6 md:px-10 h-[50px] flex-shrink-0 items-center justify-between border-b border-slate-700 capitalize">
            <DialogTitle className="flex flex-1 items-center font-bold text-my-white text-sm sm:text-base md:text-lg">
                Logout
            </DialogTitle>
            </DialogHeader>
            <div className="dialog-body m-2 sm:m-3 md:m-4 p-2 sm:p-3 md:p-4 overflow-y-auto overflow-x-hidden bg-neutral swipe-dialog-scroll-descendant">
            <div className="text-sm sm:text-base">Are you sure you want to logout of this device?</div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row flex-shrink-0 justify-end gap-2 sm:gap-3 border-slate-800 border-t p-2 sm:p-3 md:p-4">
            <Button className="w-full sm:w-auto btn btn-ghost text-my-black" onClick={onClose}>
                Close
            </Button>
            <Button
                className="w-full sm:w-auto btn btn-ghost text-my-white bg-red-800 hover:bg-red-700"
                style={{ background: "red" }}
                onClick={handleLogout}
            >
                Logout
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}


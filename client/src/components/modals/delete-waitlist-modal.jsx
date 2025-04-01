import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogFooter } from "../ui/dialog";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { Button } from "../ui/button";
import { useDeleteWaitlist } from "@/hooks/leads-waitlists/useDeleteWaitlist";

export default function DeleteWaitlistModal() {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === MODAL_TYPE.DELETE_WAITLIST;
    const deleteWaitlist = useDeleteWaitlist();

    const handleDeleteEmail = () => {
        deleteWaitlist.mutate({ id: data._id });
        onClose()
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} className="border-none border-black">
            <DialogContent className="border-none rounded-none text-white p-0 overflow-hidden bg-my-dark-blue">
                <DialogHeader className="bg-slate-800 flex flex-row px-10 h-[50px] flex-shrink-0 items-center justify-between border-b border-slate-700 capitalize">
                    <DialogTitle className="flex flex-1 items-center font-bold text-my-white">
                        Delete Waitlist
                    </DialogTitle>
                </DialogHeader>
                <div className="mt-3 dialog-body m-3 overflow-y-auto overflow-x-hidden bg-neutral lg:m-4 swipe-dialog-scroll-descendant flex flex-col">
                    <div>
                        Do you really want to delete this waitlist?
                    </div>
                </div>
                <DialogFooter className="flex flex-shrink-0 justify-end gap-3 border-slate-800 border-t p-2 md:p-4">
                    <Button
                        className="btn btn-ghost text-my-black"
                        onClick={onClose}
                        disabled={deleteWaitlist.isLoading}
                    >
                        Close
                    </Button>
                    <Button
                        className="btn btn-ghost text-my-white bg-red-800"
                        style={{ background: "red" }}
                        onClick={handleDeleteEmail}
                        disabled={deleteWaitlist.isLoading}
                    >
                        {deleteWaitlist.isLoading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


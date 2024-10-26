import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { useModal,MODAL_TYPE } from "@/hooks/useModalStore"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Copy, RefreshCcw } from "lucide-react";
import useOrigin from "@/hooks/use-origin";


export default function InviteModal() {
    const {isOpen, onClose, type , data} = useModal();

    const origin = useOrigin();
    const isModalOpen = isOpen && type === MODAL_TYPE.INVITE_PEAPLE;

    // this is for inviting peaple by url

    // const {server} = data;
    // const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
    return (
        <Dialog open ={isModalOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
                {/* <Button variant="outline" className="text-black">create server</Button> */}
            </DialogTrigger>
            <DialogContent className = "bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                        Invite Friend
                    </DialogTitle>
                    <div className=" p-6 ">
                        <Label className="uppercase text-xs font-bold text-my-black ">
                            Server invite link
                        </Label>
                        <div className=" flex items-center mt-2 gap-x-2">
                            <Input 
                                className="bg-zinc-400/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" 
                                // value={inviteUrl}
                            />
                            <Button size="icon">
                                <Copy className="w-4 h-4"/>
                            </Button>
                        </div>
                        <Button variant='link' size="sm" className="text-xs text-zinc-500 mt-4"> 
                            generate a new link
                            <RefreshCcw className=" w-4 h-4 ml-2"/>
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

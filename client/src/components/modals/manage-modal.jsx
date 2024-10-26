import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { useModal,MODAL_TYPE } from "@/hooks/useModalStore"
import { ScrollArea } from "../ui/scroll-area";
import userAvatar from "@/components/ui/userAvatar"
import { Check, Gavel, Loader, Loader2, MoreVertical, Shield, ShieldCheck, ShieldQuestion } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuSubTrigger,DropdownMenuSub  } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuSeparator, DropdownMenuSubContent } from "../ui/dropdown-menu";

export default function ManageMembersModal() {
    const {isOpen, onClose, type , data} = useModal();
    const [loadingId , setLoadingId] = useState()
    const isModalOpen = isOpen && type === MODAL_TYPE.MANAGE_MEMBERS;
    const roleIconMap = {
        "DOCTOR":null,
        "MODERATOR":<ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
        "ADMIN":<ShieldCheck className="h-4 w-4 ml-2 text-rose-500"/>,
    }
    // this is for inviting peaple by url

    // const {server} = data;
    // const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
    return (
        <Dialog open ={isModalOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
                {/* <Button variant="outline" className="text-black">create server</Button> */}
            </DialogTrigger>
            <DialogContent className = "bg-white text-black  overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                        Manage Members
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {/* here we will count out memebers */}
                        {/* {server?.members?.length?.length} */}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {/*  this is for handelling roles for user */}
                    {/* {Server?.members?.map((member, index)=>{
                        <div key={member.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={member.profile.imageUrl}/>
                            <div className="flex flex-col gap-y-1">
                                <div className=" text-xs font-semibold flex items-center gap-x-1">
                                    {member.profile.name}
                                    {roleIconMap[member.role]}
                                </div>
                                <p className=" text-xs text-zinc-500">
                                    {member.profile.email}
                                </p>
                                <div>
                                    {Server.profileId !== member.profileId && loading !== member.id && (
                                        <div className="ml-auto">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <MoreVertical className="h-4 w-4 text-zinc-500"/>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent side="left">
                                                    <DropdownMenuSub>
                                                        <DropdownMenuSubTrigger className=" flex items-center">
                                                            <ShieldQuestion className="h-4 w-4 mr-2"/>
                                                            <span>Role</span>
                                                        </DropdownMenuSubTrigger>
                                                        <DropdownMenuPortal>
                                                            <DropdownMenuSubContent>
                                                                <DropdownMenuItem>
                                                                    <Shield className="h-4 w-4 mr-2"/>
                                                                    Guest
                                                                    {member.role === "GUEST" &&(
                                                                        <Check className="h-4 w-4 ml-auto"/>
                                                                    )}
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <ShieldCheck className="h-4 w-4 mr-2"/>
                                                                    MODERATOR
                                                                    {member.role === "MODERATOR" &&(
                                                                        <Check className="h-4 w-4 ml-auto"/>
                                                                    )}
                                                                </DropdownMenuItem>
                                                            </DropdownMenuSubContent>
                                                        </DropdownMenuPortal>
                                                    </DropdownMenuSub>
                                                    <DropdownMenuSeparator/>
                                                    <DropdownMenuItem>
                                                        <Gavel className="h-4 w-4 mr-2"/>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    )}
                                    {loadingId === member.id &&(
                                        <Loader2 className=" animate-spin text-zinc-500 ml-auto w-4 h-4"/>
                                    )}
                                </div>
                            </div>
                        </div>
                    })} */}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

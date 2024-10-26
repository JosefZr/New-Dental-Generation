import { useEffect, useState } from "react";
import { CreateServerModal } from "../modals";
import InviteModal from "../modals/invite-modal";
import EditServerModal from "../modals/edit-server-modal";
import ManageMembersModal from "../modals/manage-modal";
import CreateChannelModal from "../modals/create-channel-modal";
export const ModalProvider = ()=>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])
    if(!isMounted){
        return null;
    }
    
    return(
        <>
            <CreateServerModal/>
            <InviteModal/>
            <EditServerModal/>
            <ManageMembersModal/>
            <CreateChannelModal/>
        </>
    )
}
import { useEffect, useState } from "react";
import { CreateServerModal } from "../modals";
import InviteModal from "../modals/invite-modal";
import EditServerModal from "../modals/edit-server-modal";
import ManageMembersModal from "../modals/manage-modal";
import CreateChannelModal from "../modals/create-channel-modal";
import UpdateUserNameModal from "../modals/userName-modal";
import UpdateEmailModal from "../modals/updateEmail-modal";
import UpdatePasswordModal from "../modals/updatePassword-modal";
import SubscriptionModal from "../modals/subscription-modal";
import ProffessionModal from "../modals/proffession-modal";
import DeleteUserModal from "../modals/deleteUser-modal";
import CreateChannelStoreModal from "../modals/create-channel-store-lab";
import UpdateChannelModal from "../modals/update-channel-modal";
import BireModal from "../modals/bire-modal";
import SerachModal from "../modals/search-modal";
import AdvancedModal from "../modals/AdvancedModal";
import TimeModal from "../modals/time-modal";
import AddModal from "../modals/addModal";
import Limitations from "../modals/Limitations";
import ImagesModal from "../modals/images-modal";
import LevelModal from "../modals/level-modal";
// import PreviewModal from "../modals/preview-modal";

export const ModalProvider = ({ children })=>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])
    if(!isMounted){
        return null;
    }
    
    return(
        <div >
        {children}
            <CreateServerModal/>
            <InviteModal/>
            <EditServerModal/>
            <ManageMembersModal/>
            <CreateChannelModal/>
            <UpdateUserNameModal/> 
            <UpdateEmailModal/>
            <UpdatePasswordModal/>
            <SubscriptionModal/>
            <ProffessionModal/>
            <DeleteUserModal/>
            <CreateChannelStoreModal/>
            <UpdateChannelModal/>
            <BireModal/>
            <SerachModal/>
            <AdvancedModal/>
            <TimeModal/>
            <AddModal/>
            <Limitations/>
            <ImagesModal/>
            <LevelModal/>
            {/* <PreviewModal/> */}
        </div>
    )
}
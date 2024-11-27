import {create } from "zustand"

export const MODAL_TYPE = {
    CREATE_SERVER: "createServer",
    EDIT_SERVER: "editServer",
    INVITE_PEAPLE:"invitePeople",
    MANAGE_MEMBERS:"manageMembers",
    CREATE_CHANNEL:"createChannel",
    
    DELETE_COURSE:"deleteCourse"
  };

export const useModal = create((set)=>({
    type:null,
    isOpen:false,
    onOpen:(type)=> set({isOpen:true, type}),
    onClose:()=>set({isOpen:false, type:null})
}));
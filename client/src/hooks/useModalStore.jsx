import {create } from "zustand"

export const MODAL_TYPE = {
    CREATE_SERVER: "createServer",
    EDIT_SERVER: "editServer",
    INVITE_PEAPLE:"invitePeople",
    MANAGE_MEMBERS:"manageMembers",
    CREATE_CHANNEL:"createChannel",
    DELETE_COURSE:"deleteCourse",
    UPDATE_USERNAME:"updateUsername",
    UPDATE_PASSWORD:"updatePassword",
    UPDATE_EMAIL:"updateEmail",
    SUBSCRIPTION:"subscription",
    PROFFESSION:"proffession",
    DELETE_USER:"deleteUser",
    CREATE_STORE:"addStore",
    USER_PREVIEW:"userPreview"
  };

export const useModal = create((set)=>({
    type:null,
    isOpen:false,
    onOpen:(type)=> set({isOpen:true, type}),
    onClose:()=>set({isOpen:false, type:null})
}));
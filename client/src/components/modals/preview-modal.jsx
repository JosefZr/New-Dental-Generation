import { Dialog, DialogContent, DialogDescription } from "../../components/ui/dialog";
import { HiUserAdd } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import Preview from "../Profile/Preview";
import { jwtDecode } from "jwt-decode";
import { addingFriendRequest, getFriendsRequest } from "@/services";
import toast from "react-hot-toast";
import { FaUserMinus } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";

export default function PreviewModal() {
  const userInfo = jwtDecode(localStorage.getItem("token"))

  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === MODAL_TYPE.USER_PREVIEW;
  const { userPreview,user,friendsRequest, setFriendsRequest } = useContext(UserContext);
  const [friendRequest, setFriendRequest] = useState(null);

  useEffect(()=>{
    if (isOpen) {
    const handleGettingFriendRequest = async()=>{
      const response = await getFriendsRequest(userInfo.userId, userPreview._id)
      if(response.success){
        setFriendsRequest(response.data);
        console.log(response.data)
        toast.success(response.message)

      }else{
        toast.error(response.message)
      }
    }
    handleGettingFriendRequest();
  }
  },[isModalOpen,userPreview])
  if (!isOpen) return null; // Do not render anything if the modal is not open

  const handleAddFriendRequest = async () => {
    try {
      const response = await addingFriendRequest(userInfo.userId, userPreview._id);
      if (response?.success) {
        toast.success("Friend request has been sent successfully");
        setFriendsRequest(response.data);
        console.log(response.data);
      } else {
        toast.error("Error sending friend request.");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast.error("Something went wrong.");
    }
  };
  // const handleDeleteFriendRequest = async()=>{
  //   try {

  //   }catch(error){

  //   }
  // }

  const handleClose = () => {
    onClose();
  };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose} className="border-none">
        <DialogContent className="border-none rounded-none text-white p-0 bg-my-dark-blue">
            <DialogDescription className="border-none p-0">
            <Preview user={userPreview} />
            <div className="absolute top-3 right-4 z-[11] flex justify-end gap-1 sm:z-10">
            <button
                className="h-[2rem] w-[2rem] rounded-full px-1 bg-slate-950 "
                // onClick={handleClose}
                >
                <MdMessage className="text-xl text-center  text-my-white" />
                </button>
                {/* Attach handleClose to each button */}
                {
                  friendsRequest.receiver === userPreview._id?(
                <button
                className="h-[2rem] w-[2rem] rounded-full px-1 bg-slate-950 text-center"
                // onClick={handleDeleteFriendRequest}
                >
                
                    <FaUserMinus className="text-2xl text-my-white" />
                </button>
                  ):(
                <button
                className="h-[2rem] w-[2rem] rounded-full px-1 bg-slate-950 text-center"
                onClick={handleAddFriendRequest}
                >
                    <HiUserAdd className="text-2xl text-my-white"/>
                </button>
                )}
                <button
                className="h-[2rem] w-[2rem] rounded-full px-1 bg-slate-950 text-center"
                onClick={handleClose}
                >
                < IoMdClose className=" text-2xl text-my-white"/>
                </button>
                
            
            </div>
            </DialogDescription>
        </DialogContent>
        </Dialog>
    );
}

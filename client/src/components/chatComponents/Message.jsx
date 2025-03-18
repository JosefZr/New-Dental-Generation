import { UserContext } from "@/context/UserContext";
import { useContext, useState, useEffect } from "react";
import Preview from "../Profile/Preview";
import { MdMessage } from "react-icons/md";
import { FaUserMinus } from "react-icons/fa6";
import { HiUserAdd } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { addingFriendRequest, deletePendingRequests, getFriendsRequest } from "@/services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserToChatContext } from "@/context/ToChatUser";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import Name from "./Name";
import MessageDate from "./MessageDate";
import MessageText from "./MessageText";
import MessageImage from "./MessageImage";
import MessageTools from "./MessageTools";


export default function Message({ message,chanId ,handleEditMessage}) {
  const userInfo = useAuthUser()
  const { setPreview, userPreview, setFriendsRequest, friendsRequest ,setPendingRequests} = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { setClickedUserId } = useUserToChatContext();

  const handleAddFriendRequest = async () => {
    if (!userPreview?._id) return;
    
    try {
      const response = await addingFriendRequest(userInfo.userId, userPreview._id);
      if (response?.success) {
        toast.success("Friend request has been sent successfully");
        const updatedFriendsRequest = await getFriendsRequest(userInfo.userId, userPreview._id);
        setFriendsRequest(updatedFriendsRequest.data);
      } else {
        toast.error("Error sending friend request.");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast.error("Something went wrong.");
    }
  };
  const handleDeletePendingRequest = async (request) => {
    try {
      const response = await deletePendingRequests(userInfo.userId, userPreview._id);
      if (response.success) {
        setPendingRequests(prev => prev.filter(r => r._id !== request._id));
        setFriendsRequest(response.data);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting pending request:", error);
      toast.error("Failed to delete request");
    }
  };
  const handleUserData = async () => {
    if (!userPreview?._id) return;
    
    try {
      const response = await getFriendsRequest(userInfo.userId, userPreview._id);
      if (response.success) {
        setFriendsRequest(response.data);
      } else {
        setFriendsRequest(null);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (userPreview?._id && isModalOpen) {
      handleUserData();
    }
  }, [userPreview?._id, isModalOpen]);

  const handleImageClick = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API}/api/v1/users/${message.sender._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setPreview(userData.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setPreview(null);
  };
  const showRemoveButton = friendsRequest && userPreview?._id && 
    (friendsRequest.sender === userPreview._id || friendsRequest.receiver === userPreview._id);

  return (
    <div className="chat-item-wrapper will-change-transform translate-y-0 w-full" style={{position:"relative"}}>
  <div
    className="chat-message group relative flex w-full focus:border-primary lg:pr-4 focus:ring"
    style={{
      transition: "transform 0.25s ease-out",
      flexDirection: "row",
      alignItems: "flex-start",
    }}
  >
    <div className="flex shrink-0 justify-center w-[56px]">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTitle>{""}</DialogTitle>
        <DialogTrigger asChild>
          <div
            className="relative rounded-full block flex-shrink-0 cursor-pointer"
            style={{ width: "40px", height: "40px" }}
            onClick={handleImageClick}
          >
            {message.sender?.avatar ==="/default-avatar.jpg" ?(
              <img
                src={`${message.sender.avatar}`}
                className="rounded-full object-cover"
                loading="lazy"
                style={{ width: "40px", height: "40px" }}
                alt=""
            />
          ):(
            <img
              src={`${import.meta.env.VITE_UPLOAD_AVATAR_URL}${message.sender?.avatar}`}
              className="rounded-full object-cover"
              loading="lazy"
              style={{ width: "40px", height: "40px" }}
              alt=""
            />
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="border-none rounded-none text-white p-0 bg-my-dark-blue">
          <DialogDescription className="border-none p-0">
            {userPreview && <Preview user={userPreview} />}
            <div className="absolute top-3 right-4 z-[11] flex justify-end gap-1 sm:z-10">
              {userPreview?._id === userInfo?.userId ?(
                <></>
              ):(
                <button
                  className="h-[2rem] w-[2rem] rounded-full px-1 bg-slate-950"
                  onClick={() => {
                    setClickedUserId({
                      userId: userPreview._id,
                      username: `${userPreview.firstName} ${userPreview.lastName}`,
                    });
                    handleClose();
                    navigate("/dashboard/user-chat");
                  }}
                >
                  <MdMessage className="text-xl text-center text-my-white" />
                </button>
              ) 
              }

              { userPreview?._id === userInfo?.userId ?(
                <></>
              ):(
                showRemoveButton ? (
                  <button
                    className="h-[2rem] w-[2rem] rounded-full px-1 bg-slate-950 text-center"
                    onClick={handleDeletePendingRequest}
                  >
                    <FaUserMinus className="text-2xl text-my-white" />
                  </button>
                ) : (
                  <button
                    className="h-[2rem] w-[2rem] rounded-full px-1 bg-slate-950 text-center"
                    onClick={handleAddFriendRequest}
                  >
                    <HiUserAdd className="text-2xl text-my-white" />
                  </button>
                )
              ) }

              <button
                className="h-[2rem] w-[2rem] rounded-full px-1 bg-slate-950 text-center"
                onClick={handleClose}
              >
                <IoMdClose className="text-2xl text-my-white" />
              </button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>

    <div
      className="mb-[2px] inline-block w-full rounded-md border bg-bubble-gradient px-2 py-[4px] border-transparent group"
      style={{
        backgroundImage: "linear-gradient(to right, #1D2B3A, #1D3346)",
        position:"relative"
      }}
    >
      <div className="flex items-center">
        <Name message={message}/>
        <MessageDate message={message}/>
      </div>
      <span className="custom-break-words break-words text-sm">
        <div className="sc-jEACwC gqSGRP markdown break-wordsfalse">
          <MessageText message={message}/>
          <MessageImage message={message}/>
        </div>
      </span>
    </div>
    <MessageTools message={message} chanId={chanId} onEdit={handleEditMessage}/>
  </div>
</div>
  );
}
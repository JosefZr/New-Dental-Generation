import { UserContext } from "@/context/UserContext";
import { jwtDecode } from "jwt-decode";
import { useContext, useState, useEffect } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import Preview from "../Profile/Preview";
import { MdMessage } from "react-icons/md";
import { FaUserMinus } from "react-icons/fa6";
import { HiUserAdd } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { addingFriendRequest, deletePendingRequests, getFriendsRequest } from "@/services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserToChatContext } from "@/context/ToChatUser";

export default function Message({ message }) {
  const userInfo = jwtDecode(localStorage.getItem("token"));
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
        `http://localhost:3000/api/v1/users/${message.sender._id}`,
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

  const formattedDate = new Date(message.createdAt).toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handleClose = () => {
    setIsModalOpen(false);
    setPreview(null);
  };


  const showRemoveButton = friendsRequest && userPreview?._id && 
    (friendsRequest.sender === userPreview._id || friendsRequest.receiver === userPreview._id);

  return (
    <div className="chat-item-wrapper will-change-transform translate-y-0 w-full">
      <div className="chat-message group relative flex w-full focus:border-primary lg:pr-4 focus:ring"
        style={{
          transition: "transform 0.25s ease-out",
          flexDirection: "row",
          alignItems: "flex-start",
        }}>
        <div className="h-full flex items-start justify-center flex-shrink-0 w-20">
          <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DrawerTitle>{""}</DrawerTitle>
            <DrawerTrigger asChild>
              <div
                className="relative rounded-full bg-base-300 block flex-shrink-0 cursor-pointer"
                style={{ width: "40px", height: "40px" }}
                onClick={handleImageClick}>
                <img
                  src={`http://localhost:3000/uploads/${message.sender.avatar}`}
                  className="rounded-full object-cover"
                  loading="lazy"
                  style={{ width: "40px", height: "40px" }}
                  alt=""
                />
              </div>
            </DrawerTrigger>
            <DrawerContent className="border-none rounded-none text-white p-0 bg-my-dark-blue">
              <DrawerDescription className="border-none p-0">
                {userPreview && <Preview user={userPreview} />}
                <div className="absolute top-3 right-4 z-[11] flex justify-end gap-1 sm:z-10">
                <button
                  className="h-[2rem] w-[2rem] rounded-full px-1 bg-slate-950 "
                  onClick={() =>  {
                    setClickedUserId({ userId: userPreview._id, username: `${userPreview.firstName} ${userPreview.lastName}` });
                    handleClose(); 
                    navigate("/dashboard/user-chat")
                  }}
                  >
                  <MdMessage className="text-xl text-center  text-my-white" />
              </button>

              {
                  showRemoveButton?(
                <button
                className="h-[2rem] w-[2rem] rounded-full px-1 bg-slate-950 text-center"
                onClick={handleDeletePendingRequest}
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
                    onClick={handleClose}>
                    <IoMdClose className="text-2xl text-my-white" />
                  </button>
                </div>
              </DrawerDescription>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="inline-block w-full rounded-md border bg-bubble-gradient p-5 border-transparent">
          <div className="flex items-center">
            <span className="inline-flex items-center cursor-pointer font-medium text-xs md:text-sm hover:underline"
              style={{ color: "rgba(17,128,106)" }}>
              {message.sender._id === userInfo.userId
                ? "You"
                : `${message.sender.firstName} ${message.sender.lastName}`}
            </span>
            <span className="ml-3 cursor-default pt-[1px] text-3xs opacity-50">
              {formattedDate}
            </span>
          </div>
          <span className="custom-break-words break-words text-sm">
            <div className="sc-jEACwC gqSGRP markdown break-wordsfalse">
              <p className="text-sm">{message.content}</p>
              {message?.images.length > 0 && 
                message.images.map((file)=>{
                  return <img src={file} />
                })
              }
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
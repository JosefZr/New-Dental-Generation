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
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";

export default function Message({ message }) {
  const userInfo = useAuthUser()
  const{onOpen} = useModal()

  const{ setImagesToShow,
    setInitialIndex} = useUserToChatContext()
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
      className="mb-[2px] inline-block w-full rounded-md border bg-bubble-gradient px-2 py-[4px] border-transparent"
      style={{
        backgroundImage: "linear-gradient(to right, #1D2B3A, #1D3346)",
      }}
    >
      <div className="flex items-center">
        <span
          className="inline-flex items-center cursor-pointer font-medium text-xs md:text-sm hover:underline"
          style={{
            color: `${
              message.sender?.role === "dentist"
                ? "#ECC879"
                : message.sender?.role === "store"
                ? "rgb(52, 152, 219)"
                : message.sender?.role === "lab"
                ? "rgb(255, 255, 255)"
                : message.sender?.role === "admin"
                ? "rgb(179, 51, 51)"
                : message.sender?.role === "moderator"
                ? "#C0C0C0"
                : "rgb(201, 142, 215)"
            }`,
          }}
        >
          {message.sender?._id === userInfo?.userId
            ? "You"
            : `${message?.sender?.firstName} ${message?.sender?.lastName}`}
        </span>
        <span
          className="ml-3 cursor-default pt-[1px] opacity-50"
          style={{
            fontFamily: "inter, system-ui, sans-serif",
            fontSize: "0.75rem",
          }}
        >
          {formattedDate}
        </span>
      </div>
      <span className="custom-break-words break-words text-sm">
        <div className="sc-jEACwC gqSGRP markdown break-wordsfalse">
          <p
            className="whitespace-pre-wrap"
            style={{
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              fontFamily: "inter, system-ui, sans-serif",
            }}
          >
            {message.content}
          </p>

          {message?.images.length > 0 && (
  <div className="mt-2">
    {/* Single Image */}
    {message.images.length === 1 && (
      <div className="max-w-[400px]">
        <img
          src={message.images[0]}
          alt="Attachment 1"
          onClick={()=>{
            setInitialIndex(0)
            setImagesToShow(message.images)
            onOpen(MODAL_TYPE.IMAGES_MODAL)

          }}
          className="w-full h-auto rounded-lg"
          loading="lazy"
        />
      </div>
    )}

    {/* Two Images */}
    {message.images.length === 2 && (
      <div className="grid grid-cols-2 gap-2 max-w-[400px]">
        {message.images.map((file, index) => (
          <img
            key={index}
            onClick={()=>{
              setInitialIndex(index)
              setImagesToShow(message.images)
              onOpen(MODAL_TYPE.IMAGES_MODAL)
            }}
            src={file}
            alt={`Attachment ${index + 1}`}
            className="w-full h-auto rounded-lg"
            loading="lazy"
          />
        ))}
      </div>
    )}

    {/* Three Images */}
    {message.images.length === 3 && (
      <div className="grid grid-cols-2 gap-2 max-w-[400px]">
        <img
          src={message.images[0]}
          alt="Attachment 1"
          className="w-full h-auto rounded-lg"
          loading="lazy"
          onClick={()=>{
            setInitialIndex(0)
            setImagesToShow(message.images)
              onOpen(MODAL_TYPE.IMAGES_MODAL)
          }}
        />
        <div className="grid grid-rows-2 gap-2">
          {message.images.slice(1).map((file, index) => (
            <img
              key={index + 1}
              src={file}
              alt={`Attachment ${index + 2}`}
              onClick={()=>{
                setInitialIndex(index+1)
              }}
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    )}

    {/* Four Images */}
    {message.images.length === 4 && (
      <div className="grid grid-cols-2 gap-2 w-full">
        {message.images.map((file, index) => (
          <img
            key={index}
            src={file}
            onClick={()=>{
              setInitialIndex(index)
              setImagesToShow(message.images)
              onOpen(MODAL_TYPE.IMAGES_MODAL)
            }}
            alt={`Attachment ${index + 1}`}
            className="w-full h-auto rounded-lg"
            loading="lazy"
          />
        ))}
      </div>
    )}

    {/* Five Images */}
    {message.images.length === 5 && (
      <div className="grid grid-cols-2 gap-2 max-w-[400px]">
        <div className="grid gap-2">
          {message.images.slice(0, 3).map((file, index) => (
            <img
              key={index}
              src={file}
              onClick={()=>{
                setInitialIndex(index)
                setImagesToShow(message.images)
                onOpen(MODAL_TYPE.IMAGES_MODAL)
              }}
              alt={`Attachment ${index + 1}`}
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
          ))}
        </div>
        <div className="grid gap-2">
          {message.images.slice(3).map((file, index) => (
            <img
              key={index + 3}
              onClick={()=>{
                setInitialIndex(index + 3)
              }}
              src={file}
              alt={`Attachment ${index + 4}`}
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    )}
  </div>
)}
        </div>
      </span>
    </div>
  </div>
</div>
  );
}
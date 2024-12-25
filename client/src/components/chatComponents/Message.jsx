import { UserContext } from "@/context/UserContext";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { Dialog } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function Message({ message }) {
  //console.log(message)
  const userInfo = jwtDecode(localStorage.getItem("token"));
  const {userPreview, setPreview} = useContext(UserContext);
    const {onOpen} = useModal();
  // console.log(message)
  const handleImageClick =async()=>{
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
          console.log("User Data:", userData);
          setPreview(userData.data);
          // Handle user data (e.g., display it in a modal or log it to the console)
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

  }
  const formattedDate = new Date(message.createdAt).toLocaleString("en-GB", {
    weekday: "short", // "Mon"
    day: "numeric", // "18"
    month: "short", // "Nov"
    hour: "2-digit", // "17"
    minute: "2-digit", // "22"
    hour12: true, // Optional for 12-hour format (e.g., 5:22 PM)
  });

  return (
    <div className="chat-item-wrapper will-change-transform translate-y-0 w-full">
      <div
        className="chat-message group relative flex w-full focus:border-primary lg:pr-4 focus:ring "
        style={{
          transition: "transform 0.25s ease-out",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <div className="h-full flex items-start justify-center flex-shrink-0  w-20">
          {/* the icon image */}
          <Dialog>
            <DialogTrigger asChild>
            <section
            className="relative rounded-full bg-base-300 block flex-shrink-0 cursor-pointer"
            style={{ width: "40px", height: "40px" }}
            onClick={
              ()=>{
                handleImageClick()
                onOpen(MODAL_TYPE.USER_PREVIEW)
              }
            }
          >
            <img
              src={`http://localhost:3000/uploads/${message.sender.avatar}`}
              className="rounded-full object-cover"
              loading="lazy"
              style={{ width: "40px", height: "40px" }}
              alt=""
            />
          </section>
            </DialogTrigger>
          </Dialog>
        </div>
        <div className=" inline-block w-full rounded-md border bg-bubble-gradient p-5  border-transparent">
          {/* name and time of posting */}
          <div className="flex items-center">
            <span
              className="inline-flex items-center cursor-pointer font-medium text-xs md:text-sm hover:underline"
              style={{ color: "rgba(17,128,106)" }}
            >
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

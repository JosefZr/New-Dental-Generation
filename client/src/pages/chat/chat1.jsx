import Devider from "@/components/chatComponents/Devider";
import Message from "@/components/chatComponents/Message";
import { useSocket } from "../../socketContext";
import { Plus, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { IoIosSend } from "react-icons/io";

import { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAddJourney } from "@/hooks/user/useAddJourney";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import useGetSubscriptionStatus from "@/hooks/limitation/useGetSubscriptionStatus";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";

export default function Chat1({ initialMessages, chanId,cahnTitle }) {
  const userInfo = useAuthUser();
  const [messages, setMessages] = useState(initialMessages || []);
  const [msgToSend, setMessageToSend] = useState("");
  const [imagesTosnd, setImagesToSnd] = useState([])
  const [images, setImages] = useState([])

  const [page] = useState(1);
  const {owner} = useContext(UserContext);
  const {isSidebarOpen, setIsSidebarOpen} = useContext(UserContext);
  const [preventFetch, setPrevent] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const containerRef = useRef(null);
  const lastMessageRef = useRef(null);
  const fileInputRef = useRef(null)

 // Function to check if the current user can send messages
 const canSendMessages = () => {
  console.log(owner)
  const userRole = userInfo.role;
  const userRegion = userInfo.region?.toLowerCase(); // Case-insensitive
  // Allow everyone if allowedUsers is "all"
  if (owner?.type === "journey") {
    return true;
  }
  // Admin and Moderator override: allow access to all channels
  if (userRole === "admin" || userRole === "moderator") {
    return true;
  }
  // Handle region-specific channels
  if (owner?.type === "algeria" ||
    owner?.type === "russia" ||
    owner?.type === "egypt" ||
    owner?.type === "europe" 
  ) {
    const channelRegion = owner.type;
    const hasRegionAccess = userRegion === channelRegion;
    console.log(`Region-based access check for ${channelRegion}:`, hasRegionAccess);
    return hasRegionAccess;
  }
  // Special handling for lab and store channels
  if (owner?.allowedUsers === "lab" || owner?.allowedUsers === "store") {
    // If there's an owner, only they can send messages
    if (owner.ownerId) {
      const hasAccess = owner.ownerId === userInfo.userId;
      console.log("Owner-based access check:", hasAccess);
      return hasAccess;
    }
    // If no owner, check if user's role matches the allowedUsers
    const hasRoleAccess = userRole === owner.allowedUsers;
    console.log("Role-based access check:", hasRoleAccess);
    return hasRoleAccess;
  }

  // For other channels, check if user's role matches allowedUsers
  if (owner?.allowedUsers) {
    // Handle admin/moderator access (ADMD)
    if (owner.allowedUsers === "ADMD") {
      const hasAdminAccess = userRole === "admin" || userRole === "moderator";
      console.log("Admin/Mod access check:", hasAdminAccess);
      return hasAdminAccess;
    }
    // Handle other role-based access
    const hasRoleAccess = userRole === owner.allowedUsers;
    console.log("General role access check:", hasRoleAccess);
    return hasRoleAccess;
  }

  // If no restrictions are set, allow message sending
  return true;
};
  const handleFileChange = (event) => {
    if(status==="off"){
      onOpen(MODAL_TYPE.LIMITATION_MODAL)
    }
    else{
      const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
    }
  };

  const removeImage = (id) => {
    setImages(prevImages => {
      const removedImage = prevImages.find(image => image.id === id)
      if (removedImage) {
        URL.revokeObjectURL(removedImage.preview)
      }
      return prevImages.filter(image => image.id !== id)
    })
  }
  const scrollToBottom = () => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  async function storeImages() {
    setDisable(true); 
    const formData = new FormData();

    // Append files to FormData
    images.forEach((imageObj) => {
      formData.append("images", imageObj.file);
    });  
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/channels/storeMessageImages`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData, 
      });
  
      if (!response.ok) {
        throw new Error(`Failed to store images: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json(); 
  
      return data.files;
    } catch (error) {
      console.error("An error occurred while storing images:", error);
      return null; 
    } finally {
      setDisable(false); 
    }
  }
  const addJourney = useAddJourney();
  const status = useGetSubscriptionStatus()
  const {onOpen} = useModal()
  console.log("funcing",status)
  function sendMessage() {
    if(status==='off'){
      onOpen(MODAL_TYPE.LIMITATION_MODAL)
    }
    else{
      if (!msgToSend.trim() && !imagesTosnd) return;

      console.log(imagesTosnd , msgToSend)
      console.log()
      socket.emit("channelMessage", {
        content: msgToSend,
        channelId: chanId,
        images: imagesTosnd,
        type: "text",
        sender: userInfo.userId, // Ensure sender is included
      });
      if(owner?.type ==="journey"){
        addJourney.mutate({
          userId: userInfo.userId,
          content:msgToSend,
          images:imagesTosnd,
          chanTitle:cahnTitle,
          chanId:chanId,
        });
      }
      
    }
    setMessageToSend("")
    setImages([])
    setImagesToSnd([])
  }

  const handleSubmit = async (e) => {
    if(status==="off"){
      onOpen(MODAL_TYPE.LIMITATION_MODAL)
    }else{
      e.preventDefault()
      console.log('Submitting files:', images.map(img => img.file))
      setImages([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      e.preventDefault();
      if (images.length > 0) {
        console.log(images)
        const resp = await storeImages() ;
        setImagesToSnd(resp)
      }else {
        sendMessage();
      }
    }
    e.target.value="";

  }

  const socket = useSocket();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // tracking the last message to scroll to it
  useEffect(() => {
    if (!socket && !chanId) return;
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    setMessages([]);
    scrollToBottom();
  }, [chanId]);

  useEffect(()=>{
  },[owner])

  useEffect(() => {
    if (!socket && !chanId) return;

    //console.log("passed");
    socket.emit("joinGroup", chanId);

    socket.on("channelMessage", (msg) => {
      if (msg.channelId === chanId) {
        setMessages((prev) => [...prev, msg]);
      }
      if (msg.sender._id === userInfo.userId) {
        scrollToBottom();
      }
    });

    return () => {
      socket.off("message");
      socket.off("channelMessage");
    };
  }, [socket, chanId, initialMessages]);
  
  const [disable , setDisable] = useState(false)
  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (disable) return ; 
      e.preventDefault();
      if (images.length > 0) {
        const resp = await storeImages() ;
        setImagesToSnd(resp)
      }else {
        sendMessage();
      }
      e.target.value="";
    }
  }
  useEffect(() => {
    if (imagesTosnd.length > 0) {
      sendMessage();
      setMessageToSend("");
      
    }
  }, [imagesTosnd]);


  const fetchMoreMessages = async () => {
    if (isFetching || !chanId || preventFetch) return;
    const container = containerRef.current;

    if (container.scrollTop != 0 || isFetching) return;
    setIsFetching(true);

    try {
      let nextPage = page + 1;
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API}/api/v1/channels/${chanId}?page=${nextPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      if (data.data) {
        console.log("fetched more messages");
        setMessages((prev) => [...data.data.messages, ...prev]);
        if (data.data.messages.length < 30) {
          setPrevent(true);
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("scroll", fetchMoreMessages);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (container) {
        container.removeEventListener("scroll", fetchMoreMessages);
      }
    };
  }, [messages]);
  const getAccessDeniedMessage = () => {

      // Allow admins and moderators to send messages in all channels
    if (["admin", "moderator"].includes(userInfo.role)) {
      return null; // No access denied message for admins and moderators
    }
    if (owner?.type === "algeria" && userInfo.region !== "algeria") {
      return "Only users from Algeria can send messages in this channel";
    }
    
    if (owner?.type === "russia" && userInfo.region !== "russia") {
      return "Only users from Russia can send messages in this channel";
    }
    if (owner?.type === "egypt" && userInfo.region !== "egypt") {
      return "Only users from egypt can send messages in this channel";
    }
    if (owner?.type === "europe" && userInfo.region !== "europe") {
      return "Only users from europe can send messages in this channel";
    }
    
    if (owner?.allowedUsers === "ADMD" && !["admin", "moderator"].includes(userInfo.role)) {
      return "Only administrators and moderators can send messages in this channel";
    }
    
    if (owner?.allowedUsers && owner.allowedUsers !== userInfo.role) {
      return `Only ${owner.allowedUsers}s can send messages in this channel`;
    }
    
    return "You don't have permission to send messages in this channel";
  };
  return (
    <div className="flex h-full flex-col "
    style={{
      backgroundColor:"hsl(211.3 46.939% 9.6078%)"
    }}>
      <div className="z-20 flex flex-col flex-1 ">
        <div className="relative h-full flex-1 bg-neutral ">
          <div className="absolute top-0 right-0 left-0 z-20 flex flex-col ">
            {/* for the title of the channel */}
            <header
              className="flex flex-shrink-0 items-end justify-between !pt-0 relative z-10 border-grey-secondary bg-base-300"
            >
              <section className="flex h-full w-full items-center justify-between pl-3 py-2 text-lg bg-[#213043] ">
                <div className="flex w-full items-center font-medium">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex items-center gap-3 font-medium cursor-pointer">
                      <GiHamburgerMenu className=" text-2xl"onClick={toggleSidebar}/>
                      <span className="flex items-center gap-[2px]">
                        {cahnTitle}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </header>

            {/* for the pinned messages */}
            {/* <header
              className=" flex flex-shrink-0 items-end justify-between !pt-0 relative z-10 border-grey-secondary border-b bg-base-300"
              style={{
                height: "60px",
                minHeight: "60px",
                maxHeight: "60px",
                paddingTop: 0,
              }}
            >
              <section className="flex h-full w-full items-center justify-between">
                <div className="flex w-full items-center font-medium bg-slate-600 ">
                  <div className="flex items-center justify-center gap-3 ">
                    <button
                      className=" transition-all px-5 py-2 rounded-lg my-2 ml-2 btn-sm border-my-gold  hover:bg-my-gold  text-my-gold hover:text-my-black"
                      style={{ border: "1px solid var(--gold)" }}
                    >
                      <TbPinnedFilled className="text-2xl " />
                    </button>
                    <div className="line-clamp-2 cursor-pointer text-xs">
                      <div className="text-my-gold font-bold text-base">
                        Pinned Message
                      </div>
                      <span className="line-clamp-1 text-caption">
                        Good morning students...
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </header> */}

            {/* for the new messages not watched */}
            {/* <div className="absolute top-[108px] right-0 left-0 z-[11] user-select-none flex h-[28px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap bg-indigo-800 bg-opacity-80 px-3 font-semibold text-accent-content text-md backdrop-blur-[20px] backdrop-filter transform cursor-pointer transition-all duration-200 translate-y-0 opacity-100">
              <div>New since 5 days ago</div>
              <div className="flex items-center">
                {" "}
                Jump to unread <FaArrowUp className="ml-2" />
              </div>
            </div> */}
          </div>

          {/* for the chat  */}
          <div
            className="absolute translate-y-0 opacity-100 "
            style={{ top: "48px", left: "0", width: "100%", bottom: "66px" }}
          >
            <div
              ref={containerRef}
              className="z-10 overflow-y-auto overflow-x-hidden transition-transform duration-keyboard will-change-transform custom-scroll"
              style={{ height: "100%" }}
            >
              <div className="viewport relative will-change-transform translate-y-0 ">
                <div className="w-full">
                  {messages &&
                    messages.map((message, index) => {
                      const isLastMessage = index === messages.length - 1;
                      return (
                        <div key={message._id}>
                          <Message message={message} />
                          <Devider />
                          <div
                            ref={isLastMessage ? lastMessageRef : null}
                          ></div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          {/* for the input of the message */}
          <div
            className={`absolute right-0 bottom-0 left-0 z-20 flex flex-col ${
              disable ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <footer
              className="relative mb-inset-bottom   z-20 w-full transition-transform duration-keyboard translate-y-0"
              style={{ paddingBottom: "0px",backgroundColor:"hsl(211.03 33.333% 17.059%)" }}
            >
              {/* this for the user when he scroll up he can return and scroll to the present msg */}
              {/* <div className="w-full user-select-none flex h-[28px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap bg-opacity-80 px-3 font-medium text-sm backdrop-blur-[20px] backdrop-filter  z-100 mb-inset-bottom transform cursor-pointer transition-all duration-75 bg-base-300 text-base-content translate-y-0 opacity-100 bottom-full">
                <div>Viewing older messages</div>
                <div className="flex items-center">
                  See present <FaArrowDown className="ml-2" />
                </div>
              </div> */}
              
              {/* for the input  */}
              {canSendMessages() ? (
        <>
          <div className="flex flex-shrink-0 w-full items-center gap-3 border-gray-700 border-t px-3">
            <div className="w-full max-w-md mx-auto flex flex-col-reverse">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-start pt-3 w-full">
                </div>
              </form>
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.preview}
                        alt={`Preview of ${image.file.name}`}
                        className="w-full h-auto rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label={`Remove ${image.file.name}`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex flex-row items-center px-2 py-1  mb-1 gap-3">
            <label htmlFor="dropzone-file" className="cursor-pointer bg-slate-700 rounded-full">
              <Plus className="w-6 h-6 text-white hover:text-gray-500 transition-colors m-1" />
              <Input
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </label>
            <form onSubmit={handleSubmit} className="relative block min-h-[32px] rounded-2xl flex-1"style={{
              backgroundColor:"hsl(213.53 34% 19.608%)"
            }}>
              <textarea
                id="chat-input"
                className="top-0 left-0 resize-none border-none bg-transparent px-3 py-[6px] text-sm outline-none w-full"
                placeholder={`Message ${cahnTitle}`}
                style={{ height: "32px" }}
                value={msgToSend}
                onChange={(e) => setMessageToSend(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </form>
            <button  className="bg-slate-700 rounded-full p-[5px] cursor-pointer" 
            onClick={handleSubmit}
            disabled={disable || (!msgToSend.trim() && images.length === 0)}

            >
                <IoIosSend className=" text-xl mr-[1px] text-my-gold"    
                />
              {/* Upload {images.length} {images.length === 1 ? 'Image' : 'Images'} */}
            </button>
          </div>
        </>
      ) : (
        <div className="w-full text-center py-4 text-gray-500">
          {getAccessDeniedMessage()}
        </div>
      )}
              {/* <div className="w-full flex flex-row items-center px-5 gap-3">
              <label htmlFor="dropzone-file" className="cursor-pointer">
                        <Plus className="w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors" />
                        <Input 
                          id="dropzone-file" 
                          type="file" 
                          className="hidden" 
                          multiple 
                          accept="image/*"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                        />
                      </label>
              <form className="relative block min-h-[32px] rounded-2xl bg-neutral-950 flex-1">
                    <textarea
                      id="chat-input"
                      className=" top-0 left-0 resize-none border-none bg-transparent px-3 py-[6px] text-sm outline-none  w-full"
                      placeholder="Message #⭐ | lifestyle-flexing"
                      style={{ height: "32px" }}
                      onChange={(e) => setMessageToSend(e.target.value)}
                      onKeyDown={handleKeyDown}
                    ></textarea>
                  </form>
                  <Button type="submit"  disabled={images.length === 0}>
                      Upload {images.length} {images.length === 1 ? 'Image' : 'Images'}
                    </Button>
              </div> */}
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

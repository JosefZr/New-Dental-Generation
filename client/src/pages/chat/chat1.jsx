import Devider from "@/components/chatComponents/Devider";
import Message from "@/components/chatComponents/Message";
import { useSocket } from "../../socketContext";
import { Plus, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { IoIosSend } from "react-icons/io";

import { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useAddJourney } from "@/hooks/user/useAddJourney";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import useGetSubscriptionStatus from "@/hooks/limitation/useGetSubscriptionStatus";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import MessageHeader from "./components/Header";
import UploadImages from "./components/UploadImages";
import { MdUpdate } from "react-icons/md";
import PreviewOriginalText from "./components/PreviewOriginalText";
import { useUserToChatContext } from "@/context/ToChatUser";
import { LoadingSpinner } from "@/components/server/ServerSideBar";
import imageCompression from "browser-image-compression";

export default function Chat1({ initialMessages, chanId,cahnTitle }) {
  const userInfo = useAuthUser();
  const [messages, setMessages] = useState(initialMessages || []);
  const [msgToSend, setMessageToSend] = useState("");
  const [imagesTosnd, setImagesToSnd] = useState([])
  const [images, setImages] = useState([])
  const [uploadingImages, setUploadingImages] = useState({});
// Add these states at the top of UserChat
const [editingMessage, setEditingMessage] = useState(null);
  const [page] = useState(1);
  const {owner} = useContext(UserContext);
  const [preventFetch, setPrevent] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const containerRef = useRef(null);
  const lastMessageRef = useRef(null);
  const fileInputRef = useRef(null)
  const addJourney = useAddJourney();
  const status = useGetSubscriptionStatus()
  const [disable , setDisable] = useState(false)
  const {onOpen} = useModal()
  const socket = useSocket();
  const {isMessagesLoading} = useUserToChatContext()
// Add this state
const [isSocketConnected, setIsSocketConnected] = useState(false);

// Update socket connection handler
useEffect(() => {
  if (!socket) return;

  // Explicitly connect the socket
  if (!socket.connected) {
    socket.auth = { token: localStorage.getItem("token") };
    socket.connect();
  }

  const handleConnect = () => {
    setIsSocketConnected(true);
    // Re-join channel when connected
    if (chanId) {
      socket.emit("joinGroup", chanId);
    }
  };

  const handleDisconnect = () => setIsSocketConnected(false);

  socket.on("connect", handleConnect);
  socket.on("disconnect", handleDisconnect);

  return () => {
    socket.off("connect", handleConnect);
    socket.off("disconnect", handleDisconnect);
  };
}, [socket, chanId]);
// In your edit handling
const handleEditMessage = (message) => {
  setEditingMessage(message);
  setMessageToSend(message.content || "");
};
// Updated cancel edit handler
const cancelEdit = () => {
  setEditingMessage(null);
  setMessageToSend("");
};
useEffect(() => {
  if (!socket) return;

  socket.on("messageUpdated", (updatedMessage) => {
    setMessages(prev => prev.map(msg => {
      if (msg.content === updatedMessage.originalContent && 
          new Date(msg.createdAt).getTime() === new Date(updatedMessage.originalDate).getTime()) {
        return {
          ...msg,
          content: updatedMessage.newContent,
          updatedAt: new Date().toISOString()
        };
      }
      return msg;
    }));
  });

  return () => {
    socket.off("messageUpdated");
  };
}, [socket]);

 // Function to check if the current user can send messages
const canSendMessages = () => {
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

const handleFileChange = async (event) => {
  if (status === "off") {
    onOpen(MODAL_TYPE.LIMITATION_MODAL);
    return;
  }
  const MAX_IMAGES = 5;

  const files = event.target.files;
  if (!files) return;
  if (images.length + event.target.files.length > MAX_IMAGES) {
    alert(`Maximum ${MAX_IMAGES} images allowed`);
    return;
  }
  const newImages = [];
  const newUploadingState = {};

  for (const file of files) {
    try {
      const options = {
        maxSizeMB: 1, // Max size in MB
        maxWidthOrHeight: 800, // Resize to max width/height
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const preview = URL.createObjectURL(compressedFile);

      const imageObj = {
        id: Math.random().toString(36).substr(2, 9),
        file: compressedFile,
        preview,
      };

      newImages.push(imageObj);
      newUploadingState[imageObj.id] = false;
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  }

  setImages((prevImages) => [...prevImages, ...newImages]);
  setUploadingImages((prev) => ({ ...prev, ...newUploadingState }));
};


  const removeImage = (id) => {
    setImages(prevImages => {
      const removedImage = prevImages.find(image => image.id === id);
      if (removedImage) {
        URL.revokeObjectURL(removedImage.preview);
      }
      return prevImages.filter(image => image.id !== id);
    });
    
    // Clean up loading state
    setUploadingImages(prev => {
      const newState = {...prev};
      delete newState[id];
      return newState;
    });
  };
  const scrollToBottom = () => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };


  async function storeImages() {
    setDisable(true);
    const formData = new FormData();
    const uploadPromises = [];
    const uploadResults = [];

    try {
      // Set all images to uploading state
      const newUploadingState = {};
      images.forEach(img => {
        newUploadingState[img.id] = true;
      });
      setUploadingImages(newUploadingState);

      // Create individual upload promises for each image
      for (const imageObj of images) {
        const singleFormData = new FormData();
        singleFormData.append("images", imageObj.file);

        const uploadPromise = fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/channels/storeMessageImages`, {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: singleFormData,
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to upload image: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Mark this image as completed
          setUploadingImages(prev => ({
            ...prev,
            [imageObj.id]: false
          }));
          
          // Update the image status
          setImages(prev => 
            prev.map(img => 
              img.id === imageObj.id 
                ? {...img, status: 'uploaded'} 
                : img
            )
          );
          
          return data.files[0]; // Assuming each upload returns an array with one file
        })
        .catch(error => {
          console.error(`Error uploading image ${imageObj.id}:`, error);
          // Mark as failed
          setUploadingImages(prev => ({
            ...prev,
            [imageObj.id]: false
          }));
          
          setImages(prev => 
            prev.map(img => 
              img.id === imageObj.id 
                ? {...img, status: 'failed'} 
                : img
            )
          );
          
          return null;
        });
        
        uploadPromises.push(uploadPromise);
      }

      // Wait for all uploads to complete
      const results = await Promise.all(uploadPromises);
      // Filter out any failed uploads
      const successfulUploads = results.filter(result => result !== null);
      
      return successfulUploads;
    } catch (error) {
      console.error("An error occurred while storing images:", error);
      return null;
    } finally {
      setDisable(false);
    }
  }
  function sendMessage() {
    if (!socket) return;

    if (!socket || !socket.connected) {
      console.log("Socket not connected");
      socket.connect(); // Attempt to reconnect
      return;
    }
    if (!isSocketConnected) {
      console.log("Socket not connected");
      return;
    }
    if (!chanId || !userInfo?.userId) {
      console.log("Missing channel ID or user ID");
      return;
    }
    if(status==='off'){
      onOpen(MODAL_TYPE.LIMITATION_MODAL)
    }
    else{
      if (!msgToSend.trim() && !imagesTosnd) return;

      console.log(imagesTosnd , msgToSend)
      if(!msgToSend || !chanId  || !userInfo.userId){
        console.log('no msgToSend or chanId or userId')
        return
      }
      
      if (editingMessage) {
        // Emit update message event with content and timestamp
        socket.emit("updateMessage", {
          originalContent: editingMessage.content,
          originalDate: editingMessage.createdAt, // Use actual date property from your message object
          newContent: msgToSend,
          channelId: chanId,
        });
    
        // Reset editing state
        setEditingMessage(null);
      }else {
      socket.emit("channelMessage", {
        content: msgToSend,
        channelId: chanId,
        images: imagesTosnd,
        type: "text",
        sender: userInfo?.userId, // Ensure sender is included
      });
    }
    console.log(owner)
      if(owner.type ==="journey"){
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
    adjustTextareaHeight(); // Force height reset
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if(status === "off") {
      onOpen(MODAL_TYPE.LIMITATION_MODAL);
      return;
    }
    
    // Check if any images are still uploading
    const stillUploading = Object.values(uploadingImages).some(status => status === true);
    if (stillUploading) {
      // Don't proceed if images are still uploading
      return;
    }
    
    if (images.length > 0) {
      const resp = await storeImages();
      if (resp && resp.length > 0) {
        setImagesToSnd(resp);
      } else {
        // Handle case where all uploads failed
        alert("Failed to upload one or more images. Please try again.");
      }
    } else {
      sendMessage();
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

// In Chat1 component's messageDeleted handler
useEffect(() => {
  if (!socket) return;

  const handleMessageDeleted = ({ content, createdAt }) => {
    setMessages(prev => prev.filter(msg => 
      msg.content !== content || 
      new Date(msg.createdAt).getTime() !== new Date(createdAt).getTime()
    ));
  };

  socket.on("messageDeleted", handleMessageDeleted);
  
  return () => {
    socket.off("messageDeleted", handleMessageDeleted);
  };
}, [socket, chanId]);

 async function handleKeyDown(e) {
  if (e.key === 'Enter' && e.shiftKey) {
    return; // Let browser handle natural line break
  }
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();

    if (disable) return;
      
      // Check if any images are still uploading
      const stillUploading = Object.values(uploadingImages).some(status => status === true);
      if (stillUploading) {
        // Don't proceed if images are still uploading
        return;
      }
      
      if (images.length > 0) {
        const resp = await storeImages();
        if (resp && resp.length > 0) {
          setImagesToSnd(resp);
        }
      } else {
        sendMessage();
      }
    }
    // Add Ctrl+B for bold (Windows) or Cmd+B (Mac)
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
    e.preventDefault();
    insertFormatting('**');
  }
  
  // Add Ctrl+I for italic (Windows) or Cmd+I (Mac)
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
    e.preventDefault();
    insertFormatting('*');
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
  
  // Check if any images are currently uploading
  const isAnyImageUploading = Object.values(uploadingImages).some(status => status === true);
  
  // Add this useEffect hook
useEffect(() => {
  adjustTextareaHeight();
}, [msgToSend]);

  // Add this near your component's top-level
const MAX_TEXTAREA_HEIGHT = 200; // Set your maximum height here
const INITIAL_TEXTAREA_HEIGHT = 32; // Start height

// Add this ref declaration with your other refs
const textareaRef = useRef(null);

// Update the adjustTextareaHeight function
const adjustTextareaHeight = () => {
  const textarea = textareaRef.current;
  if (!textarea) return;

  // If textarea is empty, force it to stay at INITIAL_TEXTAREA_HEIGHT
  if (!textarea.value.trim()) {
    textarea.style.height = `${INITIAL_TEXTAREA_HEIGHT}px`;
    return;
  }

  // Otherwise, calculate height normally
  textarea.style.height = `${INITIAL_TEXTAREA_HEIGHT}px`;
  textarea.scrollTop = 0;

  const newHeight = Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT);
  textarea.style.height = `${newHeight}px`;

  textarea.style.overflowY = newHeight >= MAX_TEXTAREA_HEIGHT ? "auto" : "hidden";
};
// 3. Formatting insertion logic
const insertFormatting = (symbol) => {
  const textarea = textareaRef.current;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = msgToSend;

  const selectedText = text.substring(start, end);
  const newText = `${text.substring(0, start)}${symbol}${selectedText}${symbol}${text.substring(end)}`;
  setMessageToSend(newText);

  // Update cursor position
  setTimeout(() => {
    textarea.selectionStart = start + symbol.length;
    textarea.selectionEnd = end + symbol.length;
    textarea.focus();
  }, 0);
};

  return (
    <div className="flex h-full flex-col "
    style={{
      backgroundColor:"hsl(211.3 46.939% 9.6078%)"
      
    }}>
      <div className="z-20 flex flex-col flex-1 ">
        <div className=" h-full flex-1 bg-neutral "style={{position:"relative"}}>
          <div className=" top-0 right-0 left-0 z-20 flex flex-col" style={{position:"absolute"}}>
            {/* for the title of the channel */}
            <MessageHeader cahnTitle ={cahnTitle}/>
            {/* for the new messages not watched */}
          </div>

          {/* for the chat  */}
          {isMessagesLoading ?(<LoadingSpinner/>):(<div
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
                        <div key={index}>
                          <Message message={message} chanId={chanId} handleEditMessage={handleEditMessage}/>
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
          </div>)}
          {/* for the input of the message */}
          <div
            className={`absolute right-0 bottom-0 left-0 z-20 flex flex-col ${
              disable ? " pointer-events-none" : ""
            }`}
          >
            <footer
              className="relative mb-inset-bottom   z-20 w-full transition-transform duration-keyboard translate-y-0"
              style={{ paddingBottom: "0px",backgroundColor:"hsl(211.03 33.333% 17.059%)" }}
            >
              <PreviewOriginalText editingMessage={editingMessage} cancelEdit={cancelEdit}/>
              {/* this for the user when he scroll up he can return and scroll to the present msg */}
              {canSendMessages() ? (
              <>
              <UploadImages 
                handleSubmit={handleSubmit} 
                images={images}
                uploadingImages={uploadingImages}
                removeImage={removeImage}
              />
              <div className="w-full flex flex-row items-center px-2 py-1 mb-1 gap-3">
                <label htmlFor="dropzone-file" className={`cursor-pointer bg-slate-700 rounded-full ${isAnyImageUploading ? 'opacity-50' : ''}`}>
                  <Plus className="w-6 h-6 text-white hover:text-gray-500 transition-colors m-1" />
                  <Input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    disabled={isAnyImageUploading}
                  />
                </label>
                 {/* Formatting buttons */}
                  <div className="flex gap-1">
                    <button
                      type="button"
                      aria-label="Bold formatting"
                      onClick={() => insertFormatting('**')}
                      className="p-1 rounded hover:bg-gray-600 text-sm font-bold"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('*')}
                      className="p-1 rounded hover:bg-gray-600 text-sm italic"
                    >
                      I
                    </button>
                  </div>

                <form onSubmit={handleSubmit} className="relative block min-h-[32px] rounded-2xl flex-1" style={{
                  backgroundColor: "hsl(213.53 34% 19.608%)"
                }}>
                  <textarea
                    ref={textareaRef}
                    id="chat-input"
                    style={{ 
                      minHeight: '18px', 
                      maxHeight: `${MAX_TEXTAREA_HEIGHT}px`,
                    }}
                    className="top-0 left-0 resize-none border-none bg-transparent px-3 py-[6px] text-sm outline-none w-full overflow-y-auto min-h-[18px]"
                    placeholder={isAnyImageUploading ? "Uploading images..." : `Message ${cahnTitle}`}            
                    value={msgToSend}
                    onChange={(e) => {setMessageToSend(e.target.value)}}
                    onKeyDown={handleKeyDown}
                    disabled={isAnyImageUploading}
                  />
                  
                </form>
                {/* Preview panel */}
                  {/* {showPreview && (
                    <div className=" bottom-full mb-2 w-full p-2 rounded bg-gray-800 text-sm border border-gray-700">
                      <div
                        className="prose prose-invert max-w-none break-words"
                        dangerouslySetInnerHTML={renderPreview()}
                      />
                    </div>
                  )} */}
                 <button 
                    className={`bg-slate-700 rounded-full p-[5px] cursor-pointer ${
                      (disable || isAnyImageUploading || !isSocketConnected || 
                      (!msgToSend.trim() && images.length === 0)) ? 
                      'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleSubmit}
                    disabled={disable || isAnyImageUploading || !isSocketConnected || 
                            (!msgToSend.trim() && images.length === 0)}
                  >
                    {!isSocketConnected ? (
                      <div className="text-red-500 text-xs">Connecting...</div>
                    ) : isAnyImageUploading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-my-gold"></div>
                    ) : (
                      editingMessage? (
                        < MdUpdate  className="text-xl mr-[1px] text-my-gold" />
                      ):(
                        <IoIosSend  className="text-xl mr-[1px] text-my-gold" />
                      )
                    )}
                  </button>
                
              </div>
            </>
              ) : (
                <div className="w-full text-center py-4 text-gray-500">
                  {getAccessDeniedMessage()}
                </div>
              )}
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

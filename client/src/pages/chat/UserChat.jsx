import Devider from "@/components/chatComponents/Devider";
import Message from "@/components/chatComponents/Message";
import useSocketStore from "@/socketStore";
import { Plus, X } from 'lucide-react'
import { Input } from "@/components/ui/input"

import { useState, useEffect, useRef, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "@/context/UserContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useUserToChatContext } from "@/context/ToChatUser";
import { IoIosSend } from "react-icons/io";
import { MdUpdate } from "react-icons/md";
import PreviewOriginalText from "./components/PreviewOriginalText";
import { LoadingSpinner } from "@/components/server/ServerSideBar";
import imageCompression from "browser-image-compression";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import useGetSubscriptionStatus from "@/hooks/limitation/useGetSubscriptionStatus";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";

  const MAX_TEXTAREA_HEIGHT = 200; // Set your maximum height here
  const INITIAL_TEXTAREA_HEIGHT = 32; // Start height
export default function UserChat() {
  const {isSidebarOpen, setIsSidebarOpen,userMessages,chatId,isDashboardSidebarOpen,setIsDashboardSidebarOpen} = useContext(UserContext);

  const {clickedUser} = useUserToChatContext();
  const [msgToSend, setMessageToSend] = useState("");
  const [imagesTosnd, setImagesToSnd] = useState([])
  const [images, setImages] = useState([])
  const [uploadingImages, setUploadingImages] = useState({});
  const [page] = useState(1);
  const [preventFetch, setPrevent] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const containerRef = useRef(null);
  const lastMessageRef = useRef(null);
  const fileInputRef = useRef(null)
  const [editingMessage, setEditingMessage] = useState(null);
  const topMessageRef = useRef(null);
    const {onOpen} = useModal()
    const status = useGetSubscriptionStatus()
  const {isPrivateMessagesLoading,setIsPrivateMessagesLoading} = useUserToChatContext()
    const [disable , setDisable] = useState(false)
  const [recipient, setRec] = useState("");
  const userInfo = useAuthUser()
  console.log(userInfo)
  const socket = useSocketStore((state) => state.socket);
  const checkAndReconnect = useSocketStore((state) => state.checkAndReconnect);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState(userMessages || []);
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
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsDashboardSidebarOpen(!isDashboardSidebarOpen);

  };

  useEffect(() => {
    checkAndReconnect();
  }, []);

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
      const removedImage = prevImages.find(image => image.id === id)
      if (removedImage) {
        URL.revokeObjectURL(removedImage.preview)
      }
      return prevImages.filter(image => image.id !== id)
    })
    
    // Clean up loading state
    setUploadingImages(prev => {
      const newState = {...prev};
      delete newState[id];
      return newState;
    });
  }
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
    if(status==='off'){
      onOpen(MODAL_TYPE.LIMITATION_MODAL)
      return
    }
    else{
      if (!msgToSend.trim() && !imagesTosnd) return;
    if (!msgToSend.trim() && !imagesTosnd) return;

    console.log(imagesTosnd , msgToSend)
    if (editingMessage) {
      // Emit update message event with content and timestamp
      socket.emit("updatePrivateMessage", {
        originalContent: editingMessage.content,
        originalDate: editingMessage.createdAt, // Use actual date property from your message object
        newContent: msgToSend,
        senderId: userInfo.userId,
      });
  
      // Reset editing state
      setEditingMessage(null);
    }else {
    socket.emit("privateMessage", {
      content: msgToSend,
      recipient: chatId,
      images: imagesTosnd
    });
  }}
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
      const resp = await storeImages() ;
      if (resp && resp.length > 0) {
        setImagesToSnd(resp);
      } else {
        // Handle case where all uploads failed
        alert("Failed to upload one or more images. Please try again.");
      }
    }else {
      sendMessage();
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  useEffect(() => {
    if (socket) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
      checkAndReconnect();
    }
  }, [socket]);
  
  useEffect(() => {
    if (!socket || !chatId) return;

    setMessages(userMessages);

    
    if(clickedUser){
      setRec(clickedUser.username)
    }
    else {
      setRec("recipient")
    }

    
    scrollToBottom();
  }, [userMessages, clickedUser]);

  useEffect(() => {
    setMessages([]);
    scrollToBottom();
  }, [chatId]);

  useEffect(() => {
    if (!socket && !chatId) return;

    socket.emit("joinRoom", { recipientId: chatId });
    socket.on("message", (msg) => {
      const userInfo = jwtDecode(localStorage.getItem("token"));
      if (
        (msg.recipient._id === chatId && msg.sender._id === userInfo.userId) ||
        (msg.recipient._id === userInfo.userId && msg.sender._id === chatId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }

      if (msg.sender._id === userInfo.userId) {
        scrollToBottom();
      }
    });

    return () => {
      socket.off("message");
      socket.off("privateMessage");
    };
  }, [socket, chatId, userMessages]);

  useEffect(() => {
    if (
      // imagesTosnd && Array.isArray(imagesTosnd) &&
      imagesTosnd.length > 0) {
      sendMessage();
      setMessageToSend("");
    }
  }, [imagesTosnd]);
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
        try {
          const resp = await storeImages();
          if (resp && Array.isArray(resp)) {
            setImagesToSnd(resp);
          } else {
            console.error('Invalid response from storeImages');
            setImagesToSnd([]);
          }
        } catch (error) {
          console.error('Error storing images:', error);
          setImagesToSnd([]);
        }
      } else {
        sendMessage();
      }
      e.target.value = "";
    }

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

  const fetchMoreMessages = async () => {
    if (isFetching || !chatId || preventFetch) return;
    const container = containerRef.current;

    if (container.scrollTop != 0 || isFetching) return;
    setIsFetching(true);

    try {
      let nextPage = page + 1;
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API}/api/v1/chats/history/${chatId}/${nextPage}`,
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
        setMessages((prev) => [...data.data, ...prev]);
        if (data.data.length < 30) {
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
    setIsPrivateMessagesLoading(true)

    const container = containerRef.current;

    if (container) {
      container.addEventListener("scroll", fetchMoreMessages);
    }
    setIsPrivateMessagesLoading(false)

    // Cleanup event listener on component unmount
    return () => {
      if (container) {
        container.removeEventListener("scroll", fetchMoreMessages);
      }
    };
  }, [userMessages]);

  useEffect(() => {
    if (!socket) return;
    socket.on("privateMessageDeleted", ({ messageId }) => {
      setMessages(prev => prev.filter(msg => msg._id !== messageId));
    });
  }, [socket, chatId, userMessages]);

  const isAnyImageUploading = Object.values(uploadingImages).some(status => status === true);
    
    // Add this useEffect hook
    useEffect(() => {
      adjustTextareaHeight();
    }, [msgToSend]);

  const textareaRef = useRef(null);
    // Add this near your component's top-level
  // Add this ref declaration with your other refs
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${INITIAL_TEXTAREA_HEIGHT}px`; // Explicitly set initial height
    }
  }, []); // Run only on mount
  useEffect(() => {
    console.log("Effect triggered: Adjusting textarea height...");
    adjustTextareaHeight();
  }, [msgToSend]);
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
  // Add this useEffect hook in your component
useEffect(() => {
  if (!socket) return;

  const handlePrivateMessageUpdate = (updatedMessage) => {
    setMessages(prev => prev.map(msg => 
      msg._id === updatedMessage.messageId
        ? { ...msg, content: updatedMessage.newContent, updatedAt: updatedMessage.updatedAt }
        : msg
    ));
  };

  socket.on("PrivateMessageUpdated", handlePrivateMessageUpdate);

  // Cleanup function
  return () => {
    socket.off("PrivateMessageUpdated", handlePrivateMessageUpdate);
  };
}, [socket]); // Dependency array ensures proper cleanup/re-initialization


  return (
    <div className="flex h-full flex-col" style={{
      backgroundColor:"hsl(211.3 46.939% 9.6078%)"
    }}>
      <div className="z-20 flex flex-col flex-1">
        <div className="relative h-full flex-1 bg-neutral">
          <div className="absolute top-0 right-0 left-0 z-20 flex flex-col">
            {/* for the title of the channel */}
            <header className="flex flex-shrink-0 items-end justify-between !pt-0 relative z-10   bg-base-300">
              <section className="flex h-full w-full items-center justify-between pl-3 py-2 text-lg bg-[#213043] ">
                <div className="flex w-full items-center font-medium">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex items-center gap-3 font-medium">
                      <GiHamburgerMenu className=" text-2xl cursor-pointer"onClick={toggleSidebar}/>
                      <p className="flex items-center gap-[2px]">
                        <span className="text-slate-500 pr-1 pt-1 ">@</span> 
                        {recipient}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </header>
              </div>
          {/* for the chat  */}
          {isPrivateMessagesLoading ? (
            <div className="flex justify-center items-center h-full">
              <LoadingSpinner />
            </div>
          ) : (
            <div
              className="absolute translate-y-0 opacity-100"
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
                      const isTopMessage = index === 0 && messages.length == 30;
                      return (
                        <div
                          key={message._id}
                          ref={isTopMessage ? topMessageRef : null}
                        >
                          <Message message={message} handleEditMessage={handleEditMessage}/>
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
              
              {/* for the input  */}
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
                            {uploadingImages[image.id] && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                              </div>
                            )}
                            {/* Status indicator */}
                            {image.status === 'failed' && (
                              <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
                                Failed
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => removeImage(image.id)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label={`Remove ${image.file.name}`}
                              disabled={uploadingImages[image.id]}

                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
              <div className="w-full flex flex-row items-center px-2 py-1 gap-3">
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
                      <div className="flex gap-1">
                    <button
                      type="button"
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
                        backgroundColor:"hsl(213.53 34% 19.608%)"
                      }}>                    
                    <textarea
                      ref={textareaRef}
                      id="chat-input"
                      style={{ 
                        minHeight: `${INITIAL_TEXTAREA_HEIGHT}px`,
                        maxHeight: `${MAX_TEXTAREA_HEIGHT}px`,
                      }}
                      className="top-0 left-0 resize-none border-none bg-transparent px-3 py-[6px] text-sm outline-none w-full overflow-y-auto min-h-[18px]"
                      placeholder={isAnyImageUploading ? "Uploading images..." : `Message @ ${recipient}`}
                      value={msgToSend}
                      onChange={(e) => {setMessageToSend(e.target.value)}}
                      onKeyDown={handleKeyDown}
                      disabled={isAnyImageUploading}

                    ></textarea>
                  </form>
                  
                  <button 
                    className={`bg-slate-700 rounded-full p-[5px] cursor-pointer ${(disable || isAnyImageUploading || (!msgToSend.trim() && images.length === 0)) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleSubmit}
                    disabled={disable || isAnyImageUploading || (!msgToSend.trim() && images.length === 0)}
                  >
                    {isAnyImageUploading ? (
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
              
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

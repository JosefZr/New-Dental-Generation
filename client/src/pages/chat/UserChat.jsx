import Devider from "@/components/chatComponents/Devider";
import Message from "@/components/chatComponents/Message";
import { useSocket } from "../../socketContext";
import { Plus, X } from 'lucide-react'
import { Input } from "@/components/ui/input"

import { useState, useEffect, useRef, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "@/context/UserContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useUserToChatContext } from "@/context/ToChatUser";
import { IoIosSend } from "react-icons/io";
  import { marked } from 'marked';
  import DOMPurify from 'dompurify';
export default function UserChat() {

  const {clickedUser} = useUserToChatContext();

  const [recipient, setRec] = useState("");
  const [msgToSend, setMessageToSend] = useState("");
  const [preventFetch, setPrevent] = useState(false);
  const [uploadingImages, setUploadingImages] = useState({});

  const [page] = useState(1); // Track the current page
  const [isFetching, setIsFetching] = useState(false); // Prevent duplicate fetches

  const socket = useSocket();
  const {isSidebarOpen, setIsSidebarOpen,userMessages,chatId,isDashboardSidebarOpen,setIsDashboardSidebarOpen} = useContext(UserContext);
  const [messages, setMessages] = useState(userMessages || []);
  const [images, setImages] = useState([])
  const [imagesTosnd, setImagesToSnd] = useState([])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsDashboardSidebarOpen(!isDashboardSidebarOpen);

  };
  const lastMessageRef = useRef(null);
  const topMessageRef = useRef(null);
  const containerRef = useRef(null);


  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
        // Initialize loading state for new images
        const newUploadingState = {};
        newImages.forEach(img => {
          newUploadingState[img.id] = false;
        });
        setUploadingImages(prev => ({...prev, ...newUploadingState}));
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
    
    // Clean up loading state
    setUploadingImages(prev => {
      const newState = {...prev};
      delete newState[id];
      return newState;
    });
  }
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
    if (!msgToSend.trim() && !imagesTosnd) return;

    console.log(imagesTosnd , msgToSend)

    socket.emit("privateMessage", {
      content: msgToSend,
      recipient: chatId,
      images: imagesTosnd
    });

    setMessageToSend("")
    setImages([])
    setImagesToSnd([])
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
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

  const scrollToBottom = () => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

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


  const [disable , setDisable] = useState(false)

// Add this near your component's top-level
const MAX_TEXTAREA_HEIGHT = 200; // Set your maximum height here

// Add this ref declaration with your other refs
const textareaRef = useRef(null);

// Add this useEffect hook
useEffect(() => {
  adjustTextareaHeight();
}, [msgToSend]);

// Update the adjustTextareaHeight function
const adjustTextareaHeight = () => {
  const textarea = textareaRef.current;
  if (!textarea) return;

  // Reset height first
  textarea.style.height = '20px';
  
  // Calculate new height with limits
  const newHeight = Math.min(
    textarea.scrollHeight,
    MAX_TEXTAREA_HEIGHT
  );

  // Apply calculated height (minimum 18px)
  textarea.style.height = `${Math.max(newHeight, 18)}px`;
  
  // Force reflow to ensure proper scroll detection
  void textarea.offsetHeight;
  
  // Toggle scroll visibility
  textarea.classList.toggle('overflow-y-auto', newHeight >= MAX_TEXTAREA_HEIGHT);
  textarea.classList.toggle('overflow-y-hidden', newHeight < MAX_TEXTAREA_HEIGHT);
};

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

  useEffect(() => {
    if (imagesTosnd && Array.isArray(imagesTosnd) && imagesTosnd.length > 0) {
      sendMessage();
      setMessageToSend("");
    }
  }, [imagesTosnd]);


  ////////////////

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

  useEffect(() => {
    if (!socket) return;
    socket.on("privateMessageDeleted", ({ messageId }) => {
      setMessages(prev => prev.filter(msg => msg._id !== messageId));
    });
  }, [socket, chatId, userMessages]);
  const isAnyImageUploading = Object.values(uploadingImages).some(status => status === true);
// 3. Formatting insertion logic
const insertFormatting = (symbol) => {
  const textarea = textareaRef.current;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = msgToSend;
  
  // Get selected text or empty string if no selection
  const selectedText = text.substring(start, end);
  
  const newText = `${text.substring(0, start)}${symbol}${selectedText}${symbol}${text.substring(end)}`;
  setMessageToSend(newText);

  // Adjust cursor position after insertion
  // Update cursor position
  setTimeout(() => {
    textarea.selectionStart = start + symbol.length;
    textarea.selectionEnd = end + symbol.length;
    textarea.focus();
  }, 0);
};

// 4. Preview rendering logic
// Preview rendering logic
const renderPreview = () => {
  const dirty = marked.parse(msgToSend || '');
  const clean = DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'strong', 'i', 'em', 'p', 'br']
  });
  return { __html: clean };
};
  return (
    <div className="flex h-full flex-col" style={{
      backgroundColor:"hsl(211.3 46.939% 9.6078%)"
    }}>
      <div className="z-20 flex flex-col flex-1">
        <div className="relative h-full flex-1 bg-neutral">
          <div className="absolute top-0 right-0 left-0 z-20 flex flex-col">
            {/* for the title of the channel */}
            <header
              className="flex flex-shrink-0 items-end justify-between !pt-0 relative z-10   bg-base-300"
              
            >
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
            {/*<div className="absolute top-[108px] right-0 left-0 z-[11] user-select-none flex h-[28px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap bg-indigo-800 bg-opacity-80 px-3 font-semibold text-accent-content text-md backdrop-blur-[20px] backdrop-filter transform cursor-pointer transition-all duration-200 translate-y-0 opacity-100">
              <div>New since 5 days ago</div>
              <div className="flex items-center">
                {" "}
                Jump to unread <FaArrowUp className="ml-2" />
              </div>
            </div>*/}
          </div>

          {/* for the chat  */}
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
              disable ? " pointer-events-none" : ""
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
                      <form onSubmit={handleSubmit} className="relative block min-h-[32px] rounded-2xl flex-1"style={{
                        backgroundColor:"hsl(213.53 34% 19.608%)"
                      }}>                    
                    <textarea
                      ref={textareaRef}
                      id="chat-input"
                      style={{ 
                        minHeight: '18px', 
                        maxHeight: `${MAX_TEXTAREA_HEIGHT}px`,
                      }}
                      className="top-0 left-0 resize-none border-none bg-transparent px-3 py-[6px] text-sm outline-none w-full overflow-y-auto min-h-[18px]"
                      placeholder={isAnyImageUploading ? "Uploading images..." : `Message @ ${recipient}`}
                      value={msgToSend}
                      onChange={(e) => setMessageToSend(e.target.value)}
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
                      <IoIosSend className="text-xl mr-[1px] text-my-gold" />
                    )}
                  </button>
              </div>
              {/* {isAnyImageUploading && (
                <div className="text-xs text-center text-gray-400 pb-1">
                  Uploading images... Please wait
                </div>
              )} */}
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "@/context/UserContext";
import { useUserToChatContext } from "@/context/ToChatUser";
import ProfileImage from "../chatComponents/ProfileImage";
import { IoMdClose, IoMdPeople } from "react-icons/io";
import { 
  IoSettingsOutline, 
} from "react-icons/io5";
import { 
  FaTools, 
  FaUserShield, 
  FaCouch 
} from "react-icons/fa";
import { TiContacts } from "react-icons/ti";
import { ImQuotesLeft } from "react-icons/im";

export default function DashboardSidebar() {
  const { setChatId, fetchMessages } = useContext(UserContext);
  const [privateChats, setPrivateChats] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [activeButton, setActiveButton] = useState('');
  const userInfo = jwtDecode(localStorage.getItem('token'));
  const { clickedUser, setClickedUserId } = useUserToChatContext();
  const location = useLocation();
  const isAdmin = userInfo?.role === 'admin' // Check if user is admin
  const {isPrivateMessagesLoading,setIsPrivateMessagesLoading} = useUserToChatContext()

  useEffect(() => {
    // Set active button based on current path
    const currentPath = location.pathname;
    const buttons = [
      { path: `/profile/${userInfo.userId}`, label: 'Settings' },
      { path: '/instructor', label: 'Courses' },
      { path: '/dashboard/friends', label: 'Friends' },
      { path: '/dashboard/dental-stuff', label: 'Dental Stuff' },
      { path: '/dashboard/quotes', label: 'Quotes' },
      { path: '/dashboard/users', label: 'Users' },
      { path: '/dashboard/emails', label: 'emails' }

    ];

    const activeBtn = buttons.find(btn => currentPath.includes(btn.path));
    if (activeBtn) {
      setActiveButton(activeBtn.label);
    }
  }, [location.pathname]);

// Updated renderSidebarButtons function
const renderSidebarButtons = () => {
  const buttons = [
    {
      icon: IoSettingsOutline,
      label: 'Settings',
      path: `/profile/${userInfo.userId}`,
      everyone: true // Show to everyone
    },
    {
      icon: FaCouch,
      label: 'Courses',
      path: '/instructor',
      adminOnly: true
    },
    {
      icon: TiContacts,
      label: 'Friends',
      path: '/dashboard/friends',
      everyone: true
    },
    {
      icon: FaTools,
      label: 'Dental Stuff',
      path: '/dashboard/dental-stuff',
      adminOnly: true
    },
    {
      icon: ImQuotesLeft,
      label: 'Quotes',
      path: '/dashboard/quotes',
      adminOnly: true
    },
    {
      icon: FaUserShield,
      label: 'Users',
      path: '/dashboard/users',
      adminOnly: true
    },
    {
      icon: IoMdPeople,
      label: 'Free Analyses',
      path: 'analyse',
      adminOnly: true
    },{
      icon: IoMdPeople,
      label: 'Emails',
      path: 'emails',
      adminOnly: true
    }
  ];

  return buttons
    .filter(button => 
      // Show if: button is for everyone OR (button is admin-only AND user is admin)
      button.everyone || (button.adminOnly && isAdmin)
    )
    .map((button, index) => (
      <button
        key={index}
        className={`flex items-center gap-3 border-b p-3 text-left text-sm last:border-0 w-full border-none ${
          activeButton === button.label 
            ? 'bg-[#1f7498] text-white' 
            : 'hover:bg-[#1f7498] bg-transparent'
        }`}
        style={{ flexDirection: "row" }}
        onClick={() => {
          navigate(button.path);
          setActiveButton(button.label);
        }}
      >
        <button.icon className="h-[24px] w-[24px]"/>
        <div className="flex-1">{button.label}</div>
      </button>
    ));
};

  useEffect(() => {
    if (clickedUser.userId) {
      setChatId(clickedUser.userId);
      fetchMessages(clickedUser.userId);
    }
  }, [clickedUser]);

  useEffect(() => {
    const fetchPrivateChats = async () => {
      try {
        setIsPrivateMessagesLoading(true);
        setPrivateChats([]);
    
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/chats/all`, {
          method: "GET",
          headers: { Authorization: token }
        });
    
        if (!response.ok) throw new Error("Failed to fetch private chats");
        
        const data = await response.json();
        setPrivateChats(data);
        // Add slight delay for better visual feedback
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsPrivateMessagesLoading(false);
        
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      }
    };

    fetchPrivateChats();
  }, []);

  const handleChatSelect = (recipientId, username) => {
    setClickedUserId({ userId: recipientId, username });
  };
const [isFirstCallMade, setIsFirstCallMade] = useState(false);
const {isDashboardSidebarOpen,setIsDashboardSidebarOpen,isSidebarOpen, setIsSidebarOpen} = useContext(UserContext);

  useEffect(() => {
    if (!isFirstCallMade && privateChats.data?.length > 0 && userInfo) {
      // Determine the channels based on the user's role
      // Fetch the first channel for the user's role
      const firstChannel = privateChats.data[0];
      if (firstChannel) {
        handleChatSelect(firstChannel.recipient._id, `${firstChannel.recipient.firstName} ${firstChannel.recipient.lastName}`);
        navigate("/dashboard/user-chat");
        if (window.innerWidth <= 620) {
          setIsDashboardSidebarOpen(!isDashboardSidebarOpen);
          }
        if (window.innerWidth <= 620) {
          setIsSidebarOpen(!isSidebarOpen);
        }
        setIsFirstCallMade(true); // Mark as executed
      }
    }
  }, [privateChats, isFirstCallMade, userInfo]);
  return (
    <section className="flex flex-1 flex-col overflow-x-hidden pt-inset-top lg:border-0 transition-all">
      <div className="flex w-full flex-1 flex-col items-center overflow-y-auto overflow-x-hidden pt-3">
        <div className="flex flex-col rounded-md border border-base-300 w-full border-none px-3">
          {renderSidebarButtons()}
        </div>
        <div className="my-3 h-[2px] w-[100%] bg-base-200"></div>
        
        <div 
          className="flex flex-col rounded-md p-2" 
          style={{
            borderColor:"hsl(var(210 27.586% 22.745%,213.53 34% 19.608%)/1)"
          }}
        >
          {privateChats.data &&
            privateChats.data.map((chat) => (
              <div
                key={chat.recipient._id}
                // style={{}}
                className="flex flex-col rounded-md w-full border-none"
                style={chat.recipient._id === clickedUser.userId ? { backgroundColor: "#1f7498", width:"calc(-64px + 87vw)", maxWidth:"296px"} : {width:"calc(-64px + 87vw)", maxWidth:"296px"}}
                onClick={() => {
                  setIsPrivateMessagesLoading(true)
                  handleChatSelect(chat.recipient._id, `${chat.recipient.firstName} ${chat.recipient.lastName}`);
                  navigate("/dashboard/user-chat");
                  if (window.innerWidth <= 620) {
                    setIsSidebarOpen(!isSidebarOpen);
                  }
                  if (window.innerWidth <= 620) {
                  setIsDashboardSidebarOpen(!isDashboardSidebarOpen);
                  }
                }}
              >
                <button
                  style={{ flexDirection: "row", display:"relative" }}
                  className="flex items-center gap-3 p-3 text-left text-sm last:border-0 hover:bg-info active:bg-info tracking-[0.015em] group w-full cursor-pointer bg-transparent px-3 py-2"
                >
                  <ProfileImage image={chat.recipient.avatar} />
                  <div className="flex-1">
                    <div className="mb-1 font-medium text-xs uppercase opacity-80">
                      <div className="overflow-ellipsis text-sm normal-case">
                        <span className="inline-flex items-center overflow-ellipsis">
                          {`${chat.recipient.firstName} ${chat.recipient.lastName}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-full p-2 invisible group-hover:visible hover:bg-gray-500"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <IoMdClose className="text-xl" />
                  </div>
                </button>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
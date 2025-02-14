import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser]= useState({})
    const [users, setUsers] = useState([])
    const [owner, setOwner] = useState({});
    const [userPreview, setPreview] = useState({})
    const [friendsRequest, setFriendsRequest] = useState({})
    const [userMessages, setUserMessages] = useState([]);
    const [chatId, setChatId] = useState("");
    const [pendingRequests, setPendingRequests]=useState([])
    const [receivedRequests,setReceivedRequests] = useState([])
    const [friends,setFriends ] = useState([]);
    const [channelType, setChannelType] = useState('');
    const [channelAllowedUsers, setChannelAllowedUsers] = useState('');
    const [updateChannel, setUpdateChannel] = useState({})
    const [channels, setChannels] = useState([]);
    const [onSettingsToggle, setOnSettingsToggle] = useState(false)
    const [clickedChannel, setClickedChannel] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDashboardSidebarOpen,setIsDashboardSidebarOpen] = useState(false);
    const [isDhaboardOpen, setIsDhaboardOpen]= useState("")
    const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  const fetchMessages = async (recipientId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/chats/history/${recipientId}/1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch chat history: ${response.statusText}`);
      }
      const data = await response.json();
      setUserMessages(data.data);
    } catch (error) {
      console.error(error);
    }
  };
    return (
    <UserContext.Provider value={{
        user, setUser,
        users, setUsers,
        owner, setOwner,
        userPreview, setPreview,
        isSidebarOpen, setIsSidebarOpen,
        friendsRequest, setFriendsRequest,
        userMessages, setUserMessages,
        chatId, setChatId,
        fetchMessages,
        pendingRequests, setPendingRequests,
        receivedRequests,setReceivedRequests,
        setFriends,friends,
        channelType, setChannelType,
        channelAllowedUsers, setChannelAllowedUsers,
        updateChannel, setUpdateChannel,
        channels, setChannels,
        onSettingsToggle, setOnSettingsToggle,
        clickedChannel, setClickedChannel,
        isDashboardSidebarOpen,setIsDashboardSidebarOpen,
        isDhaboardOpen, setIsDhaboardOpen,
        isNewTaskOpen, setIsNewTaskOpen,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

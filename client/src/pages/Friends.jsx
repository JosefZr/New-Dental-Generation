import { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { jwtDecode } from "jwt-decode";
import { acceptFriendRequest, deleteFriend, deleteFriendRequest, deletePendingRequests, getAllPending, getAllReceived } from "@/services";
import { UserContext } from "@/context/UserContext";
import toast from "react-hot-toast";
import { FaUserMinus } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDone, MdMessage } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useUserToChatContext } from "@/context/ToChatUser";

export default function Friends() {


  const navigate = useNavigate();
  const {setClickedUserId} = useUserToChatContext();


  const [filter, setFilter] = useState("");
  const userInfo = jwtDecode(localStorage.getItem("token"));
  const { 
    pendingRequests, 
    setPendingRequests, 
    isSidebarOpen, 
    setIsSidebarOpen,
    receivedRequests,
    setReceivedRequests,
    setFriends,friends
  } = useContext(UserContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDeletePendingRequest = async (request) => {
    try {
      const response = await deletePendingRequests(userInfo.userId, request.receiver._id);
      if (response.success) {
        setPendingRequests(prev => prev.filter(r => r._id !== request._id));
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting pending request:", error);
      toast.error("Failed to delete request");
    }
  };

  const handleDeleteReceivedRequest = async (request) => {
    console.log(request.sender._id, userInfo.userId)
    try {
      const response = await deleteFriendRequest(request.sender._id, userInfo.userId);
      if (response.success) {
        setReceivedRequests(prev => prev.filter(r => r._id !== request._id));
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting received request:", error);
      toast.error("Failed to delete request");
    }
  };

  const handleAcceptFriendRequest = async (request) => {
    try {
        const response = await acceptFriendRequest( request.sender._id, userInfo.userId);
        if (response.success) {
            setReceivedRequests(response.data.friendRequest);
            setFriends(response.data.friends)            
            console.log(response.data)
            // setReceivedRequests(response.data);
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        } catch (error) {
        console.error("Error accepting request:", error);
        toast.error("Failed to accept request");
        }
    };
    const handleDeleteFriend = async (request)=>{
      console.log(request._id,request.sender._id, userInfo.userId)
      try {
        const response = await deleteFriend(request._id,request.sender._id, userInfo.userId);
        if (response.success) {
            setFriends(prev => prev.filter(r => r._id !== request._id))  
          
            console.log(response.data)
            toast.success(response.message);
        }
      } catch (error) {
        console.log("Error deleting friend:", error);
        toast.error("Failed to delete friend");
        
      }
    }

    useEffect(() => {
        const fetchRequests = async () => {
        try {
            const [pendingResponse, receivedResponse] = await Promise.all([
            getAllPending(userInfo.userId),
            getAllReceived(userInfo.userId)
            ]);

            if (pendingResponse.success) {
            setPendingRequests(pendingResponse.data.friendRequest);
            setFriends(pendingResponse.data.friends)
            }

            if (receivedResponse.success) {
            setReceivedRequests(receivedResponse.data.friendRequest);
            setFriends(receivedResponse.data.friends)

            }
        } catch (error) {
            console.error("Error fetching requests:", error);
            toast.error("Failed to load friend requests");
        }
        };

        fetchRequests();
    }, [userInfo.userId, setPendingRequests, setReceivedRequests]);

    const filteredPendingRequests = pendingRequests.filter(request =>
        request.receiver?.firstName?.toLowerCase().includes(filter.toLowerCase())
    );

    const filteredReceivedRequests = receivedRequests.filter(request =>
        request.sender?.firstName?.toLowerCase().includes(filter.toLowerCase())
    );
    const filteredFriends = friends.filter(request => {
        const friendName = userInfo.userId === request.sender._id 
            ? request.receiver?.firstName 
            : request.sender?.firstName;
            return friendName?.toLowerCase().includes(filter.toLowerCase());
        });

    return (
        <div className="max-md:fixed w-full mx-auto p-4 bg-gray-900">
        <Tabs defaultValue="pending" className="w-full max-w-2xl mx-auto">
            <TabsList className="w-full max-md:justify-start md:gap-5 mb-4 bg-gray-900">
            <GiHamburgerMenu 
                className="md:hidden text-2xl min-h-5 min-w-5" 
                onClick={toggleSidebar}
            />
            <TabsTrigger
                value="friends"
                className="px-4 py-2 transition-all bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-50 data-[state=active]:bg-transparent rounded-none data-[state=active]:text-my-white"
            >
                Friends ({friends.length})
            </TabsTrigger>
            <TabsTrigger
                value="pending"
                className="px-4 py-2 transition-all bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-50 data-[state=active]:bg-transparent rounded-none data-[state=active]:text-my-white"
            >
                Pending ({filteredPendingRequests.length})
            </TabsTrigger>
            <TabsTrigger
                value="received"
                className="px-4 py-2 transition-all bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-50 data-[state=active]:bg-transparent rounded-none data-[state=active]:text-my-white"
            >
                Received ({filteredReceivedRequests.length})
            </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Input
            placeholder="Filter Pending"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mb-4 border-slate-800 bg-my-dark-blue"
          />
          <div className="space-y-2">
            {filteredPendingRequests.map((request) => (
              <div
                key={request._id}
                className="flex items-center justify-between p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`${import.meta.env.VITE_SERVER_API}/uploads/${request.receiver.avatar}`}
                    />
                    <AvatarFallback>
                      {request.receiver.firstName?.[0] || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {request.receiver.firstName}
                    </span>
                    <span className="text-xs text-gray-400">
                      Outgoing friend request
                    </span>
                  </div>
                </div>
                <button
                  className="h-8 w-8 rounded-full bg-slate-950 flex items-center justify-center"
                  onClick={() => handleDeletePendingRequest(request)}
                >
                  <FaUserMinus className="text-xl text-my-white" />
                </button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="received" className="space-y-4">
          <Input
            placeholder="Filter Received"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mb-4 border-slate-800 bg-my-dark-blue"
          />
          <div className="space-y-2">
            {filteredReceivedRequests.map((request) => (
              <div
                key={request._id}
                className="flex items-center justify-between p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`${import.meta.env.VITE_SERVER_API}/uploads/${request.sender.avatar}`}
                    />
                    <AvatarFallback>
                      {request.sender.firstName?.[0] || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {request.sender.firstName}
                    </span>
                    <span className="text-xs text-gray-400">
                      Incoming friend request
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="h-8 w-8 rounded-full bg-slate-950 flex items-center justify-center"
                    onClick={() => handleAcceptFriendRequest(request)}
                  >
                    <MdDone className="text-xl text-green-500" />
                  </button>
                  <button
                    className="h-8 w-8 rounded-full bg-slate-950 flex items-center justify-center"
                    onClick={() => handleDeleteReceivedRequest(request)}
                  >
                    <IoMdClose className="text-xl text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="friends">
        <Input
            placeholder="Filter Friends"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mb-4 border-slate-800 bg-my-dark-blue"
        />
        <div className="space-y-2">
        {filteredFriends.map((request) => {
              // Determine if current user is sender or receiver
              const isSender = userInfo.userId === request.sender._id;
              const friend = isSender ? request.receiver : request.sender;
              
              return (
                <div
                  key={request._id}
                  className="flex items-center justify-between p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={`${import.meta.env.VITE_SERVER_API}/uploads/${friend.avatar}`}
                      />
                      <AvatarFallback>
                        {friend.firstName?.[0] || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {friend.firstName}
                      </span>
                      <span className="text-xs text-gray-400">
                        Friend
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row-reverse items-center gap-3 ">
                  <button
                    className="h-8 w-8 rounded-full bg-slate-950 flex items-center justify-center"
                    onClick={() => handleDeleteFriend(request)}
                  >
                    <FaUserMinus className="text-xl text-my-white" />
                  </button>
                  <button
                    className="h-8 w-8 rounded-full bg-slate-950 flex items-center justify-center"
                    onClick={() => {
                      setClickedUserId({ userId: friend._id, username: `${friend.firstName} ${friend.lastName}` });
                      navigate("/dashboard")
                    }}
                  >
                    <MdMessage className="text-xl text-my-white" />
                  </button>
                  </div>
                </div>
              );
            })}
        </div>        
        </TabsContent>
    </Tabs>
</div>
);
}
import { IoSettingsOutline } from "react-icons/io5";
import ProfileImage from "../chatComponents/ProfileImage";
import { IoMdClose } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "@/context/UserContext";
import { useUserToChatContext } from "@/context/ToChatUser";
// import UserChat from "@/pages/chat/UserChat";
import { FaUserFriends } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { FaCouch } from "react-icons/fa6";


export default function DashboardSidebar() {
    const {setChatId,fetchMessages } = useContext(UserContext);

  
  const [privateChats, setPrivateChats] = useState({});
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = jwtDecode(localStorage.getItem('token'))

  const {clickedUser , setClickedUserId} = useUserToChatContext();

  // comming from models 
  useEffect(() => {
    if (clickedUser.userId) {
      setChatId(clickedUser.userId);
      fetchMessages(clickedUser.userId);
    }
  }, [clickedUser]);




  useEffect(() => {
    const fetchPrivateChats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authorization token is missing");

        const response = await fetch("http://localhost:3000/api/v1/chats/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch private chats: ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log(data)
        setPrivateChats(data);
      } catch (err) {
        console.error("Error fetching private chats:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivateChats();
  }, []);

  const handleChatSelect = (recipientId, username) => {
    setClickedUserId({userId : recipientId , username});
  };
  return (
    <>
    <section className="flex flex-1 flex-col overflow-x-hidden border-grey-secondary border-r bg-base-100 pt-inset-top lg:border-0">
      <div className="flex w-full flex-1 flex-col items-center overflow-y-auto overflow-x-hidden pt-3">
        <div className="flex flex-col rounded-md border border-base-300 w-full border-none px-3">
          <button
            onClick={()=> navigate(`/profile/${userInfo.userId}`)}
            className="relative flex flex-row items-center gap-3 border-base-300 border-b p-3 text-left text-sm last:border-0 active:bg-info hover:bg-info tracking-[0.015em] w-full border-none bg-transparent"
            style={{ flexDirection: "row" }}
          >
            <IoSettingsOutline />
            <div className="flex-1">Settings</div>
          </button>
          <button
            className="relative flex items-center gap-3 border-base-300 border-b p-3 text-left text-sm last:border-0 active:bg-info hover:bg-info tracking-[0.015em] w-full border-none bg-transparent"
            style={{ flexDirection: "row" }}
            onClick={() => navigate(`/instructor`)} // Ensure this route matches
            >
            <FaCouch />

            <div className="flex-1">Courses</div>
          </button>
          <button
            className="relative flex items-center gap-3 border-base-300 border-b p-3 text-left text-sm last:border-0 active:bg-info hover:bg-info tracking-[0.015em] w-full border-none bg-transparent"
            style={{ flexDirection: "row" }}
            onClick={() => navigate(`/dashboard/friends`)} // Ensure this route matches
            >
            <FaUserFriends />
            <div className="flex-1">Friends</div>
          </button>
          <button
                className="relative flex items-center gap-3 border-base-300 border-b p-3 text-left text-sm last:border-0 active:bg-info hover:bg-info tracking-[0.015em] w-full border-none bg-transparent"
                style={{ flexDirection: "row" }}
                onClick={()=>navigate(`/dashboard/dental-stuff`)}
              >
                <FaTools />
                <div className="flex-1">Dental Stuff</div>
              </button>
          {
            userInfo.role==="admin"? (
              <button
                className="relative flex items-center gap-3 border-base-300 border-b p-3 text-left text-sm last:border-0 active:bg-info hover:bg-info tracking-[0.015em] w-full border-none bg-transparent"
                style={{ flexDirection: "row" }}
                onClick={()=>navigate(`/users`)}
              >
                <IoSettingsOutline />
                <div className="flex-1">Users</div>
              </button>
            ):(
              <button
                className="relative flex items-center gap-3 border-base-300 border-b p-3 text-left text-sm last:border-0 active:bg-info hover:bg-info tracking-[0.015em] w-full border-none bg-transparent"
                style={{ flexDirection: "row" }}
                onClick={()=>navigate(`/users`)}

              >
                <FaUserShield />
                <div className="flex-1">Users</div>
              </button>
            )
          }
        </div>
        <div className="my-3 h-[2px] w-[80%] bg-base-200"></div>
        <section className="mb-2 flex flex-col gap-2 px-1">
          <h3 className="mb-1 ml-1 w-full font-bold text-gray-400 text-xs uppercase">
            Direct messages
          </h3>
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search DMs"
              className="input input input-bordered input-md flex-1 input-sm input-bordered focus:outline-offset-0"
            />
          </div>
        </section>
        <div className="flex flex-col ">
          {privateChats.data &&
            privateChats.data.map((chat) => {
              return (
                <div
                  key={chat.recipient._id}
                  className="flex flex-col rounded-md  w-full "
                  onClick={() => {handleChatSelect(chat.recipient._id , `${chat.recipient.firstName} ${chat.recipient.lastName}` )
                  navigate("/dashboard/user-chat")
                } }
                >
                  <button
                    style={{ flexDirection: "row" }}
                    className="relative flex items-center flex-row gap-3 border-base-300 border-b  text-left text-sm last:border-0 active:bg-info hover:bg-info !bg-info !font-bold group w-full cursor-pointer bg-transparent px-2 py-2"
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
                    <button className=" rounded-full p-2 invisible group-hover:visible hover:bg-gray-500">
                      <IoMdClose className="text-xl" />
                    </button>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </section>
    </>
  );
}

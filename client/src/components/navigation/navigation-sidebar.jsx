import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./NavigationItem";
import { IoChatbubblesOutline } from "react-icons/io5";
import { SiWorldhealthorganization } from "react-icons/si";
import { GiEarthAfricaEurope, GiTakeMyMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../chatComponents/ProfileImage";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { fetchUserData } from "@/hooks/useFetchUserData";
import { jwtDecode } from "jwt-decode";
import { FaRegChessKnight } from "react-icons/fa6";
export default function NavigationSidebar() {
  const servers = [
    {
      id: "channels",
      name: "dental lab",
      imageUrl: <GiEarthAfricaEurope className="object-cover w-full h-full" />,
    },
    {
      id: "chat2",
      name: "dental store",
      imageUrl: 
        <FaRegChessKnight className=" object-cover w-full h-full"/>,
      
    },
    {
      id: "chat3",
      name: "dentist",
      imageUrl: <GiTakeMyMoney  className="object-cover w-full h-full" />,
    },
  ];
  const userInfo= jwtDecode(localStorage.getItem("token"))
      const {user, setUser } = useContext(UserContext);
  
      // Effect to fetch user data
      useEffect(() => {
          const fetchData = async () => {
          try {
              const data = await fetchUserData(userInfo.userId);
              setUser(data.user);
          } catch (err) {
              console.error("Error fetching user data:", err);
          }
          };
          fetchData();
      }, []);
  const navigate = useNavigate();
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-my-white-gray w-full  py-6">
      <div
        className="relative flex h-[64px] w-full items-center justify-center transition-opacity"
        onClick={() => navigate("/dashboard")}
      >
        <ProfileImage image={user.avatar} />
      </div>
      <Separator className="h-[2px] bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server, index) => (
          <div key={index}>
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className=" pb-3 mt-auto items-center flex-row gap-Y-4">
      </div>
    </div>
  );
}

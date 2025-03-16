import { UserContext } from "@/context/UserContext";
import { fetchUserData } from "@/hooks/useFetchUserData";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Preview from "@/components/Profile/Preview";
import AvatarBachrounds from "@/components/Profile/AvatarBachrounds";
import Bio from "@/components/Profile/Bio";
import { GiHamburgerMenu } from "react-icons/gi";


export default function MyProfile() {
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate()

  const { setOnSettingsToggle } = useContext(UserContext)

  const toggleSidebar = () => {
    setOnSettingsToggle((prev) => !prev)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData(id); // Use `id` from useParams
        console.log("Fetched User Data:", data); // For debugging
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchData();
  }, [id]);


  return (
    <div className="custom-scroll overflow-y-auto overflow-x-hidden">
    <button
      className="absolute top-2 left-2 cursor-pointer z-50 p-2 hover:bg-gray-800 rounded-md transition-colors"
      onClick={toggleSidebar}
    >
      <GiHamburgerMenu className=" text-2xl text-white" />
    </button>
      <AvatarBachrounds userInfo={user}/>
      <h3 className="mt-3 p-2 font-bold text-md">BIO (Max 200 characters)</h3>
      <Bio/>
      <div className="mt-3 mb-6 h-1 w-full bg-my-gold"> </div>
      <h3 className="mb-1 font-bold text-lg">Preview</h3>
      <Preview user ={user}/>
      <div className="absolute top-0 right-0 m-[16px] flex flex-col items-center " bisSkinChecked="1">
      <button className="btn !bg-transparent btn-circle" onClick={()=>navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        </button>
        <span className="mt-1 text-xs opacity-80">ESC</span>
      </div>
    </div>
  );
}

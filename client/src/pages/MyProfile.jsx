import { UserContext } from "@/context/UserContext";
import { fetchUserData } from "@/hooks/useFetchUserData";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import Preview from "@/components/Profile/Preview";
import AvatarBachrounds from "@/components/Profile/AvatarBachrounds";
import Bio from "@/components/Profile/Bio";


export default function MyProfile() {
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);


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
    <>
      <AvatarBachrounds userInfo={user}/>
      <h3 className="mt-3 p-2 font-bold text-md">BIO (Max 200 characters)</h3>
      <Bio/>
      <div className="mt-3 mb-6 h-1 w-full bg-my-gold"> </div>
      <h3 className="mb-1 font-bold text-lg">Preview</h3>
      <Preview user ={user}/>
    </>
  );
}

import { BsPen } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { FiKey } from "react-icons/fi";
import { BsAt } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "@/hooks/useModalStore";
import { fetchUserData } from "@/hooks/useFetchUserData";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { GiHamburgerMenu } from "react-icons/gi";
export default function MyAccount() {
  const navigate = useNavigate()
  const { id } = useParams();
  const {user, setUser} = useContext(UserContext);

  const {onOpen} = useModal();
  const { onSettingsToggle, setOnSettingsToggle } = useContext(UserContext)

  const toggleSidebar = () => {
    setOnSettingsToggle((prev) => !prev)
  }
      useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await fetchUserData(id); // Use `id` from useParams
            console.log("Fetched User Data:", data); // For debugging
            setUser(data.user)
          } catch (err) {
            console.error("Error fetching user data:", err);
          }
        };
        fetchData();
      }, [id]);
  return (
    <>
     <button
        className="absolute max-sm:hidden top-2 left-2 cursor-pointer z-50 p-2 hover:bg-gray-800 rounded-md transition-colors"
        onClick={toggleSidebar}
      >
        <GiHamburgerMenu className=" text-2xl text-white" />
      </button>
      <div>
      <div className="flex items-center gap-3">
        <section className="relative flex-shrink-0 rounded-full bg-base-300" style={{width:"62px", height:"62px"}}>
          {user.avatar ===`/default-avatar.jpg`?
            (<img 
              src={`/default-avatar.jpg`} 
              alt="" className="rounded-full object-cover" 
              style={{width:"62px",height:"62px"}} 
              loading="lazy"
            />):
            (
              <img 
              src={`${import.meta.env.VITE_SERVER_API}/uploads/${user.avatar}`} 
              alt="" className="rounded-full object-cover" 
              style={{width:"62px",height:"62px"}} 
              loading="lazy"
            />
            )
          }
        </section>
        <div className="flex-1">
          <span className="inline-flex items-center text-xl uppercase">@{user.firstName} {user.lastName}</span>
          <div className="flex items-center gap-1 text-neutral-content text-xs opacity-80 lg:text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          {user._id}
          </div>
        </div>
        {/* <button className="btn btn-circle btn-ghost">
          <BsPen style={{width:"24px", height:"24px" }}/>
        </button> */}
      </div>

      <div className="mt-6 flex w-full flex-col">
        <b className="mb-2">Account Information</b>
        <div className="flex flex-col rounded-md border border-slate-600 border-none ">
          <div className="rounded-md  p-[1px]">
            <div className="w-full rounded-md bg-slate-950 border border-my-gold">
              <button className=" flex items-center gap-3 border-slate-700 border-b p-3 text-left text-sm last:border-0 active:bg-info tracking-[0.015em] w-full rounded-t-md hover:bg-white hover:bg-opacity-10">
                <MdOutlineMail style={{width:"24px", height:"24px"}}/>
                <div className="flex-1">
                  <div className="mb-1 font-medium text-xs uppercase opacity-80">Email Address (Unverified)</div>
                  {user.email}
                </div>
                <BsPen style={{width:"24px", height:"24px" }} onClick={()=>onOpen("updateEmail")}/>
              </button>

              <button className=" flex items-center gap-3 border-slate-700 border-b p-3 text-left text-sm last:border-0 active:bg-info tracking-[0.015em] w-full rounded-t-md hover:bg-white hover:bg-opacity-10">
                <FiKey  style={{width:"24px", height:"24px"}}/>
                <div className="flex-1">
                  <div className="mb-1 font-medium text-xs uppercase opacity-80">password</div>
                  <span className="uppercase font-bold text-xl">••••••</span>
                </div>
                <BsPen style={{width:"24px", height:"24px" }} 
                  onClick={()=>onOpen("updatePassword")}
                />
              </button>

              <button className=" flex items-center gap-3 border-slate-700 border-b p-3 text-left text-sm last:border-0 active:bg-info tracking-[0.015em] w-full rounded-t-md hover:bg-white hover:bg-opacity-10">
                <BsAt  style={{width:"24px", height:"24px"}}/>
                <div className="flex-1">
                  <div className="mb-1 font-medium text-xs uppercase opacity-80">username</div>
                  {user.firstName} {user.lastName}
                </div>
                <BsPen 
                  style={{width:"24px", height:"24px"}} 
                  onClick={()=>onOpen("updateUsername")}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute top-0 right-0 m-[16px] flex-col items-center flex max-sm:hidden" bis_skin_checked="1">
      <button className="btn !bg-transparent btn-circle" onClick={()=>navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        </button>
        <span className="mt-1 text-xs opacity-80">ESC</span>
      </div>
    </>
  )
}

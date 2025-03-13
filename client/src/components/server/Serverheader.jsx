import {
  Landmark,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
export default function ServerHeader() {
  const navigate = useNavigate();

  try {
    const token = localStorage.getItem("token");
    if(!token)throw new Error("token not found")

  } catch (err) {
    throw new Error(err.message);
  }
  const handleNavigation = () => {
    navigate("/course");
  };
  return (
    <div>
      {/* {dentist ? (
        <DropdownMenu>
          <DropdownMenuTrigger className=" focus:outline-none " asChild>
            <button className=" w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-800 border-b-2 hover:bg-slate-800 transition">
              {/* {server.name} */}
              {/* first
              <ChevronDown className="h-5 w-5 ml-auto" />
            </button> */}
          {/* </DropdownMenuTrigger>
          <DropdownMenuContent className=" w-56 text-xs font-medium text-neutral-400 space-y-[2px] bg-my-dark-blue  border-none  ">
            {isModerator && (
              <DropdownMenuItem
                className="text-indigo-400 px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 "
                onClick={() => onOpen("invitePeople", { server })}
                style={{ display: "flex", flexDirection: "row" }}
              >
                Invite People
                <UserPlus className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            )}

            {dentist && (
              <DropdownMenuItem
                className=" px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 "
                style={{ display: "flex", flexDirection: "row" }}
                onClick={() => onOpen("editServer", { server })}
              >
                Server Settings
                <Settings className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            )}
            {dentist && (
              <DropdownMenuItem
                className=" px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 "
                style={{ display: "flex", flexDirection: "row" }}
                onClick={() => onOpen("manageMembers", { server })}
              >
                Manage Members
                <Users className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            )}
            {isModerator && (
              <DropdownMenuItem
                className=" px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 "
                style={{ display: "flex", flexDirection: "row" }}
                onClick={() => onOpen("createChannel", { server })}
              >
                create channel
                <PlusCircle className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            )}
            {isModerator && <DropdownMenuSeparator className="bg-my-tin" />}
            {dentist && (
              <DropdownMenuItem
                className="text-rose-500 px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 "
                style={{ display: "flex", flexDirection: "row" }}
              >
                Delete Server
                <Trash className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            )}
            {!dentist && (
              <DropdownMenuItem
                className="text-rose-500 px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 "
                style={{ display: "flex", flexDirection: "row" }}
              >
                Leave Server
                <LogOut className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu> */}
      
        <div
          onClick={handleNavigation}
          className="flex items-cente cursor-pointer bg-my-gold justify-center text-my-black py-2 font-bold text-lg gap-2"
        >
          <Landmark />
          SKILL UP
        </div>
      {/* // )} */}
    </div>
  );
}

import { cn } from "@/lib/utils"
import { ShieldAlert, User } from "lucide-react"
import { useParams } from "react-router-dom"

export default function ServerMember({member, server}) {

    // const roleIconMap = {
    //     [MemberRole.GUEST ]: null,
    //     [MemberRole.ADMIN ]: <ShieldAlert className=" w-4 h-4 ml-2 text-rose-500"/>,
    //     [MemberRole.MODERATOR]: <ShieldAlert className=" w-4 h-4 text-indigo-500"/>
    // }
    // const icon = roleIconMap [member.role]
    const params = useParams()
    return (
        <div>
            <button className={cn(
                "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/50 transition mb-1",
                // params.serverId === server.id && "bg-zinc-700"
            )}>
            mahmoud
            </button>
        </div>
    )
}

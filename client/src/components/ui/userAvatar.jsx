import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "./avatar"

export default function userAvatar({src, className}) {
  return (
    <Avatar className={cn(
        "h-7 w-7 md:h-10 md:w-10",className)}>
        <AvatarImage src={src} />
    </Avatar>
  )
}

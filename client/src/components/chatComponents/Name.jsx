import { useAuthUser } from "@/hooks/jwt/useAuthUser"

export default function Name({message}) {
      const userInfo = useAuthUser()
  return (
    <span
    className="inline-flex items-center cursor-pointer font-medium text-xs md:text-sm hover:underline"
    style={{
      color: `${
        message.sender?.role === "dentist"
          ? "#ECC879"
          : message.sender?.role === "store"
          ? "rgb(52, 152, 219)"
          : message.sender?.role === "lab"
          ? "rgb(255, 255, 255)"
          : message.sender?.role === "admin"
          ? "rgb(179, 51, 51)"
          : message.sender?.role === "moderator"
          ? "#C0C0C0"
          : "rgb(201, 142, 215)"
      }`,
    }}
  >
    {message.sender?._id === userInfo?.userId
      ? "You"
      : `${message?.sender?.firstName} ${message?.sender?.lastName}`}
  </span>
  )
}

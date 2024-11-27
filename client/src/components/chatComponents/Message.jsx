import { jwtDecode } from "jwt-decode";

export default function Message({ message }) {
  const userInfo = jwtDecode(localStorage.getItem("token"));

  const formattedDate = new Date(message.createdAt).toLocaleString("en-GB", {
    weekday: "short", // "Mon"
    day: "numeric", // "18"
    month: "short", // "Nov"
    hour: "2-digit", // "17"
    minute: "2-digit", // "22"
    hour12: true, // Optional for 12-hour format (e.g., 5:22 PM)
  });

  return (
    <div className="chat-item-wrapper will-change-transform translate-y-0 w-full">
      <div
        className="chat-message group relative flex w-full focus:border-primary lg:pr-4 focus:ring "
        style={{
          transition: "transform 0.25s ease-out",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <div className="h-full flex items-start justify-center flex-shrink-0  w-20">
          {/* the icon image */}
          <section
            className="relative rounded-full bg-base-300 block flex-shrink-0 cursor-pointer"
            style={{ width: "40px", height: "40px" }}
          >
            <img
              src={message.sender.avatar}
              className="rounded-full object-cover"
              loading="lazy"
              style={{ width: "40px", height: "40px" }}
              alt=""
            />
          </section>
        </div>
        <div className=" inline-block w-full rounded-md border bg-bubble-gradient p-5  border-transparent">
          {/* name and time of posting */}
          <div className="flex items-center">
            <span
              className="inline-flex items-center cursor-pointer font-medium text-xs md:text-sm hover:underline"
              style={{ color: "rgba(17,128,106)" }}
            >
              {message.sender._id === userInfo.userId
                ? "You"
                : `${message.sender.firstName} ${message.sender.lastName}`}
            </span>
            <span className="ml-3 cursor-default pt-[1px] text-3xs opacity-50">
              {formattedDate}
            </span>
          </div>
          <span className="custom-break-words break-words text-sm">
            <div className="sc-jEACwC gqSGRP markdown break-wordsfalse">
              <p className="text-sm">{message.content}</p>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

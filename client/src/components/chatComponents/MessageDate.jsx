export default function MessageDate ({message}){
    const formattedDate = new Date(message.createdAt).toLocaleString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return(
      <span
        className="ml-3 cursor-default pt-[1px] opacity-50"
        style={{
          fontFamily: "inter, system-ui, sans-serif",
          fontSize: "0.75rem",
        }}
      >
        {formattedDate}
      </span>
    )
  }

export default function MessageText({message}) {
  return (
    <p
        className="whitespace-pre-wrap"
        style={{
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        fontFamily: "inter, system-ui, sans-serif",
        }}
    >
        {message.content}
    </p>
  )
}

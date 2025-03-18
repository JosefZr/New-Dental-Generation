
export default function PreviewOriginalText({editingMessage,cancelEdit}) {
  return (
    <>
    {editingMessage && (
        <div className="animation-slide-up w-full flex items-center justify-between rounded-t-md bg-base-300 px-3 py-2" style={{
            backgroundColor:"hsl(210 27.586% 22.745%)"
            }}>
            <div className="flex max-w-[90%] flex-1 items-center whitespace-nowrap font-medium text-neutral-content text-sm">
                <span className="text-my-gold">Edit Message </span>
                <span className="ml-1 truncate font-normal " style={{
                color:"hsl(211.3 54.881% 81.922%)"
                }}>{editingMessage.content.slice(0, 30)} {editingMessage.content.length > 30 && "..."}</span>
            </div>
            <button 
                onClick={cancelEdit}
                className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full "
                style={{
                backgroundColor:'hsl(211.3 46.939% 9.6078%)'
                }}
            >
                ✕
            </button>
            </div>
        )}
    </>
  )
}

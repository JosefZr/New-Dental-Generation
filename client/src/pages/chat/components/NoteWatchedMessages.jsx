import { FaArrowUp } from 'react-icons/fa6'

export default function NoteWatchedMessages() {
    return (
        <div className="absolute top-[108px] right-0 left-0 z-[11] user-select-none flex h-[28px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap bg-indigo-800 bg-opacity-80 px-3 font-semibold text-accent-content text-md backdrop-blur-[20px] backdrop-filter transform cursor-pointer transition-all duration-200 translate-y-0 opacity-100">
            <div>New since 5 days ago</div>
            <div className="flex items-center">
                {" "}
                Jump to unread <FaArrowUp className="ml-2" />
            </div>
        </div>

    )
}

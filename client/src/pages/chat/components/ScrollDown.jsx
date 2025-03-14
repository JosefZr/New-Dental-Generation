import { FaArrowDown } from "react-icons/fa6";


export default function ScrollDown() {
  return (
    //  this for the user when he scroll up he can return and scroll to the present msg 

    <div className="w-full user-select-none flex h-[28px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap bg-opacity-80 px-3 font-medium text-sm backdrop-blur-[20px] backdrop-filter  z-100 mb-inset-bottom transform cursor-pointer transition-all duration-75 bg-base-300 text-base-content translate-y-0 opacity-100 bottom-full">
        <div>Viewing older messages</div>
        <div className="flex items-center">
        See present <FaArrowDown className="ml-2" />
        </div>
    </div>   
    )
}

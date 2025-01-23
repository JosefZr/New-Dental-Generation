import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";

import { IoMdClose } from "react-icons/io";
import Welcome from "./components/Welcome";
import Carousels from "./components/Carousels";
import DAilyCheckList from "./components/DAilyCheckList";
import { useState } from "react";
import Home from "./components/Home";
import SmallDailyCheckList from "./components/SmallDailyCheckList";
import { useLocation } from "react-router-dom";
import Schedular from "./components/Schedular";

const menuItems = [
    {
        label: "home",
        value: "home",
        component: (props) => <Home {...props} />,
    },
    {
        label: "checklist",
        value: "checklist",
        component: (props) => <SmallDailyCheckList {...props} />,
    },
    {
        label: "schedule",
        value: "schedule",
        component: (props) => <Schedular {...props} />, // You might want a separate component for 'schedule'.
    },
];


export default function BireModal() {
    const { isOpen, onClose, type } = useModal();
    const [activeTab, setActiveTab] = useState("home"); // Default active tab
    const location = useLocation();    
    const isChannelsRoute = location.pathname.includes(`/channels`); // Check if the current path includes the id
        // Check if the route contains "channels"

    // Ensure the modal only opens on the "channels" route
    const isModalOpen = isOpen && type === MODAL_TYPE.BIR && isChannelsRoute;

    const handleClose = () => {
        onClose();
    };
    return (
    <Dialog open={isModalOpen} onOpenChange={handleClose} className="modal-container pointer-events-auto fixed inset-0 flex transform cursor-auto justify-center transition-all duration-[250ms] lg:items-center items-center animate-scale-fade-in " style={{
        animationFillMode:"both"
    }}>
        <DialogContent  className=" border-none flex flex-col bg-neutral sm:w-full lg:rounded-lg  shadow-xl max-w-[100dvw] w-[100vw] max-h-[95%]  md:w-[100dvw] md:h-[100dvh] pointer-events-auto overflow-hidden rounded-t-3xl md:max-h-[93dvh] md:max-w-[93dvw] md:rounded-lg md:border md:border-primary md:border-solid max-md:p-0 ">
            <div className="max-md:hidden grid w-full grid-flow-row grid-cols-6 grid-rows-12 gap-3 bg-next-midnight px-5 h-full md:[&>_*]:[zoom:95%] xl:[&>_*]:[zoom:90%]">
                <div className="absolute top-[-48px] right-2 z-10 flex items-center justify-end sm:top-1">
                    <button
                        className="h-[2rem] w-[2rem] rounded-full px-1 bg-slate-950 text-center"
                        onClick={handleClose}
                        >
                        < IoMdClose className=" text-2xl text-my-white"/>
                    </button>
                </div>
                <Welcome/>
                <Carousels handleClose={handleClose}/>
                <DAilyCheckList/>
                <div className="w-full h-full col-span-3 row-span-9">

                <Schedular/>
                </div>
            </div>
            <div className="hidden z-[10] bg-[#0E1C26] max-md:inline h-full min-h-full  flex-col " >
                <div className="flex h-auto w-full flex-col swipe-dialog-scroll-descendant"> 
                    <div className="flex w-full items-center justify-end p-3">
                    <button
                        className="h-[2rem] w-[2rem] rounded-full px-1 bg-slate-950 text-center"
                        onClick={handleClose}
                        >
                        < IoMdClose className=" text-2xl text-my-white"/>
                    </button>
                    </div>
                    <div className="flex h-auto w-full justify-stretch">
                    {menuItems.map((menuItem, index) => (
                        <button 
                            key={index} 
                            className={`relative flex w-1/3 items-center justify-center py-3  cursor-pointer text-sm
                                `
                            }
                            onClick={() => setActiveTab(menuItem.value)}
                        >
                            <span className="block h-full capitalize transition-all duration-100 will-change-[transform,opacity,font-weight] font-semibold opacity-100" >
                                {menuItem.label}
                            </span>
                            { activeTab === menuItem.value ? 
                                <div className="absolute bottom-0 left-0 z-10 h-1 w-full bg-my-gold will-change-auto transform-none"></div>
                                : <div className="absolute bottom-0 left-0 z-[1] h-1 w-full bg-[#3D464D]" style={{backgroundColor: "rgb(40, 46, 51)"}}></div>
                            }
                        </button>
                    ))}
                    </div>
                </div>
                    {menuItems.find((menuItem) => menuItem.value === activeTab)?.component({
                        handleClose,
                    })}
            </div>
        </DialogContent>
    </Dialog>
)
}

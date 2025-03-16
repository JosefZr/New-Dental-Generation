import { MODAL_TYPE, useModal } from "@/hooks/useModalStore"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { IoMdClose } from "react-icons/io"
import Welcome from "./components/Welcome"
import Carousels from "./components/Carousels"
import DAilyCheckList from "./components/DAilyCheckList"
import { useState } from "react"
import Home from "./components/Home"
import SmallDailyCheckList from "./components/SmallDailyCheckList"
import { useLocation, useNavigate } from "react-router-dom"
import Schedular from "./components/Schedular"
import { IoSettingsOutline } from "react-icons/io5"
import BesideWelcome from "./components/BesideWelcome"

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
    component: (props) => <Schedular {...props} />,
  },
]

export default function BireModal() {
  const { isOpen, onClose, type } = useModal()
  const [activeTab, setActiveTab] = useState("home")
  const location = useLocation()
  const navigate = useNavigate()

  const isChannelsRoute = location.pathname.includes(`/channels`)
  const isModalOpen = isOpen && type === MODAL_TYPE.BIR && isChannelsRoute

  const handleClose = () => {
    onClose()
  }

  const handleSettings = () => {
    navigate("/dashboard")
    onClose()
  }

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={handleClose}
      className="modal-container pointer-events-auto fixed inset-0 flex transform cursor-auto justify-center transition-all duration-[250ms] lg:items-center items-center animate-scale-fade-in"
      style={{ animationFillMode: "both" }}
    >
      <DialogContent
        className="border-none flex flex-col sm:w-full lg:rounded-lg shadow-xl max-w-[100dvw] w-[100vw] max-h-[90%] max-sm:max-h-[100%] md:w-[100dvw] md:h-[100dvh] pointer-events-auto overflow-hidden rounded-t-3xl md:max-h-[93dvh] md:max-w-[93dvw] md:rounded-lg md:border md:border-my-gold md:border-solid max-md:p-0 py-2 px-3"
        style={{ backgroundColor: "rgb(6 14 21/1)" }}
      >
        {/* Desktop View */}
        <div className="max-md:hidden grid w-full h-full gap-4 md:[&>_*]:[zoom:95%] xl:[&>_*]:[zoom:90%]">
          {/* Close and Settings Buttons */}
          <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
            <button
              className="h-12 w-12 rounded-full bg-[#0E1C26] flex items-center justify-center"
              onClick={handleSettings}
            >
              <IoSettingsOutline className="h-6 w-6 text-my-white" />
            </button>
            <button
              className="h-12 w-12 rounded-full bg-[#0E1C26] flex items-center justify-center"
              onClick={handleClose}
            >
              <IoMdClose className="h-6 w-6 text-my-white" />
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="flex-1 grid grid-cols-6 gap-4 overflow-hidden">
            {/* Left Column */}
            <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
              {/* Welcome Section */}
              <div className="grid grid-cols-2 gap-4 h-[200px]">
                <Welcome />
                <BesideWelcome />
              </div>

              {/* Daily Checklist */}
            <div className="flex-1 overflow-hidden col-span-3 row-span-1 mt-4 h-full">
                <DAilyCheckList />
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
              {/* Carousels */}
              <div>
                <Carousels handleClose={handleClose} />
              </div>

              {/* Scheduler */}
              <div className="flex-1 rounded-xl bg-my-Modal-back p-4 overflow-hidden">
                <Schedular />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden z-[10] bg-[#0E1C26] h-full min-h-full flex flex-col">
          {/* Mobile Header */}
          <div className="flex w-full items-center justify-end p-3 gap-2">
            <button
              className="h-12 w-12 rounded-full bg-slate-950 flex items-center justify-center"
              onClick={handleSettings}
            >
              <IoSettingsOutline className="text-2xl text-my-white" />
            </button>
            <button
              className="h-12 w-12 rounded-full bg-slate-950 flex items-center justify-center"
              onClick={handleClose}
            >
              <IoMdClose className="text-2xl text-my-white" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex h-auto w-full justify-stretch">
            {menuItems.map((menuItem, index) => (
              <button
                key={index}
                className={`relative flex w-1/3 items-center justify-center py-3 cursor-pointer text-sm`}
                onClick={() => setActiveTab(menuItem.value)}
              >
                <span className="block h-full capitalize transition-all duration-100 will-change-[transform,opacity,font-weight] font-semibold opacity-100">
                  {menuItem.label}
                </span>
                <div
                  className={`absolute bottom-0 left-0 z-10 h-1 w-full ${
                    activeTab === menuItem.value ? "bg-my-gold" : "bg-[#282E33]"
                  }`}
                ></div>
              </button>
            ))}
          </div>

          {/* Mobile Content */}
          <div className="flex-1 overflow-hidden">
            {menuItems
              .find((menuItem) => menuItem.value === activeTab)
              ?.component({
                handleClose,
              })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


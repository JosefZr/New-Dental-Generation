"use client"

import styled from "styled-components"
import { GoPerson } from "react-icons/go"
import { FaChevronRight } from "react-icons/fa"
import { SlBadge } from "react-icons/sl"
import { ImProfile } from "react-icons/im"
import { IoClose, IoLogOutOutline } from "react-icons/io5"
import MyAccount from "./MyAccount"
import MyMembership from "./MyMembership"
import MyProfile from "./MyProfile"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/UserContext"
import { fetchUserData } from "@/hooks/useFetchUserData"
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore"
import { useNavigate, useParams } from "react-router-dom"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { FaArrowLeft } from "react-icons/fa6"

const Settings = styled.section`
  background-image: url("https://app.jointherealworld.com/assets/lines_background-DOaYsgXf.webp");
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: rgb(7 13 20 / var(1));
`

const Main = styled.main`
  background-image: url("https://app.jointherealworld.com/assets/lines_background-DOaYsgXf.webp");
  background-position: right center;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  --tw-bg-opacity: 1;
  background-color: rgb(13 23 32 / var(--tw-bg-opacity));
`

const menuItems = [
  {
    icon: GoPerson,
    label: "Settings",
    value: "Settings",
    component: <MyAccount />,
  },
  {
    icon: SlBadge,
    label: "My Membership",
    value: "My Membership",
    component: <MyMembership />,
  },
  {
    icon: ImProfile,
    label: "Profile",
    value: "Profile",
    component: <MyProfile />,
  },
]

export default function Profile() {
  const { onOpen } = useModal()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Settings")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { id } = useParams()
  const { setUser } = useContext(UserContext)
  const { onSettingsToggle } = useContext(UserContext)

  // Effect to fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData(id)
        setUser(data.user)
      } catch (err) {
        console.error("Error fetching user data:", err)
      }
    }
    fetchData()
  }, [id])

  const handleMenuItemClick = (menuValue) => {
    setActiveTab(menuValue)

    // On small screens, open the modal
    if (window.innerWidth < 640) {
      setIsModalOpen(true)
    }
  }

  // Get the current active component
  const activeComponent = menuItems.find((item) => item.value === activeTab)?.component

  return (
    <div className="absolute inset-0 flex gap-6">
      {/* Sidebar */}
      <Settings
        className={`${onSettingsToggle ? "hidden" : "flex"} justify-center bg-settings-background max-sm:w-full`}
      >
        <div className="h-full w-[320px] max-sm:w-full p-3 pt-32">
          <div className="mb-2 ml-2 font-bold uppercase">Settings</div>
          <div className="rounded-md bg-settings-background-alt border-r border-b border-my-gold">
            {menuItems.map((menuItem, index) => (
              <button
                key={index}
                className={`flex flex-row items-center gap-3 p-3 text-left text-sm w-full 
                  ${
                    activeTab === menuItem.value
                      ? "bg-my-gold font-bold text-black"
                      : "hover:bg-white hover:bg-opacity-10"
                  }`}
                onClick={() => handleMenuItemClick(menuItem.value)}
              >
                <menuItem.icon
                  style={{
                    fontSize: "1.875rem",
                    lineHeight: "0.875",
                  }}
                />
                <div className="flex-1">{menuItem.label}</div>
                <FaChevronRight
                  style={{
                    fontSize: "1.275rem",
                    lineHeight: "0.875",
                  }}
                />
              </button>
            ))}
          </div>
          <button
            className="mt-10 border-solid border-[1px] rounded-md flex flex-row items-center gap-3 p-2 text-left text-sm w-full hover:bg-red-700 group transition duration-200"
            style={{
              borderColor: "hsl(0, 70.563%, 45.294%)",
            }}
            onClick={() => {
              onOpen(MODAL_TYPE.LOGOUT_MODAL)
            }}
          >
            <IoLogOutOutline
              className="text-[hsl(0,70.563%,45.294%)] transition duration-200 group-hover:text-white"
              style={{
                fontSize: "1.875rem",
                lineHeight: "0.875",
              }}
            />
            <div className="flex-1 text-[hsl(0,70.563%,45.294%)] transition duration-200 group-hover:text-white">
              Logout
            </div>
          </button>
        </div>
      </Settings>

      {/* Main Content for larger screens */}
      <Main className="hidden sm:block flex-1 bg-center bg-settings-background-alt p-4 pt-32">
        <div className="max-h-full max-w-[700px] overflow-y-auto m-auto swipe-dialog-scroll-descendant custom-scroll">
          <h1 className="text-3xl font-bold mb-8">{activeTab}</h1>
          {menuItems.map(
            (menuItem) => activeTab === menuItem.value && <div key={menuItem.value}>{menuItem.component}</div>,
          )}
        </div>
      </Main>

      {/* Modal for small screens */}
      <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DrawerContent style={{
              "background-image": "url(https://app.jointherealworld.com/assets/lines_background-DOaYsgXf.webp)",
              "backgroundSize": "cover",
              "backgroundRepeat": "no-repeat",
              "backgroundColor": "rgb(7 13 20 / var(1))",
        }} className="sm:hidden h-[90%] border-none max-w-full bg-[rgb(13,23,32)] border-my-gold text-white p-0 overflow-hidden">
          <DrawerHeader className="flex justify-between flex-row items-center p-0 absolute w-full" style={{
            backgroundColor:"hsl(211.03 33.333% 17.059%)"
          }}>
            <button className="btn btn-circle btn-ghost" onClick={()=>{
                setIsModalOpen(false)
            }}>
                <FaArrowLeft className="h-[24px] w-[24px]"/>
            </button>
            <DrawerTitle className="text-lg font-bold">{activeTab}</DrawerTitle>
            <div className="flex-1"></div>
            <button className="btn btn-sm btn-circle" onClick={()=>{
                setIsModalOpen(false)
                navigate("/channels")
            }}><IoClose className="h-[24px] w-[24px]"/></button>
          </DrawerHeader>
          <div className="p-4  mt-7 overflow-y-auto swipe-dialog-scroll-descendant custom-scroll">
            {activeComponent}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}


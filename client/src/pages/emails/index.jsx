import { UserContext } from "@/context/UserContext"
import { GiHamburgerMenu } from "react-icons/gi"

import Analyse from "./components/Analyse"
import Lead from "./components/Lead"
import Waitlist from "./components/Waitlist"
import { useContext, useState } from "react"

const menuItems = [
  {
    label: "Lead",
    value: "Lead",
    component: ()=>< Lead/>,
  },
  {
    label: "Waitlist",
    value: "Waitlist",
    component:()=><Waitlist />,
  },
  {
    label: "Analyse",
    value: "Analyse",
    component: ()=> <Analyse />,
  },
]

export default function Emails() {
  const { setIsDashboardSidebarOpen } = useContext(UserContext)
    const [activeTab, setActiveTab] = useState("Lead"); // Default active tab

  const toggleSidebar = () => setIsDashboardSidebarOpen((prev) => !prev)
  return (
    <div className="h-screen flex flex-col">
      <button
        className="top-2 left-2 cursor-pointer z-50 p-2 hover:bg-gray-800 rounded-md transition-colors w-fit "
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <GiHamburgerMenu className="text-2xl text-white" />
      </button>
      <div className="sticky top-[60px] z-10 bg-my-dark-blue">
      <section className="max-sm:hidden flex h-12 font-medium w-full gap-4 px-3 my-3">
        {menuItems.map((menuItem, index) => (
            <button
                key={index}
                className={`flex flex-1 cursor-pointer items-center rounded-md justify-center transition-all p-6 ${
                    activeTab === menuItem.value
                        ? "text-my-black font-semibold bg-my-gold hover:bg-my-gold/80"
                        : "text-my-white-gray bg-[#1d2932] hover:bg-[#1d2932]/80"
                }`}
                onClick={() => setActiveTab(menuItem.value)}
            >
                <span className="whitespace-nowrap w-full text-md p-3 font-medium rounded-md duration-300 flex items-center justify-center">
                    <p className="flex flex-row items-center gap-2">
                        {menuItem.label}
                    </p>
                </span>
            </button>
        ))}
      </section>
       {/* Mobile Tabs */}
        <section className="sm:hidden flex font-medium h-[40px] max-w-[100vw] min-w-1">
          {menuItems.map((menuItem, index) => (
              <button
                  key={index}
                  className={`relative flex w-1/3 items-center justify-center py-3 cursor-pointer text-md`}

                  onClick={() => setActiveTab(menuItem.value)}
              >
                  <span className="capitalize transition-all  will-change-[transform,opacity,font-weight] opacity-100 whitespace-nowrap w-full text-md font-medium rounded-md duration-300 flex items-center justify-center h-full">
                      {menuItem.label}
                  </span>
                  <div
                    className={`absolute bottom-0 left-0 z-10 h-1 w-full ${
                      activeTab === menuItem.value ? "bg-my-gold" : "bg-[#282E33]"
                    }`}
                  ></div>
              </button>
          ))}
        </section>
      </div>
       {/* Scrollable Tab Content */}
        <div className="flex-1 custom-scroll overflow-y-auto py-2 ">
            {menuItems.find((menuItem) => menuItem.value === activeTab)?.component()}
        </div>
    </div>
  )
}


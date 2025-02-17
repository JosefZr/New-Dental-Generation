
import { UserContext } from "@/context/UserContext"
import { useContext } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import "./top.css"
import { Link } from "react-router-dom"

export default function TopDentistOpportunity() {
  const { setIsSidebarOpen, isSidebarOpen } = useContext(UserContext)
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  return (
    <div
      className={`min-h-screen bg-[#0B1015] text-white transition-transform duration-300 ${
        isSidebarOpen ? "ml-[-72px]" : ""
      }`}
    >
      <div className="flex items-center">
        <button className="p-2 hover:bg-gray-800 rounded-full" onClick={toggleSidebar} id="push">
          <GiHamburgerMenu className="text-2xl text-white" />
        </button>
      </div>
      <div className="section is-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="h1 uppercase">Top Dentist Opportunity</h1>
            <br />            
            <Link to="#" className="button-h w-button">
              Coming <strong>Soon</strong>
            </Link>
            <br />
            <div className="text-title-hero">Transform your dental expertise into income.</div>
          </div>
          <div className="hero-content-flex">
            <p className="p p-hero">
              <span className="bold-white">
                With This Feature, you can share your knowledge, host webinars, and earn money from the comfort of your
                home.
              </span>
              <br />
              <br />
              Do you believe in yourself?
              <br />
              <br />
              Because we do.
              <br />
              <br />
              Start preparing now by building your skills and expertise.
              <br />
              <br />
              We recommend visiting our Skill Up Centre, where you can gain the knowledge that will set you apart.
              <br />
              <br />
              Remember, you can only sell value when you own it.
            </p>
          </div>
          <div className="container ">
                    <div 
                        className="w-layout-vflex h2-p-wrap mx-auto"
                        style={{
                            opacity:1,
                            transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                            transformStyle: "preserve-3d"
                        }}
                    >
                        <div className="text-24">
                            Get ready to take the stage.
                            <br />
                            <span className="bold-white">Become the Top Dentist.</span>
                        </div>
                        <div className="jakarta-40">Coming soon—your future starts now.</div>
                    </div>
                </div>
        </div>
      </div>
    </div>
  )
}


import { FaTelegramPlane } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { Link } from "react-router-dom"
import styled from "styled-components"

const FooterSection = styled.footer`
  background: transparent;
  background-color: var(--darkBlue);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #02040e;
`
const H3 = styled.h3`
  font-size: 12px;
  font-weight: 200;
  line-height: 12px;
  letter-spacing: .32em;
  color: #a7a297;
  margin: 0 auto;
  font-family: 'Doawnloawd', sans-serif;
  @media screen and (min-width: 1024px) {
    font-size: 16px;
    line-height: 16px;
  }
`
export default function Footer() {
  return (

<FooterSection className="w-full  z-10 mt-8 lg:mt-16 px-4 undefined border-t-[1px] border-[#FFFFFF1A]" style={{position:"relative"}}>


  <div className="max-w-5xl mx-auto mt-10 text-center flex flex-col gap-5">
    <H3 className="uppercase text-center pb-4 reveal-vertical">Still Wondering if YDN is Right for You?</H3>
    <h1 className="text-xl italic">Want to know <strong>exactly how</strong> YDN will <strong>solve your problems</strong> and <strong>transform your practice?</strong></h1>
    <Link className="underline text-xl" to="https://docs.google.com/document/d/1I0HeuZD3ewDnBlwKxt64U3qh_t4Nl2uTBXTCItKOC8I/edit?usp=sharing">
    Don’t guess. Don’t wait. Get the answers now.
    </Link>
  </div>
  <div className="max-w-[1236px] mx-auto flex flex-col lg:flex-row justify-between py-[24px] ">
    <div className="my-4 lg:my-16 gap-8 flex flex-col">
      <div className="mt-4 lg:mt-0 flex flex-col lg:flex-row items-center gap-4 lg:gap-[32px]">
        <Link to="/terms">
          <p className="hover:underline text-white">Terms & Conditions</p>
        </Link>
        <div className="hidden lg:block w-[1px] h-[20px] bg-white/5"></div>
        <div className="lg:hidden w-[200px] h-[1px] bg-white/5"></div>

        <Link to="/privacy">
          <p className="hover:underline text-white">Privacy Policy</p>
        </Link>
        <div className="hidden lg:block w-[1px] h-[20px] bg-white/5"></div>
        <div className="lg:hidden w-[200px] h-[1px] bg-white/5"></div>
      </div>
      {/* <div className="lg:hidden w-[200px] h-[1px]  mx-auto"></div> */}
      <div className="lg:hidden gap-8 flex flex-col">
        <div>
          <div className="text-white/50 text-[12px] text-center sfpro">SUPPORT</div>
            <a href="mailto:support@buildydn.com">
              <p className="hover:underline text-center text-white">support@buildydn.com.</p>
            </a>
          </div>
          <Link to="/login" className="bg-[#181e27] py-4 text-white font-semibold sfpro text-center w-52 mx-auto">login</Link>
      </div>
      
      <p className="w-full text-white/50 max-w-xl mx-auto px-4 lg:px-0 !text-[14px] lg:!text-[16px] text-center  lg:text-left">
      <i>”<strong >Dentistry Mastery Code </strong> 
      is the key to becoming a <strong >successful dentist</strong> who runs <strong>a profitable practice</strong> and It’s attainable only through <strong>Building Your Dental Network.</strong>” </i>
      <br />- <strong>Dr. Truth</strong>
      </p>
      <div className="mt-6 flex justify-center gap-4 lg:justify-start">
          <a
            className=" transition  text-white hover:text-white/75"
            href="https://www.instagram.com/your_dental_network?igsh=MTNtNmtmaG9qaWtxbw%3D%3D&utm_source=qr"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only"> Instagram </span>

            <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            className=" transition  text-white hover:text-white/75"
            href="https://t.me/buildydn"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only"> Telegram </span>
            <FaTelegramPlane className=" h-6 w-6"/>
          </a>
          <a
            className=" transition  text-white hover:text-white/75"
            href="https://x.com/lbenyahia1?s=21"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only"> X </span>
            <FaXTwitter  className=" h-6 w-6"/>
          </a>
        </div>
    </div>
      <div className="hidden lg:flex my-16 flex-col">
        <div style={{position:"relative"}}>
          <p className="text-white/50 small">SUPPORT</p>
          <a href="mailto:support@buildydn.com">
            <p className="hover:underline">support@buildydn.com</p>
          </a>
        </div>
        <div className=" mt-8" style={{position:"relative"}}>
          <Link to="/login">
            <div className="bg-[#181e27] py-4 px-20 text-white font-semibold sfpro text-center">Log In</div>
          </Link>
        </div>
      </div>
    </div>
  </FooterSection>
  )
}

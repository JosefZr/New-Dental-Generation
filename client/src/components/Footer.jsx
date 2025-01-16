import { FaTelegramPlane } from "react-icons/fa"
import styled from "styled-components"

const FooterSection = styled.footer`
  background-image: url("/backs/footer.svg"); 
  background: transparent;
  background-color: var(--darkBlue);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

`

export default function Footer() {
  return (

<FooterSection className="bg-gray-900">
  <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 ">
    <div className="mx-auto max-w-xl text-center">
      <strong className="block text-center text-xl font-bold  sm:text-3xl text-white">
        Be The First To Know About Our Updates.      
      </strong>

      <form className="mt-6 text-center flex w-full  max-w-xl justify-center">
        <div className="relative w-full max-w-xl">
          <label className="sr-only" htmlFor="email"> Email </label>

          <input
            className="w-full rounded-full p-4 pe-32 text-sm font-medium border-gray-700 bg-gray-800 text-white"
            id="email"
            type="email"
            placeholder="john@doe.com"
          />

          <button
            className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-my-gold  px-5 py-3 text-sm font-medium text-white transition "
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>

    <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
      <div className="mx-auto max-w-sm lg:max-w-none">
        <p className="mt-4 text-center  lg:text-left lg:text-lg text-gray-400">
        YDN simplifies the work of dentists, dental labs, and stores by offering tools to manage tasks, connect with professionals, and grow their business. 
        It’s your one-stop solution for efficient operations and professional growth.
        </p>

        <div className="mt-6 flex justify-center gap-4 lg:justify-start">
          <a
            className=" transition  text-white hover:text-white/75"
            href="https://www.instagram.com/build_your_dental_network?igsh=ZHo3c2hpN25tejBi&utm_source=qr"
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

        </div>
      </div>

      <div className="grid grid-cols-1 justify-center gap-8 text-center lg:grid-cols-1 lg:text-center">
        {/* <div>
          <strong className="font-medium  text-white"> Services </strong>

          <ul className="mt-6 space-y-1">
            <li>
              <a
                className=" transition  text-white hover:text-white/75"
                href="#"
              >
                Marketing
              </a>
            </li>

            <li>
              <a
                className=" transition  text-white hover:text-white/75"
                href="#"
              >
                Graphic Design
              </a>
            </li>

            <li>
              <a
                className=" transition  text-white hover:text-white/75"
                href="#"
              >
                App Development
              </a>
            </li>

            <li>
              <a
                className=" transition  text-white hover:text-white/75"
                href="#"
              >
                Web Development
              </a>
            </li>
          </ul>
        </div>

        <div>
          <strong className="font-medium  text-white"> About </strong>

          <ul className="mt-6 space-y-1">
            <li>
              <a
                className="transition hover:text-gray-700/75 text-white dark:hover:text-white/75"
                href="#"
              >
                About
              </a>
            </li>

            <li>
              <a
                className=" transition  text-white hover:text-white/75"
                href="#"
              >
                Careers
              </a>
            </li>

            <li>
              <a
                className=" transition  text-white hover:text-white/75"
                href="#"
              >
                History
              </a>
            </li>

            <li>
              <a
                className=" transition  text-white hover:text-white/75"
                href="#"
              >
                Our Team
              </a>
            </li>
          </ul>
        </div> */}

        <div>
          <strong className="font-medium  text-white"> Support </strong>

          <ul className="mt-6 space-y-1">
            <li>
              <a
                className=" transition  text-white hover:text-white/75"
                href="#"
              >
                FAQs
              </a>
            </li>

            <li>
              <a
                className=" transition  text-white hover:text-white/75"
                href="#"
              >
                Contact
              </a>
            </li>

            <li>
              <a
                className=" transition  text-white hover:text-white/75"
                href="#"
              >
                Live Chat
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="mt-16 border-t pt-8 border-gray-800">
      <p className="text-center text-xs/relaxed  text-gray-400">
        © Dr.Truth 2025. All rights reserved.
        <br />
      </p>
    </div>
  </div>
</FooterSection>
  )
}

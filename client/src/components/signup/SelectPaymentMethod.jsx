/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";


export default function SelectPaymentMethod({handleCheckout}) {
  const [show, setShow] = useState(false);

  return (
    <div>
    <div className='section-title lg:mx-0 lg:text-lg flex mx-auto text-[#B7B7B7] justify-center lg:justify-start'>
      <FaCheckCircle/>
      <p className='ml-[9px] font-black'>SELECT PAYMENT</p>
    </div>
      <div className='pt-4 flex flex-col gap-3 lg:pl-9'>
        <button type='button' onClick={()=> {setShow(true), handleCheckout}} className={`min-h-[56px] h-[56px] px-2 flex items-center justify-between border rounded-lg  transition-all hover:translate-y-[-1px] cursor-pointer hover:text-white group flex-1 flex-shrink-0 w-full translate-y-[-1px] text-white border-white border-opacity-80`}
            style={show ? {border:"2px solid var(--gold)"}:{}}
          >
          <div className='flex items-center gap-3'>
            <IoWalletOutline className={`${show && "text-my-gold"} h-10 w-7`}/>
            <span className='transition-all'>Join with Credit/Debit Card</span>
          </div>
          <div>
          <button
              className={`absolute bottom-2 right-5  transition-transform group-hover:translate-y-[-1px] group-hover:text-my-gold ${
                  show ? "rotate-90 text-my-gold" : ""
              }`}
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 transition-all">
                  <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
          </button>
          </div>
        </button>
      </div>              
  </div>

  )
}

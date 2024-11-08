/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";

export default function SelectPaymentMethod({ handleCheckout }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="section-title lg:mx-0 lg:text-lg flex mx-auto text-[#B7B7B7] justify-center lg:justify-start">
        <FaCheckCircle />
        <p className="ml-[9px] font-black">SELECT PAYMENT</p>
      </div>
      <div className="pt-4 flex flex-col gap-3 lg:pl-9">
        <button
          type="button"
          onClick={() => {
            setShow(true), handleCheckout;
          }}
          className={`min-h-[56px] h-[56px] px-2 flex items-center justify-between border rounded-lg  transition-all hover:translate-y-[-1px] cursor-pointer hover:text-white group flex-1 flex-shrink-0 w-full translate-y-[-1px] text-white border-white border-opacity-80`}
          style={show ? { border: "2px solid var(--gold)" } : {}}
        >
          <div className="flex items-center gap-3">
            <IoWalletOutline className={`${show && "text-my-gold"} h-10 w-7`} />
            <span className="transition-all">Join Us Now</span>
          </div>
        </button>
      </div>
    </div>
  );
}

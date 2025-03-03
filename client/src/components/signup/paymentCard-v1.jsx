/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const stripePromise = loadStripe(
    "pk_test_51Q6FSwRsgnrIRIXHVv98PFAvJYYVK9gElLXl8fV16Xquu3PHduekcmJ182SsDLAcgNRjOSKzxAJmTZQO8nUpo720001usG5YNY"
); 

export default function PaymentCardV1({ isModal,cardData, role, userData }) {
   // Skip showing plans for admin/moderator
   const navigate = useNavigate();
   const [name, setName] = useState("");
     const { t } = useTranslation();
   
   const plans = t("plans", { returnObjects: true });

   const [selectedCardIndex, setSelectedCardIndex] = useState(null);
   const handleCardSelect = (index, amount, name) => {
       setSelectedCardIndex(index);
       setName(name);
   };

   const isAdminOrModerator = role === 'admin' || role === 'moderator';

   if (isAdminOrModerator) {
    const handleAdminSignup = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_API}/api/v1/auth/signup`,
                {userData}
            );
            console.log(response.data);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center w-full mt-8 justify-center">
            <button
                className="px-12 py-4 w-[250px] bg-white hover:scale-105 transition ease-in-out text-black font-bold"
                onClick={handleAdminSignup}
            >
                Complete Registration
            </button>
        </div>
    );
}    
    let dataCard = cardData;
        if (role === "dentist") {
            dataCard = cardData.slice(0, -1);
        } else if (role === "lab" || role === "store") {
            dataCard = cardData.slice(0, -2).concat(cardData.slice(-1));
        } else {
            dataCard = cardData.slice(0, -2);
        }

    const handleCheckout = async () => {
        if (name === "freeDentist" || name === "freeLab") {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/signup`, { name: "freeTrial", userData });
            console.log(response.data);
            navigate("/login");
        }
    const stripe = await stripePromise;
    try {

        let link = ""
        if (isModal) link = `${import.meta.env.VITE_SERVER_API}/api/v1/payment/update-subscription-session`
        else link =`${import.meta.env.VITE_SERVER_API}/api/v1/payment/create-checkout-session`
        
        const response = await axios.post(
        link ,
        { plan_name: name, userData },
        {
            withCredentials: true, // Allows sending cookies with the request
            headers: {
            "Access-Control-Allow-Origin": "http:/localhost:3000", // Replace with your allowed origin URL
            }
        }
        );
            console.log(response.data);
        const { sessionId } = response.data;
        stripe.redirectToCheckout({ sessionId });
    }    
    catch (error) {
        console.log(error);
    }
    };
    return (
        <>
        <div className="w-full flex justify-center lg:pl-9 2xl:pl-0">
            <div className="2xl:h-auto 2xl:pb-0 2xl:overflow-y-visible w-full 2xl:w-auto 2xl:inline-flex 2xl:flex-row 2xl:rounded-lg 2xl:border-none gap-3 mt-4 2xl:mt-6 mx-auto max-w-[950px]">
            {dataCard.map((card, index) => (
                <div
                key={index}
                style={
                    selectedCardIndex === index
                    ? { position: "relative", border: "1px solid var(--gold)" }
                    : { position: "relative" }
                }
                onClick={() => handleCardSelect(index, card.amount, card.name)}
                className={` rounded-lg py-4 px-5 text-white transition-all flex flex-col justify-between items-start  cursor-pointer border-2 border-transparent hover:border-my-gold hover:border-opacity-30 mb-[14px]   bg-[#1B1E26] ${
                    selectedCardIndex === index ? "border border-my-gold  " : ""
                }`}
                >
                {/* Top Section with Free Trial or Title */}
                {card.dentistFreeTrial && role === "dentist" ? (
                    <div className="flex items-center justify-between w-full">
                    <div className="text-[18px] font-semibold">
                        2 days free trial
                    </div>
                    <button
                        className={`absolute bottom-3 right-5 2xl:hidden transition-transform group-hover:translate-y-[-1px] group-hover:text-my-gold ${
                        selectedCardIndex === index
                            ? "rotate-90 text-my-gold"
                            : ""
                        }`}
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-9 h-9 transition-all"
                        >
                        <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                    </div>
                ) : card.storeLabFreeTrial &&
                    (role === "lab" || role === "store") ? (
                    <div className="flex items-center justify-between w-full">
                    <div className="text-[18px] font-semibold">
                        2 days free trial
                    </div>
                    <button
                        className={`absolute bottom-3 right-5 2xl:hidden transition-transform group-hover:translate-y-[-1px] group-hover:text-my-gold ${
                        selectedCardIndex === index
                            ? "rotate-90 text-my-gold"
                            : ""
                        }`}
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-9 h-9 transition-all"
                        >
                        <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                    </div>
                ) : (
                    ""
                )}

                {card.monthType && (
                    <>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                        <div className="text-[27px] font-extrabold">€19.9</div>
                        <div className="text-[16px] text-[#FFFFFF80] ml-1">
                            / monthly
                        </div>
                        </div>
                    </div>
                    <div className="text-[24px] mt-0">{plans.starter.title}</div>
                    <div className="pt-[9px] 2xl:pb-[22px] font-medium text-sm text-[#FFFFFFB2]">
                        <div className="h-8 flex items-center">
                        {card.monthTitle}
                        </div>
                        <div className="flex flex-col h-fit gap-[6px]">
                        {card.month?.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                            <FaCheck className=" text-my-gold" />
                            {item}
                            </div>
                        ))}
                        </div>
                    </div>
                    <button
                        className={`hidden 2xl:block h-[54px] rounded-md bg-[#393C45]  font-bold font-league w-full hover:shadow-xl hover:translate-y-[-1px]  duration-200 transform hover:bg-my-gold hover:text-[#06060C] transition-all bg-primary-gradient text-[#06060C] shadow-glowy translate-y-[-1px] ${
                        selectedCardIndex === index
                            ? "shadow-[-5px_0px_70px_-15px_#ffc100]"
                            : ""
                        }`}
                        style={
                        selectedCardIndex === index
                            ? {
                                backgroundColor: "var(--gold)",
                                color: "var(--black)!important",
                            }
                            : {}
                        }
                    >
                        <div
                        className={`text-xl  text-my-white-gray `}
                        style={
                            selectedCardIndex === index
                            ? { color: "var(--black)" }
                            : {}
                        }
                        >
                        {selectedCardIndex === index ? "SELECTED" : "CHOOSE PLAN"}
                        </div>
                    </button>
                    <button
                        className={`absolute bottom-5 right-5 2xl:hidden transition-transform group-hover:translate-y-[-1px] group-hover:text-my-gold ${
                        selectedCardIndex === index
                            ? "rotate-90 text-my-gold"
                            : ""
                        }`}
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-9 h-9 transition-all"
                        >
                        <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                    </>
                )}

                {card.threeMonthsType && (
                    <>
                    <span className="hidden w-full 2xl:flex items-center justify-center mb-[24px] uppercase">
                        <div
                        className={`inline-flex mx-auto rounded-full items-center h-[32px] bg-[#343740] py-2 px-4 text-[12px] font-extrabold tracking-[0.1em] text-my-gold`}
                        style={
                            selectedCardIndex === index
                            ? {
                                backgroundColor: "var(--gold)",
                                color: "var(--black)",
                                }
                            : {}
                        }
                        >
                        {card.threeMonthsButton}
                        </div>
                    </span>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                        <div className="text-[27px] font-extrabold">€59.9</div>
                        <div className="text-[16px] text-[#FFFFFF80] ml-1">
                            / 4 months
                        </div>
                        </div>
                        {card.threeMonthsButton && (
                        <span className="2xl:hidden flex items-center justify-center uppercase">
                            <div
                            className={`inline-flex mx-auto rounded-full items-center h-[32px] bg-[#343740] py-2 px-4 text-[12px] font-extrabold tracking-[0.1em] text-my-gold`}
                            style={
                                selectedCardIndex === index
                                ? {
                                    backgroundColor: "var(--gold)",
                                    color: "var(--black)",
                                    }
                                : {}
                            }
                            >
                            {card.threeMonthsButton}
                            </div>
                        </span>
                        )}
                    </div>
                    <div className="text-[24px] mt-0">{plans.pro.title}</div>
                    <div className="pt-[9px] 2xl:pb-[22px] font-medium text-sm text-[#FFFFFFB2]">
                        <div className="h-8 flex items-center">
                        {card.threeMonthsTitle}
                        </div>
                        <div className="flex flex-col gap-[6px]">
                        {card.threeMonths?.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                            <FaCheck className=" text-my-gold" />
                            {item}
                            </div>
                        ))}
                        </div>
                    </div>
                    <button
                        className={`hidden 2xl:block h-[54px] rounded-md bg-[#393C45]  font-bold font-league w-full hover:shadow-xl hover:translate-y-[-1px]  duration-200 transform hover:bg-my-gold hover:text-[#06060C] transition-all bg-primary-gradient text-[#06060C] shadow-glowy translate-y-[-1px] ${
                        selectedCardIndex === index
                            ? "shadow-[-5px_0px_70px_-15px_#ffc100]"
                            : ""
                        }`}
                        style={
                        selectedCardIndex === index
                            ? {
                                backgroundColor: "var(--gold)",
                                color: "var(--black)!important",
                            }
                            : {}
                        }
                    >
                        <div
                        className={`text-xl  text-my-white-gray `}
                        style={
                            selectedCardIndex === index
                            ? { color: "var(--black)" }
                            : {}
                        }
                        >
                        {selectedCardIndex === index ? "SELECTED" : "CHOOSE PLAN"}
                        </div>
                    </button>
                    <button
                        className={`absolute bottom-5 right-5 2xl:hidden transition-transform group-hover:translate-y-[-1px] group-hover:text-my-gold ${
                        selectedCardIndex === index
                            ? "rotate-90 text-my-gold"
                            : ""
                        }`}
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-9 h-9 transition-all"
                        >
                        <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                    </>
                )}

                {card.yearType && (
                    <>
                    <span className="hidden w-full 2xl:flex items-center justify-center mb-[24px] uppercase">
                        <div className="inline-flex mx-auto rounded-full items-center h-[32px] bg-[#343740] py-2 px-4 text-[12px] font-extrabold tracking-[0.1em] text-[#1B1E26] bg-my-small-gold">
                        {card.yearButton}
                        </div>
                    </span>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                        <div className="text-[27px] font-extrabold">€150</div>
                        <div className="text-[16px] text-[#FFFFFF80] ml-1">
                            / yearly
                        </div>
                        </div>
                        {card.yearButton && (
                        <span className="2xl:hidden flex items-center justify-center uppercase">
                            <div className="inline-flex mx-auto rounded-full items-center h-[32px] bg-[#343740] py-2 px-4 text-[12px] font-extrabold tracking-[0.1em] text-[#1B1E26] bg-my-small-gold">
                            {card.yearButton}
                            </div>
                        </span>
                        )}
                    </div>
                    <div className="text-[24px] mt-0">{plans.elite.title}</div>
                    <div className="pt-[9px] 2xl:pb-[22px] font-medium text-sm text-[#FFFFFFB2]">
                        <div className="h-8 flex items-center">
                        {card.yearTitle}
                        </div>
                        <div className="flex flex-col gap-[6px]">
                        {card.year?.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                            <FaCheck className=" text-my-gold" />
                            {item}
                            </div>
                        ))}
                        </div>
                    </div>
                    <button
                        className={`hidden 2xl:block h-[54px] rounded-md bg-[#393C45]  font-bold font-league w-full hover:shadow-xl hover:translate-y-[-1px]  duration-200 transform hover:bg-my-gold hover:text-[#06060C] transition-all bg-primary-gradient text-[#06060C] shadow-glowy translate-y-[-1px] ${
                        selectedCardIndex === index
                            ? "shadow-[-5px_0px_70px_-15px_#ffc100]"
                            : ""
                        }`}
                        style={
                        selectedCardIndex === index
                            ? { backgroundColor: "var(--gold)", color: "black" }
                            : {}
                        }
                    >
                        <div
                        className={`text-xl  text-my-white-gray `}
                        style={
                            selectedCardIndex === index
                            ? { color: "var(--black)" }
                            : {}
                        }
                        >
                        {selectedCardIndex === index ? "SELECTED" : "CHOOSE PLAN"}
                        </div>
                    </button>
                    <button
                        className={`absolute bottom-5 right-5 2xl:hidden transition-transform group-hover:translate-y-[-1px] group-hover:text-my-gold ${
                        selectedCardIndex === index
                            ? "rotate-90 text-my-gold"
                            : ""
                        }`}
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-9 h-9 transition-all"
                        >
                        <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                    </>
                )}
                </div>
            ))}
            </div>
        </div>
        {/* Payment Selection */}
        {/*<SelectPaymentMethod handleCheckout={handleCheckout} />*/}
        <div className="flex items-center w-full mt-8 justify-center">
            <>
            <svg 
                style={{position:"relative"}}
                className=" w-0 h-0"
            >
            <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
                <feColorMatrix
                values="1 0 0 0 0 
                        0 1 0 0 0 
                        0 0 1 0 0 
                        0 0 0 3 0"
                ></feColorMatrix>
            </filter>
            </svg>

            <div className="backdrop"></div>
            <button className="buttonCheckout" onClick={handleCheckout}>
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="text">Checkout Now</div>
            </button>
            </>
        </div>
        </>
    );
}

// import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

import {
  LeftSignup,
  PersonalInformationForm,
  // SelectPaymentMethod,
} from "@/components/signup";
import PaymentCardV1 from "@/components/signup/paymentCard-v1";
import PersonalInformationFormAdmins from "@/components/signup/PersonalInformationFormAdmins";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";

export const getCardData = () => {
  
  const transformDescriptionToTable = (description) => {
    // Split the description by '.' and filter out any empty strings
    return description
      .split(".")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };
  return [
    {
      name: "Cadet",
      amount: 14.5,
      monthType: "cadet",
      monthButton: "",
      monthTitle: "A first step towards breaking free",
      month: transformDescriptionToTable(
        "Access to all TRW Campuses. Daily live broadcasts. Daily course updates."
      ),
    },
    {
      name: "Challenger",
      amount: 55,
      threeMonthsType: "challenger",
      threeMonthsButton: "Most Popular",
      threeMonthsTitle: "Three months to harness your power.",
      threeMonths: transformDescriptionToTable(
        "All of Cadet. Daily coin bonus. Power level boost"
      ),
    },
    {
      name: "Hero",
      amount: 150,
      yearType: "hero",
      yearButton: "save €24",
      yearTitle: "One year of complete commitment",
      year: transformDescriptionToTable(
        "Maximum daily coin bonus. Big power level boost. Exclusive chats and lessons."
      ),
    },
    {
      name:"freeDentist",
      dentistFreeTrial: "6 days free trial",
    },
    {
      name:"freeLab",
      storeLabFreeTrial: "40 days free trial",
    },
  ];
};
export default function SignupAdmins() {
  const data = getCardData();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    region:"",
    role: "",
  });

  // const stripePromise = loadStripe(
  //   "pk_test_51Q6FSwRsgnrIRIXHVv98PFAvJYYVK9gElLXl8fV16Xquu3PHduekcmJ182SsDLAcgNRjOSKzxAJmTZQO8nUpo720001usG5YNY"
  // );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfessionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };
  const handleRegionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      region: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // const stripe = await stripePromise;
    // const res = await axios.post("/checkout", {});
    if (!formData.file) return;
    try {
      // After setting the URL, call fetchUserData with the updated formData
      await fetchUserData(formData);
      console.log("Form Data:", formData);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };
  const fetchUserData = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Retrieve error message from server
        throw new Error(`Failed to fetch user data: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error in fetchUserData:", error.message);
      throw error;
    }
  };

    return (
        <section className="lg:flex-row w-full font-sans flex flex-col h-[100vh] lg:overflow-y-scroll relative">
        <LeftSignup />
        <main className="lg:w-[50vw] w-full flex flex-col pr-[22px] pl-[23px] h-full overflow-y-scroll">
            <div className="hidden lg:block ">
            <div className="lg:flex-row lg:h-[114px] lg:text-left flex flex-col mt-[25px] text-primary-content text-center lg:w-full">
                <img
                className="trw-logo mx-auto lg:mx-0 lg:mr-3 max-w-[114px] max-h-[114px]"
                src="	https://www.jointherealworld.com/checkout/_next/static/media/trw-knight-globe.c69d0d31.svg"
                alt="logo"
                />
                <div>
                <p className=" lg:text-[27px] font-black text-[25px] mx-auto mt-[18px] undefined">
                    JOIN THE REAL WORLD
                </p>
                <p className=" lg:text-[24px] text-[21px] mx-auto mt-[11px]">
                    ESCAPE THE MATRIX
                </p>
                </div>
            </div>
            </div>

            <div className="lg:hidden flex flex-col items-center gap-4 ">
            <div className="lg:flex-row lg:h-[114px] lg:text-left flex flex-col mt-[25px] text-primary-content text-center lg:w-full">
                <img
                className="trw-logo mx-auto lg:mx-0 lg:mr-3 max-w-[114px] max-h-[114px]"
                src="	https://www.jointherealworld.com/checkout/_next/static/media/trw-knight-globe.c69d0d31.svg"
                alt="logo"
                />
                <div>
                <p className=" lg:text-[27px] font-black text-[25px] mx-auto mt-[18px] undefined">
                    JOIN THE REAL WORLD
                </p>
                <p className=" lg:text-[24px] text-[21px] mx-auto mt-[11px]">
                    ESCAPE THE MATRIX
                </p>
                </div>
            </div>
            </div>

            <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-7 mt-8 mb-8"
            >
            {/* Personal Information */}
            <PersonalInformationFormAdmins
                formData={formData}
                handleInputChange={handleInputChange}
                handleProfessionChange={handleProfessionChange}
                handleRegionChange={handleRegionChange}
            />
            <div>
                <div className="section-title lg:mx-0 lg:text-lg flex mx-auto text-[#B7B7B7] justify-center lg:justify-start">
                <FaCheckCircle />
                <p className="ml-[9px] font-black">SELECT PLAN</p>
                </div>
                <PaymentCardV1
                isModal={false}
                cardData={data}
                role={formData.role}
                userData={formData}
                />
            </div>
            
            </form>

        </main>
        </section>
    );
}
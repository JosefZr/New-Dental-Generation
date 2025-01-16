// import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

import {
  LeftSignup,
  PersonalInformationForm,
  // SelectPaymentMethod,
} from "@/components/signup";
import PaymentCardV1 from "@/components/signup/paymentCard-v1";
import { useTranslation } from "react-i18next";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";

export const GetCardData = () => {
  const { t } = useTranslation();
  const plans = t("plans", { returnObjects: true });

  const transformDescriptionToTable = (description) => {  // Ensure description is a valid string before splitting
    if (typeof description !== "string") return [];

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
      monthTitle:"",
      month: transformDescriptionToTable(
        plans.starter.desc
      ),
    },
    {
      name: "Challenger",
      amount: 55,
      threeMonthsType: "challenger",
      threeMonthsButton: "Most Popular",
      threeMonthsTitle: "",
      threeMonths: transformDescriptionToTable(
        plans.pro.desc
      ),
    },
    {
      name: "Hero",
      amount: 150,
      yearType: "hero",
      yearButton: "save €24",
      yearTitle: "",
      year: transformDescriptionToTable(
        plans.elite.desc
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
export default function Signup() {
  const data = GetCardData();
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    region:"",
    role: "",
    file: null,
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
  const handleImageChange = async(e) => {
    const selectedImage = e.target.files[0];
    if (!selectedImage) {
      console.error("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch(`http://localhost:3000/api/v1/auth/upload/proffession`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: localStorage.getItem("token"), // Add the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log("Uploaded Image Filename:", data.filename);

      // Update the context state with the uploaded image filename
      setPreview(`http://localhost:3000/uploads/proffession/${data.filename}`)
      setFormData((prev) => ({
      ...prev,
      file: data.filename, // Save the filename in formData
    }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
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
    <section className="scrollbar-custom lg:flex-row w-full font-sans flex flex-col h-[100vh] lg:overflow-y-scroll relative">
      <LeftSignup />
      <main className="scrollbar-custom lg:w-[60vw] w-full flex flex-col pr-[22px] pl-[23px] h-full overflow-y-scroll">
        <div className="hidden lg:block ">
          <div className="lg:flex-row lg:h-[114px] lg:text-left flex flex-col mt-[25px] text-primary-content text-center lg:w-full">
          <div className="relative lg:mr-3 mx-auto lg:mx-0 max-w-[114px] max-h-[114px] rounded-full overflow-hidden">
            <img
              className="trw-logo w-full h-full object-cover transform scale-[1.39]"
              src="/signLogo.jpg"
              alt="logo"
            />
          </div>
            <div>
              <p className=" lg:text-[27px] font-black text-[25px] mx-auto mt-[11px] undefined text-my-gold">
                BUILD YOUR DENTAL NETWORK
              </p>
              <p className=" lg:text-[24px] text-[21px] mx-auto mt-[5px]">
                Be One Of The Best
              </p>
            </div>
          </div>
        </div>

        <div className="lg:hidden flex flex-col items-center gap-4">
          <div className="lg:flex-row lg:h-[114px] lg:text-left flex flex-col mt-[25px] text-primary-content text-center lg:w-full">
            <div className="relative lg:mr-3 mx-auto lg:mx-0 max-w-[114px] max-h-[114px] rounded-full overflow-hidden">
              <img
                className="trw-logo w-full h-full object-cover transform scale-[1.39]"
                src="/signLogo.jpg"
                alt="logo"
              />
            </div>
            <div>
            <p className=" lg:text-[27px] font-black text-[25px] mx-auto mt-[18px] undefined text-my-gold leading-relaxed">
                BUILD YOUR DENTAL NETWORK
              </p>
              <p className=" lg:text-[24px] text-[21px] mx-auto mt-[11px]">
                Be One Of The Best
              </p>
            </div>
          </div>
        </div>


        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-7 mt-8 mb-8"
        >
          {/* Personal Information */}
          <PersonalInformationForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleProfessionChange={handleProfessionChange}
            handleRegionChange={handleRegionChange}
            handleImageChange={handleImageChange}
            preview={preview}
          />
          <div>
            <div className="section-title lg:mx-0 lg:text-lg flex mx-auto text-[#B7B7B7] justify-center lg:justify-start">
              <FaCheckCircle />
              <p className="ml-[9px] font-black">Membership Tiers</p>
            </div>
            <PaymentCardV1
              isModal={false}
              cardData={data}
              role={formData.role}
              userData={formData}
            />
          </div>
          {/* Payment card info */}
          {/* <CreditCardInformations formData={formData} handleInputChange={handleInputChange}/> */}

          {/* <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button type="submit">Login</button>
            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <Link to="/signup" className="text-gray-700 underline">
                Log in
              </Link>
              .
            </p>
          </div> */}
        </form>

        {/* </div> */}
      </main>
    </section>
  );
}

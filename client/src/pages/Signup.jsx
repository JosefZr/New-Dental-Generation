import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

import {
  LeftSignup,
  PaymentCard,
  PersonalInformationForm,
  SelectPaymentMethod,
} from "@/components/signup";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

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
export default function Signup() {
  const data = getCardData();
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    file: null,
  });

  const stripePromise = loadStripe(
    "pk_test_51Q6FSwRsgnrIRIXHVv98PFAvJYYVK9gElLXl8fV16Xquu3PHduekcmJ182SsDLAcgNRjOSKzxAJmTZQO8nUpo720001usG5YNY"
  );

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
  const handleImageChange = (e) => {
    const target = e.target;
    if (target && target.files) {
      console.log("target", target.files);
      setFormData((prev) => ({
        ...prev,
        file: target.files[0],
      }));
      const file = new FileReader();

      file.onload = function () {
        setPreview(file.result);
      };
      file.readAsDataURL(target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const stripe = await stripePromise;
    const res = await axios.post("/checkout", {});
    if (!formData.file) return;

    const formDataObject = new FormData();
    formDataObject.append("file", formData.file);
    formDataObject.append("upload_preset", "test-react-uploads-unsigned");
    formDataObject.append("api_key", import.meta.env.CLOUDINARY_API_KEY);
    try {
      const result = await fetch(
        "https://api.cloudinary.com/v1_1/dmbqu5vfl/image/upload",
        {
          method: "POST",
          body: formDataObject,
        }
      ).then((r) => r.json());
      const submissionData = {
        ...formData,
        proofOfProfession: result.url, // replace file with the Cloudinary URL
      };
      console.log("Uploaded Image URL:", result.url);
      // After setting the URL, call fetchUserData with the updated formData
      await fetchUserData(submissionData);
      console.log("Form Data:", submissionData);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };
  const fetchUserData = async (submissionData) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
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
      <main className="lg:w-[50vw] flex flex-col pr-[22px] pl-[23px] h-full">
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
          <PersonalInformationForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleProfessionChange={handleProfessionChange}
            handleImageChange={handleImageChange}
            preview={preview}
          />
          <div>
            <div className="section-title lg:mx-0 lg:text-lg flex mx-auto text-[#B7B7B7] justify-center lg:justify-start">
              <FaCheckCircle />
              <p className="ml-[9px] font-black">SELECT PLAN</p>
            </div>
            <PaymentCard
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

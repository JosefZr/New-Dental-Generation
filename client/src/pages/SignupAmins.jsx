import { useState } from "react";
import {
  LeftSignup,
} from "@/components/signup";
import PersonalInformationFormAdmins from "@/components/signup/PersonalInformationFormAdmins";
import { useNavigate } from "react-router-dom";


export default function SignupAdmins() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    region:"",
    role: "",
    subscriptionPlan :""
  });

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
  const handleDurationChange = (value)=>{
    setFormData((prev) => ({
      ...prev,
      subscriptionPlan : value,
    }))
  }
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    console.log(formData)
    // if (!formData.file) return;
      fetchUserData(formData);
  };
  const fetchUserData = async (formData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/chama`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      navigate("/login");
      console.log("Registration successful:", data);
      return data;
  
    } catch (error) {
      console.error("Registration error:", error);
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
                src="/signLogo.jpg"
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
                className="trw-logo mx-auto rounded-full lg:mx-0 lg:mr-3 max-w-[114px] max-h-[114px]"
                src="/signLogo.jpg"
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
                handleDurationChange={handleDurationChange}
            />
            <div className="flex items-center w-full mt-8 justify-center">
              <button
                className="px-12 py-4 w-[250px] bg-white hover:scale-105 transition ease-in-out text-black font-bold"
                type="submit"
              >
                Complete Registration
              </button>
            </div>
            </form>

        </main>
        </section>
    );
}


import {  useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Back = styled.div`
    background-image: url("https://app.jointherealworld.com/assets/matrix-bg-bw-hYk5JvoA.jpg");
`;
const fetchUserData = async (data) => {
try {
    const response = await fetch("http://localhost:3000/api/v1/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
    });
    return response;
    } catch (error) {
        console.error(error.message);
        alert(error.message); // Show error message to user
        return false;
    }
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
   // Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchUserData(formData); // Call the fetch function
      const data = await res.json(); // Parse JSON from response
      if (res.ok) {
        toast.success(data.message || "Success!"); // Show success toast
      } else {
        toast.error(data.message || "Something went wrong!"); // Show error toast
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("An unexpected error occurred."); // Show fallback error toast
    }
  };
  

  return (
    <section className="absolute inset-0 flex flex-col">
      <div className="relative flex-1">
        <div className="absolute inset-0 bg-black">
          <Back
            style={{ backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
            className="pointer-events-none absolute inset-0 opacity-40 grayscale"
          ></Back>
          <div className="absolute inset-0 max-h-[100vh] overflow-y-auto pt-inset-top pb-inset-bottom flex flex-col items-center justify-between">
            <div className="flex flex-col items-center">
              <img
                src="https://app.jointherealworld.com/icons/logo-512.png"
                alt="logo"
                className="mx-auto mt-[30%] h-[256px] max-h-[35vh] w-auto"
              />
              <h2 className="mt-[10%] text-center font-bold text-[30px] text-white uppercase">
                The Real World
              </h2>
            </div>
            <div className="w-full max-w-[500px] p-8">
              
              {/* <Link to={"/login"}>
            <button className='btn mt-3 btn-lg btn-primary btn-block'></button>
          </Link> */}
              <div className="relative z-10 mx-auto mt-2 flex max-w-[500px] flex-col overflow-auto rounded-xl bg-base-100 p-6 shadow-lg ">
                <div className="w-full max-w-[95vw] text-center md:max-w-md">
                  <div className=" text-center font-bold text-3xl pb-4">
                    Forgot Password ?
                  </div>
                  <div className=" text-center  text-lg">
                    No worries, we&apos;ll send you reset instructions.
                  </div>
                  <form
                    action="#"
                    className="form-control mt-4 flex flex-col"
                    onSubmit={handleSubmit}
                    >
                    <label htmlFor="email" className="text-start pb-2">Email</label>
                    <input
                        type="email"
                        id="Email"
                        name="email"
                        value={formData.email}
                        placeholder="Enter your email"
                        onChange={handleChange}
                        className="input bg-base-200 focus:outline-offset-0"
                    />
                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      <button
                        type="submit"
                        className="btn btn-no-effects hover:bg-my-gold hover:opacity-80 relative mt-6 btn-primary w-full"
                      >
                        Send 
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

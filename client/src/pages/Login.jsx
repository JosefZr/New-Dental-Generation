import { UserContext } from "@/context/UserContext";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
const Back = styled.div`
  background-image: url("/photo_2025-02-03_20-17-15.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
`;

const fetchUserData = async (data) => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Invalid email or password");
    }

    const jwt = await response.json();
    localStorage.setItem("token", jwt.accessToken);
    return true;
  } catch (error) {
    console.error(error.message);
    alert(error.message); // Show error message to user
    return false;
  }
};

export default function Login() {
  const {onOpen} =useModal()

  const {setUser} = useContext(UserContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const res = await fetchUserData(formData);
    console.log(res)
    if (res){

      const token = localStorage.getItem("token"); 
      const userInfo = jwtDecode(token);
      setUser(userInfo)
      navigate("/channels")
      onOpen(MODAL_TYPE.BIR)

    };
  };

  return (
    <section className="absolute inset-0 flex flex-col">
      <div className="relative flex-1">
        <div className="absolute inset-0 ">
          <Back
            style={{ backgroundSize: "cover", backgroundRepeat: "repeat" }}
            className="pointer-events-none absolute inset-0 opacity-100 "
          ></Back>
          <div className="absolute inset-0 max-h-[100vh] overflow-y-auto pt-inset-top pb-inset-bottom flex flex-col items-center justify-center">
            <div className=" flex flex-col items-center">
            <div className="relative lg:mr-3 mx-auto lg:mx-0 max-w-[35vh] max-h-[35vh] rounded-full overflow-hidden mt-[20%]">
                <img
                  className="trw-logo w-full h-full object-cover transform scale-[1.39]   max-h-[35vh]"
                  src="/signLogo.jpg"
                  alt="logo"
                />
              </div>
              <h2 className="mt-[10%] text-center font-bold text-[30px] text-white uppercase">
                YOUR DENTAL NETWORK
              </h2>
            </div>
            <div className="w-full max-w-[500px] p-8">
              <button
                className="btn font-normal normal-case btn-lg btn-ghost btn-block"
                onClick={() => navigate("/sign-up")}
              >
                I don&rsquo;t have an account
              </button>
              {/* <Link to={"/login"}>
            <button className='btn mt-3 btn-lg btn-primary btn-block'></button>
          </Link> */}
              <div className="relative z-10 mx-auto mt-2 flex max-w-[500px] flex-col overflow-auto rounded-xl bg-my-dark-blue p-6 shadow-lg ">
                <div className="w-full max-w-[95vw] text-center md:max-w-md">
                  <div className=" text-center font-bold text-xl">
                    Sign in to your account
                  </div>
                  <form
                    action="#"
                    className="form-control mt-4 flex flex-col"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="email"
                      id="Email"
                      name="email"
                      value={formData.email}
                      placeholder="Email Address"
                      onChange={handleChange}
                      className="input bg-base-200 focus:outline-offset-0"
                    />
                    <input
                      type="password"
                      id="Password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="input mt-2 bg-base-200 focus:outline-offset-0"
                    />

                    <Link
                      to="/forgot-password"
                      className="mt-3 self-start text-purple-800 text-xs"
                    >
                      Forgot your password?
                    </Link>

                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      <button
                        type="submit"
                        className="btn btn-no-effects hover:bg-my-gold bg-my-gold hover:opacity-80 relative mt-6 text-black w-full"
                      >
                        LOG IN
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

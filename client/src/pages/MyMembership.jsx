import { UserContext } from "@/context/UserContext";
import { fetchUserData } from "@/hooks/useFetchUserData";
import { useModal } from "@/hooks/useModalStore";
import { useContext, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";

export default function MyMembership() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const { onOpen } = useModal();
  const { setOnSettingsToggle } = useContext(UserContext)

  const toggleSidebar = () => {
    setOnSettingsToggle((prev) => !prev)
  }

  // Helper function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // Helper function to determine subscription status
  const getSubscriptionStatus = () => {
    const currentDate = new Date();
    const endDate = new Date(
      user.subscriptionPlan === "freeTrial" ? user.trialEndDate : user.subscriptionEndDate
    );
    return currentDate > endDate ? "renew now" : "on going";
  };

  // Effect to fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData(id);
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchData();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  // Subscription-related dates
  // const startDate = user.subscriptionPlan === "freeTrial" ? user.trialStartDate : user.subscriptionStartDate;
  const endDate = user.subscriptionPlan === "freeTrial" ? user.trialEndDate : user.subscriptionEndDate;

  return (
    <>
    <button
            className="absolute max-sm:hidden top-2 left-2 cursor-pointer z-50 p-2 hover:bg-gray-800 rounded-md transition-colors"
            onClick={toggleSidebar}
          >
            <GiHamburgerMenu className=" text-2xl text-white" />
          </button>
          <div className="mt-6 flex w-full flex-col">
            <div className="flex flex-col rounded-md border border-slate-600">
              <div className="rounded-md p-[1px]">
                <div className="w-full rounded-md bg-slate-950 border border-my-gold">
                  <button className="flex items-center gap-3 border-base-300 border-b p-3 text-left text-sm last:border-0 tracking-[0.015em] w-full cursor-auto px-0 pb-0">
                    <div className="flex-1">
                      <div className="mb-1 font-medium text-xs uppercase px-3 opacity-1">
                        <div className="flex items-center gap-2">
                          <img src="/bg-black-logo.png" className="rounded-full" alt="logo" width="32" height="32" />
                          TRW Hero&apos;s Year Monthly
                        </div>
                      </div>
                      <div className="form-control px-3 py-3 text-xl">
                        {/* <div>Started: {formatDate(startDate)}</div> */}
                        <div>Renews: {formatDate(endDate)}</div>
                      </div>
                      <div className="flex flex-col rounded-md border border-gray-800 mt-3 rounded-t-none border-x-0 border-b-0">
                        <button className="flex items-center gap-3 border-gray-800 border-b p-3 text-left text-sm last:border-0 active:bg-info tracking-[0.015em] hover:bg-white hover:bg-opacity-10">
                          <div className="flex-1 text-xl font-bold">Overdue since {formatDate(endDate)}</div>
                          <span
                          onClick={()=>onOpen("subscription")}
                            className={`px-3 py-2 rounded-sm text-xl font-semibold text-center ${
                              getSubscriptionStatus() === "renew now" ? "bg-red-700" : "bg-green-700"
                            }`}
                          >
                            {getSubscriptionStatus()}
                          </span>
                        </button>
                        {
                        getSubscriptionStatus() === "renew now" ?(
                          <div className="alert !rounded-t-none flex w-full items-center justify-center rounded-md text-center text-xl">
                            Your payment is overdue since  {formatDate(endDate)}
                            <br />
                            <br />
                            Press &ldquo;Renew Now&ldquo; to pay before your subscription ends.
                          </div>
                        ):""
                      }
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 m-[16px]  flex-col items-center flex max-sm:hidden">
            <button className="btn !bg-transparent btn-circle" onClick={() => navigate(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <span className="mt-1 text-xs opacity-80">ESC</span>
          </div>
    </>
  );
}

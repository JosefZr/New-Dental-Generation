import GreenLoader from "@/components/GreenLoader";
import { AddEarnings } from "@/components/paymentReminder/AddEarnings";
import { MetricCards } from "@/components/paymentReminder/MetricCard";
import { MonthlyGoal } from "@/components/paymentReminder/MonthlyGoal";
import PaymentCheckList from "@/components/paymentReminder/PaymentCheckList";
import { PremiumPlanCard } from "@/components/paymentReminder/PremiumPlanCard";
import { ProfitChart } from "@/components/paymentReminder/ProfitChart";
import { ProgressCard } from "@/components/paymentReminder/ProgressCard";
import Reminders from "@/components/paymentReminder/Reminders";
import { UserContext } from "@/context/UserContext";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import { useUserEarnings } from "@/hooks/payments/useGetEarnings";
import { useGetPaymentReminders } from "@/hooks/payments/useGetPaymentReminders";
import { useGetSettings } from "@/hooks/payments/useGetSettings";
import { useUpdateCurrency } from "@/hooks/payments/useUpdateCurrency";
import { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function PaymentReminder() {
    const userInfo = useAuthUser();
  const {data:Settings, isLoading:isLoadingSettings, isError:isErrorSettings, error:SettingsError} = useGetSettings({userId:userInfo.userId})
  const [currency, setCurrency] = useState(null);

  const updateCurrencyMutation = useUpdateCurrency();
const handleCurrencyChange = async (e) => {
      const newCurrency = e.target.value;
      setCurrency(newCurrency);
      updateCurrencyMutation.mutateAsync({userId: userInfo.userId,currency: newCurrency});
      setCurrency(Settings?.settings?.currency);
    } // Effect to set initial currency from settings
    useEffect(() => {
      if (Settings?.settings?.currency) {
        setCurrency(Settings.settings.currency);
      }
    }, [Settings?.settings?.currency]);
      const { setIsSidebarOpen,isSidebarOpen } = useContext(UserContext);
      const [viewType, setViewType] = useState("daily");

      const { data: payments, isLoading, isError, error } = useGetPaymentReminders({id: userInfo.userId});
      const Supplies = payments?.filter((payment) => payment.type === "Dental Supplies") || [];
      const Payroll = payments?.filter((payment) => payment.type === "Staff Payroll") || [];
      const Fees = payments?.filter((payment) => payment.type === "Dental Lab Fees") || [];

      const { data: earnings, isLoadingEarnings, isEarningsError, Earningserror } = useUserEarnings({id:userInfo.userId});
      // Filter payments by type
 
      const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
        handleDropdownClick()
    };
      const money = Settings?.settings?.currency || "DZD";
      
      const getCurrencyPrefix = (currency) => {
        const symbols = {
          DZD: "DA ",
          EUR: "€",
          USD: "$"
        };
        return symbols[currency] || "DA ";
      };
      const handleDropdownClick = async () => {
        if (Notification.permission === "granted") {
          new Notification("Notification test", {
            body: "You have opened the dropdown menu.",
            icon: "/CompressJPEG.Online_img(512x512).png",
          });
        } else if (Notification.permission !== "denied") {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            new Notification("Notification test", {
              body: "You have opened the dropdown menu.",
              icon: "/CompressJPEG.Online_img(512x512).png",
            });
          }
        }
      };
      
  return (
    <div className={`p-4 sm:p-6 bg-black  ${isSidebarOpen ?"ml-[-72px] ":""} `}>
      <div className={`flex flex-row justify-start items-center mb-4 `}>
      <div className="flex items-center justify-between gap-1 w-full">
        <div className="flex items-center">
          <button className="p-2 hover:bg-gray-800 rounded-full" onClick={toggleSidebar} id="push">
              <GiHamburgerMenu className=" text-2xl text-white" />
            </button>
          <h1 className="text-xl sm:text-2xl font-semibold text-white ml-2">MONEY IN</h1>
        </div>
        <div className="flex flex-row items-center gap-2">
        <select
          className="bg-[#101214] border-[#282F35] cursor-pointer border-1 text-white p-2 rounded-md active:border-[#282F35]"
          value={viewType}
          onChange={(e) => setViewType(e.target.value)}
        >
          <option value="daily" className="hover:bg-[#13F287]">Daily</option>
          <option value="monthly" className="hover:bg-[#13F287]">Monthly</option>
        </select>
        {isLoadingSettings?(
          <GreenLoader/>
        ):(
          <select
            className="bg-[#101214] border-[#282F35] cursor-pointer border-1 text-white p-2 rounded-md"
            value={currency}
            onChange={handleCurrencyChange}
          >
            <option value="DZD">DZD</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        )}
        </div>
      </div>
      </div>
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4 sm:mb-6">
    <MetricCards earnings={earnings} payments={payments} viewType={viewType}  money={getCurrencyPrefix(money)} isLoadingEarnings={isLoadingEarnings} isLoading={isLoading}/>
    {/* <MetricCard title="ARR" value="1,511,121" change={32} period="last quarter" prefix="$" /> */}
      <ProgressCard title="Monthly revenue goal" settings={Settings} money={getCurrencyPrefix(money)} earnings={earnings} payments={payments}/>
      {/* <MetricCard title="New orders" value="18,221" change={11} period="last quarter" /> */}
    </div>

    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3 mb-4 sm:mb-6">
      {/* <SalesDonut /> */}
      <div className="lg:col-span-2">
        <ProfitChart earnings={earnings} payments={payments} money={getCurrencyPrefix(money)} />
      </div>
      <div className="grid gap-4">
        <div className="max-lg:hidden ">
          <PremiumPlanCard settings={Settings} money={getCurrencyPrefix(money)}/>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-2 gap-4 max-sm:grid-cols-1 items-start">
          <AddEarnings />
          <MonthlyGoal />
        </div>
        {/* <DailyEarnings/> */}
        <div className="grid grid-cols-2 lg:grid-cols-1 max-sm:grid-cols-1 gap-4">
          <div className="lg:hidden ">
            <PremiumPlanCard settings={Settings} money={getCurrencyPrefix(money)}/>
          </div>
          <Reminders />
          
        </div>
      </div>
      {/* <div className="grid gap-4 sm:gap-6">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-1">
          <Reminders/>
          <MetricCard title="New customers" value="862" change={-8} period="Last Week" />
          <MetricCard title="Total profit" value="25.6k" change={42} period="Weekly Profit" prefix="$" />
        </div>
      </div> */}
    </div>

    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
      <PaymentCheckList title={"Dental Supplies"} tasks={Supplies || []} isLoading={isLoading} />
      <PaymentCheckList title={"Staff Payroll"} tasks={Payroll || []} isLoading={isLoading} />
      <PaymentCheckList title={"Dental Lab Fees"} tasks={Fees || []} isLoading={isLoading} />

      {/* <CustomerList /> */}
      {/* <PremiumPlanCard /> */}
    </div>
  </div>
  )
}

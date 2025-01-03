import DailyEarnings from "@/components/paymentReminder/DailyEarnings";
import Reminders from "@/components/paymentReminder/Reminders";

export default function PaymentReminder() {
  return (
    <div className="min-h-screen bg-[#0B1015] text-white">
        {/* <NavigationBar /> */}
        <main className="fixed w-full h-full overflow-y-auto">
          {/* <TaskList /> */}
          {/* <DentalAssistantList /> */}
          <Reminders/>
          <DailyEarnings/>
        </main>
    </div>
  )
}

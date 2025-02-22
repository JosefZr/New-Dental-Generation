import { useGetSettings } from "@/hooks/payments/useGetSettings"
import IstighfarChart from "./IstighfarChart"
import { IstighfarCount } from "./IstighfarCount"
import { IstighfarGoal } from "./IstighfarGoal"
import { useGetIstighfarById } from "@/hooks/Istighfar/useGetIstighfarById"
import { IstighfarProgress } from "./IstighfarProgress"
import Prayers from "./Prayers"
import { useAuthUser } from "@/hooks/jwt/useAuthUser"
import RemiderDikr from "./RemiderDikr"

export default function SunnahHome() {
    const userInfo = useAuthUser();
  const {
    data: Settings,
    isLoading: isLoadingSettings,
    isError: isErrorSettings,
    error: SettingsError,
  } = useGetSettings({ userId: userInfo.userId })
  const { data: Istighfar, isLoading, isError, error } = useGetIstighfarById({ id: userInfo.userId })

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-l from-[#8B704E] to-[#101010]">
      <div className="flex flex-row items-center text-center gap-2 pr-5 mb-4 sm:mb-6">
        <h1 className="text-[38px] w-full amiri-regular">تحيتهم فيها سلام</h1>
      </div>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3 mb-4 sm:mb-6">
        <div className="sm:col-span-2">
          <IstighfarChart earnings={Istighfar} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="hidden lg:block">
            <IstighfarGoal settings={Settings} />
          </div>
          <div className="space-y-4">
            <IstighfarCount />
            <IstighfarProgress title="Daily Istighfar goal" settings={Settings} earnings={Istighfar} />
          </div>
          <div className="lg:hidden">
            <IstighfarGoal settings={Settings} />
          </div>
        </div>
      </div>
      <div className="w-full">
        <Prayers />
        <RemiderDikr/>
      </div>
    </div>
  )
}


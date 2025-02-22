import { Button } from "@/components/ui/button"
import { SunnahContext } from "@/context/sunnahContext";
import { useGetAdkar } from "@/hooks/Istighfar/useGetAdkar";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { useContext } from "react";

export default function Adkar() {
  const{dikr, setDikr} = useContext(SunnahContext)
    const userInfo = useAuthUser();
    const { onOpen } = useModal();
    const {data, isLoading, isError, error} = useGetAdkar({userId:userInfo.userId})
    if (isLoading) return <div className="text-center p-6">جاري التحميل...</div>;

    const handleReminderClick = (index) => {
      // Set the selected dikr with its index and settings in context
      const selectedDikr = {
        index,
        dikr: data.adkar[index],
      };
      
      setDikr(selectedDikr);
      onOpen(MODAL_TYPE.SUNNAH_REMINDER);
    };
    console.log(dikr)
  return (
    <div className="max-w-2xl mx-auto p-6 flex gap-6 flex-col bg-gradient-to-l from-[#8B704E] to-[#101010]" dir="rtl">
      <h2 className="text-3xl font-arabic text-center amiri-regular">يا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا الله ذِكْرًا كَثِيرًا</h2>
      <div className="space-y-6 ">
        {data.adkar.map((prayer,index) => (
          <div key={prayer.name} className="flex items-center gap-4  rounded-lg p-2 transition-colors border-[#8B704E] border-solid border-[1px]">
            <div className="flex-1">
              <p className="text-xl leading-relaxed amiri-regular">{prayer.name}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
              onClick={() => {
                handleReminderClick(index)
              }}
            >
              تذكير
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}


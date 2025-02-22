import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUpdateIstighfar } from "@/hooks/Istighfar/useUpdateIstighfar";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

export function IstighfarGoal({ settings }) {
  const userInfo = jwtDecode(localStorage.getItem("token"));
  const [goal, setGoal] = useState(settings?.settings?.IstighfarGoal?.toString() || ""); // Ensure it's a string
  const updateGoalMutation = useUpdateIstighfar();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(goal)
    updateGoalMutation.mutate({userId: userInfo.userId, goal: goal });

  };

  return (
    <Card
      
      className="bg-gradient-to-br px-0 mx-0 border-[#8B704E] from-black to-[#8B704E] overflow-hidden h-full w-full text-center flex justify-center items-center "
    >
      <CardContent className="p-6 px-0 mx-0 w-[80%]">
        <div className="space-y-1 mb-7">
          <div className="flex items-center gap-2">
            <h3 className="text-3xl font-normal text-white border-r-2 pr-2">
              {settings?.settings?.IstighfarGoal}
            </h3>
            <div className="text-white/70 text-xl text-start amiri-regular"> المهدوف اليومي</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 justify-between flex-col">
          <Input
            type="text"
            placeholder="Update Your Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value.replace(/[^\d]/g, ""))} // Allow only numbers
            className="min-w-full h-11 bg-[#1A1F24] border-gray-800 text-white placeholder:text-gray-500"
          />
          <button
            type="submit"
            className="flex-1 w-full bg-my-gold min-w-28 hover:bg-[#8B704E] hover:text-white text-gray-900 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
          >
            Update Goal
          </button>
        </form>
      </CardContent>
    </Card>
  );
}

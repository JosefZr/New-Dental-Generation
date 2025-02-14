import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUpdateGoal } from "@/hooks/payments/useUpdateGoal";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

export function PremiumPlanCard({ settings, money }) {
  const userInfo = jwtDecode(localStorage.getItem("token"));
  const [goal, setGoal] = useState(settings?.settings?.goal?.toString() || ""); // Ensure it's a string
  const updateGoalMutation = useUpdateGoal();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(goal)
    updateGoalMutation.mutate({userId: userInfo.userId, goal: goal });

  };

  return (
    <Card
      style={{ position: "relative" }}
      className="bg-gradient-to-br px-0 mx-0 border-gray-800 from-black to-[#13F287] overflow-hidden h-full w-full text-center flex justify-center items-center "
    >
      <CardContent className="p-6 px-0 mx-0 w-[80%]">
        <div className="space-y-1 mb-7">
          <div className="flex items-center gap-2">
            <h3 className="text-3xl font-normal text-white border-r-2 pr-2">
              {money} {settings?.settings?.goal}
            </h3>
            <div className="text-white/70 text-xl text-start">Per Month</div>
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
            className="flex-1 w-full bg-[#c1ff72] min-w-28 hover:bg-[#b3f065] text-gray-900 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
          >
            Update Goal
          </button>
        </form>
      </CardContent>
    </Card>
  );
}

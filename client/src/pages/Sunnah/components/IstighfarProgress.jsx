import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

// Helper function to calculate daily totals
const getDailyTotals = (data = [], date) => {
return data
    .filter(item => 
        format(new Date(item.createdAt), "yyyy-MM-dd") === date
    )
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
};

export function IstighfarProgress({ title, settings, earnings = [] }) {
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const currentDayEarnings = getDailyTotals(earnings, currentDate);

  // Get the goal value
  const goal = settings?.settings?.IstighfarGoal || 1;

  // Calculate the percentage progress
  const progress = Math.min((currentDayEarnings/goal) * 100, 100).toFixed(1);

  return (
    <Card className="bg-[#101214] border-[#282F35]">
      <CardContent className="p-4 sm:p-6">
        <p className="text-xs sm:text-sm text-gray-400">{title}</p>
        <h3 className="text-lg sm:text-2xl font-bold text-white mt-1 sm:mt-2">
          {progress}%
        </h3>
        <div className="mt-2 sm:mt-4">
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8B704E] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
            Goal: {goal}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
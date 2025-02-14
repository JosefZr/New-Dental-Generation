/* eslint-disable react/prop-types */
import { Card, CardContent } from "@/components/ui/card";
import {format} from "date-fns";
// Helper function to calculate monthly totals
const getMonthlyTotals = (data = [], month) => {
  return data
    .filter(item => 
      item.completed && format(new Date(item.createdAt), "yyyy-MM") === month
    )
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
};
export function ProgressCard({ title, settings, money,earnings = [], payments = [], }) {
  const currentMonth = format(new Date(), "yyyy-MM");
  const currentMonthEarnings = getMonthlyTotals(earnings, currentMonth);
  const currentMonthPayments = getMonthlyTotals(payments, currentMonth);
  const currentNet = currentMonthEarnings - currentMonthPayments;

  // Get the goal value
  const goal = settings?.settings?.goal || 1; // Avoid division by zero

  // Calculate the percentage progress
  const progress = Math.min((currentNet/goal) * 100, 100).toFixed(1); // Limit max progress to 100%

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
              className="h-full bg-[#13F287] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
            Goal: {money} {goal}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

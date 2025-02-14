/* eslint-disable react/prop-types */
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { subMonths, subDays, format} from "date-fns";
import { useMemo } from "react";
import GreenLoader from "../GreenLoader";

// Helper function to calculate totals for a specific date
const getDailyTotals = (data = [], date) => {
  const dateStr = format(new Date(date), "yyyy-MM-dd");
  return data
    .filter(item => 
      item.completed && format(new Date(item.createdAt), "yyyy-MM-dd") === dateStr
    )
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
};

// Helper function to calculate monthly totals
const getMonthlyTotals = (data = [], month) => {
  return data
    .filter(item => 
      item.completed && format(new Date(item.createdAt), "yyyy-MM") === month
    )
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
};

export function MetricCards({ earnings = [], payments = [], viewType ,money,isLoading, isLoadingEarnings }) {
  const isDaily = viewType === "daily";
  // Calculate metrics based on view type
  const metrics = useMemo(() => {
    if (isDaily) {
      const today = new Date();
      const yesterday = subDays(today, 1);

      const todayEarnings = getDailyTotals(earnings, today);
      const todayPayments = getDailyTotals(payments, today);
      const yesterdayEarnings = getDailyTotals(earnings, yesterday);
      const yesterdayPayments = getDailyTotals(payments, yesterday);

      const todayNet = todayEarnings - todayPayments;
      const yesterdayNet = yesterdayEarnings - yesterdayPayments;

      return {
        revenue: {
          current: todayEarnings,
          previous: yesterdayEarnings,
          label: "Today's Revenue"
        },
        spending: {
          current: todayPayments,
          previous: yesterdayPayments,
          label: "Today's Spending"
        },
        net: {
          current: todayNet,
          previous: yesterdayNet,
          label: "Today's Net"
        }
      };
    } else {
      const currentMonth = format(new Date(), "yyyy-MM");
      const lastMonth = format(subMonths(new Date(), 1), "yyyy-MM");

      const currentMonthEarnings = getMonthlyTotals(earnings, currentMonth);
      const currentMonthPayments = getMonthlyTotals(payments, currentMonth);
      const lastMonthEarnings = getMonthlyTotals(earnings, lastMonth);
      const lastMonthPayments = getMonthlyTotals(payments, lastMonth);

      const currentNet = currentMonthEarnings - currentMonthPayments;
      const lastNet = lastMonthEarnings - lastMonthPayments;
      
      return {
        revenue: {
          current: currentMonthEarnings,
          previous: lastMonthEarnings,
          label: "Monthly Revenue"
        },
        spending: {
          current: currentMonthPayments,
          previous: lastMonthPayments,
          label: "Monthly Spending"
        },
        net: {
          current: currentNet,
          previous: lastNet,
          label: "Net Revenue"
        }
      };
    }
  }, [earnings, payments, viewType]);

  const getPercentageChange = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <>
      <MetricCard
        title={metrics.revenue.label}
        value={metrics.revenue.current.toLocaleString()}
        change={getPercentageChange(metrics.revenue.current, metrics.revenue.previous)}
        period={isDaily ? "yesterday" : "last month"}
        prefix={money}
        isLoading={isLoading || isLoadingEarnings}
      />
      <MetricCard
        title={metrics.spending.label}
        value={metrics.spending.current.toLocaleString()}
        change={getPercentageChange(metrics.spending.current, metrics.spending.previous)}
        period={isDaily ? "yesterday" : "last month"}
        prefix={money}
        isLoading={isLoading || isLoadingEarnings}
      />
      <MetricCard
        title={metrics.net.label}
        value={metrics.net.current.toLocaleString()}
        change={getPercentageChange(metrics.net.current, metrics.net.previous)}
        period={isDaily ? "yesterday" : "last month"}
        prefix={money}
        isLoading={isLoading || isLoadingEarnings}
      />
    </>
  );
}

function MetricCard({ title, value, change, period, prefix = "",isLoading }) {
  const isPositive = Number(change) >= 0;

  return (
    <Card className="bg-[#101214] border-[#282F35] ">
      <CardContent className="p-6">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-normal text-gray-400 pb-3">{title}</p>
          <div className="flex items-center justify-between">
          {isLoading ? <GreenLoader big={true} left={true} /> : <div className="text-5xl font-medium text-white">{prefix}{value.toLocaleString()}</div>}

          </div>
          <div className="flex flex-row items-center gap-2">
            <div className={`flex items-center gap-1 text-xl ${
                isPositive ? 'text-green-500' : 'text-red-500'
              }`}>
                {isPositive ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4" />
                )}
                <span>{Math.abs(change)}%</span>
            </div>
            <p className="text-xl text-white">vs {period}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
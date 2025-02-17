/* eslint-disable react/prop-types */
import { TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { subMonths, format } from "date-fns"
import { useMemo } from "react"

const chartConfig = {
  desktop: {
    label: "Earnings",
    color: "#13F287",
  },
  mobile: {
    label: "Spendings",
    color: "hsl(var(--chart-5))",
  },
} 

export function ProfitChart({ earnings = [], payments = [] ,money}) {
  const lastSixMonths = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(new Date(), i);
      return format(date, "yyyy-MM");
    }).reverse();
  }, []);

  const chartData = lastSixMonths.map((month) => {
    const earningsTotal = earnings
      .filter((e) => e.completed && format(new Date(e.date), "yyyy-MM") === month)
      .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

    const spendingTotal = payments
      .filter((p) => p.completed && format(new Date(p.date), "yyyy-MM") === month)
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    return {
      month: format(new Date(month), "MMMM"),
      desktop: earningsTotal || 0,
      mobile: spendingTotal || 0,
      profit: (earningsTotal || 0) - (spendingTotal || 0)
    };
  });

  // Calculate total profit for all months
  const totalProfit = chartData.reduce((sum, month) => sum + month.profit, 0);

  // Fix percentage change calculation by comparing current and previous month's profit
  const currentMonthProfit = chartData[chartData.length - 1]?.profit || 0;
  const lastMonthProfit = chartData[chartData.length - 2]?.profit || 0;
  const percentageChange = lastMonthProfit ? ((currentMonthProfit - lastMonthProfit) / lastMonthProfit * 100).toFixed(1) : 0;

  // Custom tooltip content
  // eslint-disable-next-line react/prop-types
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-4 border rounded-lg shadow-lg ">
          <p className="font-bold text-xl mb-2">{label}</p>
          
          {/* Earnings Box */}
          <p className="text-sm flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[var(--color-desktop)] inline-block"></span> 
            Earnings: {money} {payload[1]?.value?.toLocaleString()}
          </p>
  
          {/* Spending Box */}
          <p className="text-sm flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[var(--color-mobile)] inline-block"></span> 
            Spending: {money} {payload[0]?.value?.toLocaleString()}
          </p>
  
          {/* Profit */}
          <p className="text-xl font-semibold mt-2">
            Profit: {money} {(payload[1]?.value - payload[0]?.value).toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };
  

  return (
    <Card className="h-full dark ">
      <CardHeader>
        <CardTitle className="text-foreground text-3xl">Total Profit: {money} {totalProfit.toLocaleString()}</CardTitle>
        <CardDescription className="text-muted-foreground">6 Month Financial Overview</CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%-12rem)]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 12,
                bottom: 12,
              }}
            >
              <CartesianGrid vertical={true} stroke="rgba(208, 187, 187, 0.087)" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                stroke="currentColor"
                className="text-muted-foreground"
              />
              <ChartTooltip cursor={false} content={<CustomTooltip />} />
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                dataKey="mobile"
                type="natural"
                fill="url(#fillMobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                strokeWidth={2}
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="url(#fillDesktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm my-2">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none text-foreground text-xl">
              Trending {currentMonthProfit >= 0 ? "up" : "down"} by {Math.abs(percentageChange)}% this month {currentMonthProfit >= 0 ? <TrendingUp className="h-6 w-6 text-green-500" /> : <TrendingDown className="h-6 w-6 text-red-500" />}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {chartData[0]?.month.slice(0, 3)} - {chartData[chartData.length - 1]?.month.slice(0, 3)} {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
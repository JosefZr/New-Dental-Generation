import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { subMonths, format, subDays } from "date-fns";
import { useContext, useMemo } from "react";
import { UserContext } from "@/context/UserContext";

const chartConfig = {
  desktop: {
    label: "Istighfar",
    color: "#8B704E",
  },
};

export default function IstighfarChart({ earnings = [] }) {
  const { viewType } = useContext(UserContext);

  const lastDays = useMemo(
    () => Array.from({ length: 10 }, (_, i) => format(subDays(new Date(), i), "yyyy-MM-dd")).reverse(),
    []
  );

  const lastMonths = useMemo(
    () => Array.from({ length: 6 }, (_, i) => format(subMonths(new Date(), i), "yyyy-MM")).reverse(),
    []
  );

  const chartData = (viewType === "daily" ? lastDays : lastMonths).map((period) => {
    const total = earnings
      .filter((e) => format(new Date(e.date), viewType === "daily" ? "yyyy-MM-dd" : "yyyy-MM") === period)
      .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    return {
      period: format(new Date(period), viewType === "daily" ? "dd MMM" : "MMMM"),
      value: total || 0,
    };
  });

  const totalProfit = chartData.reduce((sum, item) => sum + item.value, 0);
  const currentProfit = chartData.at(-1)?.value || 0;
  const lastProfit = chartData.at(-2)?.value || 0;
  const percentageChange = lastProfit ? ((currentProfit - lastProfit) / lastProfit * 100).toFixed(1) : "0";
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-4 border rounded-lg shadow-lg ">
          <p className="font-bold text-xl mb-2">{label}</p>
          {/* Spending Box */}
          <p className="text-sm flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[var(--color-desktop)] inline-block"></span> 
            istighfar: {payload[0]?.value?.toLocaleString()}
          </p>
  
        </div>
      );
    }
    return null;
  };
  return (
    <Card className="h-full dark">
      <CardHeader>
        <CardTitle className="text-foreground text-3xl flex gap-3 items-center">
          Istighfar Performance
          {currentProfit >= lastProfit ? (
            <TrendingUp className="h-8 w-8 text-green-500" />
          ) : (
            <TrendingDown className="h-8 w-8 text-red-500" />
          )}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Total Profit: {totalProfit.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%-12rem)]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
            >
              <CartesianGrid stroke="rgba(208, 187, 187, 0.087)" />
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                stroke="currentColor"
                className="text-muted-foreground"
              />
              <ChartTooltip cursor={false} content={<CustomTooltip />} />
              <Area
                dataKey="value"
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
            <div className="flex items-center gap-2 font-medium text-foreground text-xl">
              Trending {currentProfit >= lastProfit ? "up" : "down"} by{" "}
              {Math.abs(percentageChange)}% this period
              {currentProfit >= lastProfit ? (
                <TrendingUp className="h-6 w-6 text-green-500" />
              ) : (
                <TrendingDown className="h-6 w-6 text-red-500" />
              )}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
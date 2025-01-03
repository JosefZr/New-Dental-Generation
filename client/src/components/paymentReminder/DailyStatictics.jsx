
import { useState } from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useUserEarnings } from '@/hooks/payments/useGetEarnings'
import { jwtDecode } from 'jwt-decode'

// // Mock data - replace this with actual data fetching logic
// const mockData = {
//     daily: [
//         { date: '2023-01-01', earnings: 100 },
//         { date: '2023-01-02', earnings: 150 },
//         { date: '2023-01-03', earnings: 200 },
//         { date: '2023-01-04', earnings: 120 },
//         { date: '2023-01-05', earnings: 180 },
//     ],
//     weekly: [
//         { date: 'Week 1', earnings: 1000 },
//         { date: 'Week 2', earnings: 1200 },
//         { date: 'Week 3', earnings: 900 },
//         { date: 'Week 4', earnings: 1500 },
//     ],
//     monthly: [
//         { date: 'Jan', earnings: 5000 },
//         { date: 'Feb', earnings: 5500 },
//         { date: 'Mar', earnings: 4800 },
//         { date: 'Apr', earnings: 6000 },
//     ],
//     yearly: [
//         { date: '2020', earnings: 50000 },
//         { date: '2021', earnings: 60000 },
//         { date: '2022', earnings: 75000 },
//         { date: '2023', earnings: 90000 },
//     ],
// }

export function EarningsChart() {
    const [timeframe, setTimeframe] = useState("daily");
    const userInfo = jwtDecode(localStorage.getItem("token"));
    const id = userInfo.userId;
        // Fetch earnings data
        const { data, isLoading, isError } = useUserEarnings({
        id,
        type: "Earnings",
        });
    
    // Format data for the chart
    const formatChartData = (data) => {
    switch (timeframe) {
            case "daily":
            return data.map((item) => ({
                date: new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                }),
                earnings: item.amount,
            }));
            case "weekly":
            return aggregateDataByWeek(data);
            case "monthly":
            return aggregateDataByMonth(data);
            case "yearly":
            return aggregateDataByYear(data);
            default:
            return [];
        }
        };
    
    // Group data by week
    const aggregateDataByWeek = (data) => {
        const grouped = {};
        data.forEach((item) => {
            const week = getWeekOfYear(new Date(item.date));
            if (!grouped[week]) grouped[week] = 0;
            grouped[week] += item.amount;
    });
        return Object.keys(grouped).map((week) => ({
            date: `Week ${week}`,
            earnings: grouped[week],
        }));
    };
    // Group data by month
    const aggregateDataByMonth = (data) => {
        const grouped = {};
        data.forEach((item) => {
        const date = new Date(item.date);
        const month = date.toLocaleString("en-US", { month: "short", year: "numeric" });
        if (!grouped[month]) grouped[month] = 0;
        grouped[month] += item.amount;
    });
    
        return Object.keys(grouped).map((month) => ({
            date: month,
            earnings: grouped[month],
        }));
        };
    // Group data by year
    const aggregateDataByYear = (data) => {
        const grouped = {};
        data.forEach((item) => {
            const year = new Date(item.date).getFullYear();
            if (!grouped[year]) grouped[year] = 0;
            grouped[year] += item.amount;
    });
    
        return Object.keys(grouped).map((year) => ({
            date: year.toString(),
            earnings: grouped[year],
        }));
    };
    // Helper to get the week of the year
        const getWeekOfYear = (date) => {
        const start = new Date(date.getFullYear(), 0, 1);
        const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
        return Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;
    };
    // Format currency for DZD
    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-DZ", {
            style: "currency",
            currency: "DZD",
        }).format(value);
    // Format the data
    const formattedData = data ? formatChartData(data) : [];
        return (
        <div className="relative  animate-fade-in">
            <div className="scrollbar-none overflow-x-visible overscroll-y-none h-full w-full">
            <div className="scrollbar-none overscroll-y-none sm:max-h-none bg-next-midnight rounded-lg px-0 pb-4 sm:px-5 swipe-dialog-scroll-descendant">
                <div className="w-fit mx-auto items-center">
                    <div className="group relative  rounded-xl bg-next-d mt-2 mb-2 inline-flex flex-col justify-around overflow-visible mx-auto">
                    <div
                        className="group rounded-xl m-[1px] px-[5.5px] pt-[7.5px] pb-[0.79rem] z-10 inline-flex flex-col justify-around gap-1 w-[calc(100%-2px)] transition-all mx-auto"
                        style={{
                        background: "rgb(13, 26, 37, 1)",
                        }}
                    >
                        <div
                            className="z-10 flex items-center rounded-xl text-white py-2 "
                            style={{
                                backgroundColor: "rgb(6, 14, 21, 1)",
                            }}
                        >
                        <Card className=" bg-transparent text-white border-none">
                            <CardHeader>
                            <CardTitle>Earnings Overview</CardTitle>
                            <CardDescription>Your earnings over time</CardDescription>
                            </CardHeader>
                            <CardContent className="">
                            <Select
                                value={timeframe}
                                onValueChange={(value) => setTimeframe(value)}
                            >
                                <SelectTrigger className="w-[180px] mb-4 border-slate-600">
                                <SelectValue placeholder="Select timeframe" />
                                </SelectTrigger>
                                <SelectContent className="bg-black text-white border-gray-800">
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                                </SelectContent>
                            </Select>
                            <ChartContainer
                                config={{
                                earnings: {
                                    label: "Earnings",
                                    color: "hsl(var(--chart-1))",
                                },
                                }}
                                className="h-[300px]"
                            >
                                <ResponsiveContainer className="h-[300px] w-full">
                                <LineChart data={formattedData}>
                                    <XAxis
                                    dataKey="date"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    />
                                    <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={formatCurrency}
                                    />
                                    <Line
                                    type="monotone"
                                    dataKey="earnings"
                                    stroke="var(--color-earnings)"
                                    strokeWidth={2}
                                    />
                                    <ChartTooltip/>
                                    <Tooltip
                                    content={({ payload }) => {
                                        console.log(payload);
                                        if (payload && payload.length) {
                                            const { date, earnings } = payload[0].payload;
                                            return (
                                                <ChartTooltip>
                                                    <ChartTooltipContent>
                                                        <p>{date}</p>
                                                        <p>{formatCurrency(earnings)}</p>
                                                    </ChartTooltipContent>
                                                </ChartTooltip>
                                            );
                                        }
                                        return null;
                                    }}
                                    
                                    />
                                </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                            </CardContent>
                        </Card>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        );
    }
    
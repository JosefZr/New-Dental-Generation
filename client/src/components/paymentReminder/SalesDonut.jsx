"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const salesData = [
  {
    name: "Electronic",
    value: 55640,
  },
  {
    name: "Furniture",
    value: 11420,
  },
  {
    name: "Clothes",
    value: 1840,
  },
  {
    name: "Shoes",
    value: 2120,
  },
]

export function SalesDonut() {
  return (
    <Card className="bg-gray-900">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white text-base sm:text-lg font-medium">Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            electronic: {
              label: "Electronic",
              color: "hsl(var(--chart-1))",
            },
            furniture: {
              label: "Furniture",
              color: "hsl(var(--chart-2))",
            },
            clothes: {
              label: "Clothes",
              color: "hsl(var(--chart-3))",
            },
            shoes: {
              label: "Shoes",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="w-full aspect-square max-w-xs mx-auto"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={salesData}
                dataKey="value"
                nameKey="name"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={2}
                fill="var(--color-electronic)"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="space-y-2 sm:space-y-4 mt-4">
          {salesData.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                  style={{ backgroundColor: `hsl(var(--chart-${index + 1}))` }}
                />
                <span className="text-xs sm:text-sm text-gray-400">{item.name}</span>
              </div>
              <span className="text-xs sm:text-sm text-white">${item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const customers = [
  {
    name: "Danny Liu",
    email: "danny@gmail.com",
    deals: "1,023",
    value: "$37,431",
  },
  {
    name: "Bella Deviant",
    email: "bella@gmail.com",
    deals: "963",
    value: "$30,423",
  },
  {
    name: "Darrell Steward",
    email: "darrell@gmail.com",
    deals: "843",
    value: "$28,549",
  },
]

export function CustomerList() {
  return (
    <Card className="bg-gray-900">
      <CardHeader>
        <CardTitle className="text-white text-base sm:text-lg font-medium">Customer list</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 sm:space-y-6">
          {customers.map((customer) => (
            <div key={customer.email} className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                  <AvatarFallback>{customer.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-white">{customer.name}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-medium text-white">{customer.deals}</p>
                  <p className="text-xs sm:text-sm text-gray-400">Deals</p>
                </div>
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-medium text-white">{customer.value}</p>
                  <p className="text-xs sm:text-sm text-gray-400">Value</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


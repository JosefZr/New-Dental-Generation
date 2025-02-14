import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreatePayment } from "@/hooks/payments/useCreatePayment";
import { jwtDecode } from "jwt-decode";

export function MonthlyGoal() {
  const userInfo = jwtDecode(localStorage.getItem("token"));
  const createPayment = useCreatePayment();

  const [newTaskData, setNewTaskData] = useState({
    amount: "",
    title: "",
    date: "",
    type: "Spendings", // Default to Spendings
    completed: true,
  });

  const handleTaskInputChange = (field, value) => {
    setNewTaskData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSpending = (e) => {
    e.preventDefault();

    const { amount, title } = newTaskData;

    // Validation
    if (!title.trim()) {
      alert("Please enter a valid title.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }

    // Get today's date in UTC format
    const localDate = new Date();
    const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));

    // Construct payment object with type "Spendings"
    const payment = {
      ...newTaskData,
      date: utcDate.toISOString(), // Store UTC date
      type: "Spendings",
    };

    const id = userInfo.userId;
    console.log({ id, payment });

    createPayment.mutate({ id, payment });

    // Reset form
    setNewTaskData({
      amount: "",
      title: "",
      date: "",
      type: "Spendings", // Keep Spendings as default
      completed: true,
    });
  };

  return (
    <Card className="bg-[#101214] border-[#282F35] text-white">
      <CardHeader>
        <CardTitle>Today’s Spending</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddSpending} className="space-y-4">
          {/* Title input */}
          <Input
            type="text"
            placeholder="Enter a title"
            value={newTaskData.title}
            onChange={(e) => handleTaskInputChange("title", e.target.value)}
            className="w-full bg-[#1A1F24] border-gray-800 text-white placeholder:text-gray-500"
          />

          {/* Amount input */}
          <Input
            type="number"
            value={newTaskData.amount}
            onChange={(e) => handleTaskInputChange("amount", e.target.value)}
            placeholder="Enter spending amount"
            className="bg-[#1c1f23] border-[#282F35] text-white"
          />

          {/* Submit button */}
          <Button type="submit" className="w-full bg-[#CF1827] hover:bg-[#CF1827]/80 text-white">
            I Spent
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

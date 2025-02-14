import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { jwtDecode } from "jwt-decode";
import { useCreatePayment } from "@/hooks/payments/useCreatePayment";

export function AddEarnings() {
    const userInfo = jwtDecode(localStorage.getItem("token"));
    const createPayment = useCreatePayment();

    const [newTaskData, setNewTaskData] = useState({
        amount: "",
        title: "",
        date: "",
        type: "Earnings",
        completed: true,
    });

    // Handle input changes
    const handleTaskInputChange = (field, value) => {
        setNewTaskData((prev) => ({ ...prev, [field]: value }));
    };

    // Handle form submission
    const handleAddEarnings = (e) => {
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
        const localDate = new Date();
        const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
        const payment = {
            ...newTaskData,
            date: utcDate.toISOString(), // Store UTC date
            type: "Earnings",
        };
        const id = userInfo.userId;
        console.log({ id, payment });
        createPayment.mutate({ id, payment });
        // Reset form
        setNewTaskData({
            amount: "",
            title: "",
            date: "",
            type: "Earnings",
            completed: true,
        });
    };

    return (
        <Card className="bg-[#101214] border-[#282F35] text-white">
            <CardHeader>
                <CardTitle>Today’s Earnings</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleAddEarnings} className="space-y-4">
                    {/* Title Input */}
                    <Input
                        type="text"
                        placeholder="Enter a title"
                        value={newTaskData.title}
                        onChange={(e) => handleTaskInputChange("title", e.target.value)}
                        className="w-full bg-[#1A1F24] border-gray-800 text-white placeholder:text-gray-500"
                    />

                    {/* Amount Input */}
                    <Input
                        type="number"
                        placeholder="Type Amount Earned Today"
                        value={newTaskData.amount}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric chars
                            handleTaskInputChange("amount", value ? Number(value) : "");
                        }}
                        className="w-full bg-[#1A1F24] border-gray-800 text-white placeholder:text-gray-500"
                    />

                    <Button type="submit" className="w-full bg-[#13F287] text-black">
                        Add Earnings
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

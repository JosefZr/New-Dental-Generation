import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { jwtDecode } from "jwt-decode";
import { useCreateIstighfar } from "@/hooks/Istighfar/usecreateIstighfar";

export function IstighfarCount() {
    const userInfo = jwtDecode(localStorage.getItem("token"));
    const createIstighfar = useCreateIstighfar();

    const [newTaskData, setNewTaskData] = useState({
        amount: "",
        date: "",
        type: "Istighfar",
    });

    // Handle input changes
    const handleTaskInputChange = (field, value) => {
        setNewTaskData((prev) => ({ ...prev, [field]: value }));
    };

    // Handle form submission
    const handleAddEarnings = (e) => {
        e.preventDefault();

        const { amount } = newTaskData;

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            alert("Please enter a valid amount greater than 0.");
            return;
        }
        const localDate = new Date();
        const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
        const istighfar = {
            ...newTaskData,
            date: utcDate.toISOString(), // Store UTC date
            type: "Istighfar",
        };
        const id = userInfo.userId;
        console.log({ id, istighfar });
        createIstighfar.mutate({ id, istighfar });
        // Reset form
        setNewTaskData({
            amount: "",
            date: "",
            type: "Istighfar",
        });
    };

    return (
        <Card className="bg-[#101214] border-[#282F35] text-white">
            <CardHeader>
                <CardTitle>عداد الإستغفار</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleAddEarnings} className="space-y-4">
                    {/* Amount Input */}
                    <Input
                        type="number"
                        placeholder="Type Istighfar of Today"
                        value={newTaskData.amount}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric chars
                            handleTaskInputChange("amount", value ? Number(value) : "");
                        }}
                        className="w-full bg-[#1A1F24] border-gray-800 text-white placeholder:text-gray-500"
                    />
                    <Button type="submit" className="w-full bg-gradient-to-l from-[#8B704E] to-white text-black">
                        Add Earnings
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

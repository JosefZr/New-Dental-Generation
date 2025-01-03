import styled from "styled-components";

import  { EarningsChart } from "./DailyStatictics";
import { LucidePlus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { format } from "date-fns";
import { useCreatePayment } from "@/hooks/payments/useCreatePayment";

const Container = styled.div`
    overscroll-behavior-block: none;
    overscroll-behavior-x: none;
    scroll-behavior: auto;
    scroll-snap-stop: always;
    scroll-snap-align: start;
    scroll-snap-type: x mandatory;
`;
const tasks =[
    {
        id: 1,
        title: "Dental Supplies",
    },
    {
        id: 2,
        title: "Staff Payroll",
    },
    {
        id: 3,
        title: "Dental Lab Fees",
    }
]
export default function DailyEarnings() {
    const userInfo = jwtDecode(localStorage.getItem("token"));

    const [newTaskData, setNewTaskData] = useState({
        amount: 0,
        title:"",
        date: "",
        type: "Earnings",
        completed:true,
    });
    const createPayment = useCreatePayment();
    const handleQuickAdd = (e) => {
        if (e.key === "Enter") {
            if (!newTaskData.title ) {
                alert("Title.");
                return;
            }
            setNewTaskData([
                ...tasks,
                {
                title: newTaskData,
                completed: false,
                category: "Advanced",
                },
            ]);
        const id = userInfo.userId
        console.log(id, newTaskData )
        // mutation.mutate({ id, task:newTaskData });
        setNewTaskData({
            amount: 0,
            title:"",
            date: "",
            type: "",
            completed:true,
        });
        }
    };
    const HandleAddQuickTaskTask = (e)=>{
        e.preventDefault();
        if (!newTaskData.amount ) {
            alert("amount is note there.");
            return;
        }
        const payment = {
            ...newTaskData,
            date:format(new Date(), "MM/dd/yyyy"),
            type: "Earnings",
        }
        const id = userInfo.userId
        console.log({id, payment})
        createPayment.mutate({ id, payment  });
        // console.log(newTask)
        setNewTaskData({
            amount: null,
            title:"",
            date: "",
            type: "",
            completed:true,
        });
    }
    const handleTaskInputChange = (field, value) => {
        setNewTaskData((prev) => ({ ...prev, [field]: value }));
    };
return (
    <Container className="carousel carousel-start overflow-y-hidden overscroll-none">
    <div
        className="carousel-item relative h-full max-h-full max-w-[100dvw] overflow-hidden"
        style={{
        scrollSnapStop: "always",
        scrollSnapAlign: "start",
        overflowAnchor: "none",
        }}
    >
        <div className="w-full max-w-md px-5 z-10 pt-2 flex flex-row justify-center gap-2">
            <div className="relative w-full">
                <Input
                className="w-full bg-[#1A1F24] border-gray-800  text-white placeholder:text-gray-500 "
                type="number"
                placeholder="type Amount Earned Today"
                onKeyDown={handleQuickAdd}
                value={newTaskData.amount ?? ""} // Fallback to an empty string if undefined
                onChange={(e) =>
                    handleTaskInputChange("amount", Number(e.target.value.replace(/\D/g, "")) || 0) // Fallback to 0 if NaN
                }
                min="0"
                />
            </div>
            <Button
                className=" rounded-md bg-my-gold hover:bg-my-gold hover:opacity-90" 
                onClick={HandleAddQuickTaskTask}
            >
                    <LucidePlus className="h-[24px] w-[24px]" />
                </Button>
            </div>
        {/* <DailyStatictics tasks={tasks}/> */}
    </div>
    {/* <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
        <DialogContent className="bg-[#1A1F24] text-white border-gray-800">
        <DialogHeader>
            <DialogTitle>New Payment</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
            <div className="">
                <Label>Title</Label>
                <Input
                    placeholder="Dental Sepplie Name "
                    className="bg-[#0B1015] border-gray-800 "
                    value={newTaskData.title || ""} // Fallback to an empty string if undefined
                    onChange={(e) => handleTaskInputChange("title", e.target.value)}
                />
            </div>
            <div className="">
                <Label className="pt-2">Amount To Pay</Label>
                <Input
                    type="number"
                    placeholder="EX: 4000DA"
                    className="bg-[#0B1015] border-gray-800"
                    value={newTaskData.amount ?? ""} // Fallback to an empty string if undefined
                    onChange={(e) =>
                        handleTaskInputChange("amount", Number(e.target.value.replace(/\D/g, "")) || 0) // Fallback to 0 if NaN
                    }
                    min="0"
                />
            </div>
            <div className="space-y-4">
            <div>
                <Label>Due Date</Label>
                <div className=" ">
                <div className="relative ">
                    <Input
                        type="text"
                        className="bg-[#0B1015] border-gray-800 pr-10 w-full"
                        value={newTaskData.date || ""} // Fallback to an empty string if undefined
                        placeholder="Select date"
                        readOnly
                    />
                    <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                    onClick={toggleDatePicker}
                    >
                    <LucideCalendar className="w-5 h-5" />
                    </Button>
                </div>
                </div>
                {showDatePicker && (
                <div className="mt-2 flex justify-end">
                    <Calendar
                    mode="single"
                    selected={newTaskData.date ? new Date(newTaskData.date) : undefined}
                    onSelect={(date) => {
                        if (date) {
                        const adjustedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
                        handleTaskInputChange("date", adjustedDate);
                        } else {
                        handleTaskInputChange("date", '');
                        }
                        setShowDatePicker(false);
                    }}
                    className="rounded-md border border-gray-800 w-fit  bg-black"
                    />
                </div>
                )}
            </div>
            </div>
            <Button
            className="w-full bg-[#C4A962] hover:bg-[#B39952] text-black"
            // onClick={handleUpdateTask}
            >
            Add Payment
            </Button>
        </div>
        </DialogContent>
    </Dialog> */}
    <div
        className=" h-full max-h-full max-w-[100dvw] overflow-hidden"
        style={{
        scrollSnapStop: "always",
        scrollSnapAlign: "start",
        overflowAnchor: "none",
        }}
    >
        <EarningsChart />

    </div>

    </Container>
)
}

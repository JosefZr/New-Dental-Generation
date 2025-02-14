/* eslint-disable react/prop-types */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, LucideCalendar, Plus } from 'lucide-react'
import { jwtDecode } from "jwt-decode"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Calendar } from "../ui/calendar"
import { useCreatePayment } from "@/hooks/payments/useCreatePayment"

export default function RemindersTypes({tasks }) {
    const userInfo = jwtDecode(localStorage.getItem('token'))
    const [isVisible, setIsVisible] = useState(true)
    const [isUpdateTask, setIsUpdateTask] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [newTaskData, setNewTaskData] = useState({
        amount: 0,
        title:"",
        date: "",
        type: "",
        completed:false,
    });
    const handleTaskInputChange = (field, value) => {
        if (field === "date" && value instanceof Date) {
        const adjustedDate = new Date(value.getTime() - (value.getTimezoneOffset() * 60000));
        value = adjustedDate.toISOString().split('T')[0];
        }
        setNewTaskData((prev) => ({ ...prev, [field]: value }));
    };
    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };
    const createPayment = useCreatePayment();

    const handleUpdateTask = () => {
        const id = userInfo.userId
        const payment = {
            ...newTaskData,
        };
        createPayment.mutate({ id, payment });
        // Resetting the form state
        setIsUpdateTask(false);
        setNewTaskData({
            amount: 0,
            title:"",
            date: "",
            type: "",
            completed:false,
        });
    };
    return (
        <div className=" w-full animate-fade-in ">
            <div className="scrollbar-none overflow-x-visible overscroll-y-none">
                <div style={{position:"relative"}} className="scrollbar-none  h-full overflow-y-hidden    rounded-[0.75rem] border-[1px] border-[#282F35] swipe-dialog-scroll-descendant">
                    <div className="scrollbar-none   flex h-auto flex-col  overflow-x-hidden overflow-y-hidden">
                        <div className="group flex items-center ">
                            <div className="group  w-full   flex-col  ">
                                <div className="group  m-[1px]  p-[7.5px] pb-[0.79rem] z-10 inline-flex flex-col justify-around w-full h-full transition-all" style={{
                                    background:"#101214"
                                }}>
                                    <div className="z-10 flex items-center rounded-[0.5rem]  text-white py-2 pr-3 pl-5 bg-[#CF1827] "  >
                                        <span className="mr-auto flex items-center px-1 pr-3 font-semibold text-my-white">
                                            Payment Reminder
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsVisible(!isVisible)}
                                            className="text-black hover:text-white hover:bg-slate-800/50"
                                        >
                                            <ChevronDown className={`w-5 h-5 transition-transform ${isVisible ? 'rotate-180' : ''}`} />
                                        </Button>
                                    </div>
                                    {isVisible && (
                                    <div className="rounded-lg px-2 mt-2 ">
                                        {tasks.map((task) => (
                                            <div key={task.id} className="flex items-center justify-between group  hover:bg-black rounded-lg cursor-pointer h-12" onClick={() => {
                                                setIsUpdateTask(true);
                                                setNewTaskData({
                                                    type:task.title
                                                })
                                            }}>
                                                <div className="flex items-center">
                                                    <div>
                                                        <div className="flex items-center  gap-3 px-4 py-4">
                                                            <span 
                                                            >
                                                                {task.title}
                                                            </span>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className=" group-hover:opacity-100 hover:bg-transparent hover:text-white"
                                                >
                                                    <Plus className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    )}
                                    <Dialog open={isUpdateTask} onOpenChange={setIsUpdateTask}>
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
                                            onClick={handleUpdateTask}
                                            >
                                            Add Payment
                                            </Button>
                                        </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


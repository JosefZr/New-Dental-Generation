/* eslint-disable react/prop-types */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown, Trash, Pencil, LucideCalendar } from 'lucide-react'
import { jwtDecode } from "jwt-decode"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Calendar } from "../ui/calendar"
import { format } from "date-fns"
import { LoadingSpinner } from "../server/ServerSideBar"
import { useSetPaymentAsCompleted } from "@/hooks/payments/useSetPaymentAsCompleted"
import { useDeletePayment } from "@/hooks/payments/useDeletePayment"
import { useUpdatePayment } from "@/hooks/payments/useUpdatePayment"

export default function PaymentCheckList({tasks = [], isLoading, title,money}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const userInfo = jwtDecode(localStorage.getItem('token'))
    const [isVisible, setIsVisible] = useState(true)
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [taskId,setTaskId ]= useState("");
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
    const completedPayment = useSetPaymentAsCompleted();
    const toggleCompletion = (task) => {
        const newStatus = !task.completed;
        completedPayment.mutate({ userId: userInfo.userId, id: task._id, completed: newStatus });
    };
    const deleteTask = useDeletePayment();
    const onDeleteTaskToggle = (task) =>{
        deleteTask.mutate({ userId: userInfo.userId, id: task._id });
    }
    const updatePaymentMutation = useUpdatePayment()
    const handleUpdateTask = () => {
        // Prepare payment data for update
        const payment = {
            title: newTaskData.title,
            amount: newTaskData.amount,
            date: newTaskData.date,
            type: title, // Use the section title as payment type
            completed: newTaskData.completed
        }
        updatePaymentMutation.mutate({ id: userInfo.userId, taskId: taskId, payment: payment })
        setIsModalOpen(false)
        setNewTaskData({
            amount: 0,
            title: "",
            date: "",
            type: "",
            completed: false,
        })
    }
    const handleOpen = (task) => {
        setNewTaskData({
            title: task.title,
            amount: task.amount,
            date: format(new Date(task.date), 'MM/dd/yyyy'),
            type: task.type,
            completed: task.completed || false,
        });
        setTaskId(task._id);
        setIsModalOpen(true);
    };

    return (
        
        <div className=" size-full animate-fade-in ">
            <div className="scrollbar-none overflow-x-visible overscroll-y-none">
                <div style={{position:"relative"}} className="scrollbar-none  h-full overflow-y-hidden    rounded-[0.75rem] border-[1px] border-[#282F35] swipe-dialog-scroll-descendant">
                    <div className="scrollbar-none   flex h-auto flex-col  overflow-x-hidden overflow-y-hidden">
                        <div className="group flex items-center " >
                                <div className="group rounded-xl m-[1px] px-[5.5px] pt-[7.5px] pb-[0.79rem] z-10 inline-flex flex-col justify-around gap-1 w-[calc(100%-2px)] transition-all" style={{
                                    background:"#101214"
                                }}>
                                    <div className="z-10 flex items-center rounded-lg  text-white py-2 pr-3 pl-5" style={{
                                        backgroundColor: "#282F35",
                                    }} >
                                        <span className="mr-auto flex items-center px-1 pr-3 font-semibold">
                                            {title} 
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsVisible(!isVisible)}
                                            className="text-gray-400 hover:text-white hover:bg-slate-700"
                                        >
                                            <ChevronDown className={`w-5 h-5 transition-transform  ${isVisible ? '' : 'rotate-180'}`} />
                                        </Button>
                                    </div>
                                    {isVisible && (
                                    <div className="rounded-lg p-4 space-y-4" >
                                        {isLoading && <LoadingSpinner/>}
                                        {tasks.map((task,index) => (
                                            <div key={index} className="flex items-center justify-between   hover:bg-slate-800/30 p-2 rounded-lg">
                                                <div className="flex items-center gap-3 ">
                                                <button
                                                    size="icon"
                                                    className="h-6 w-6 rounded border bg-slate-900"
                                                    style={{
                                                        color: "white",        // Text color
                                                        borderColor: "#13F287",   // Border color
                                                        borderWidth: "2px",    // Ensures border is thick enough to be visible
                                                    }}
                                                    onClick={() => toggleCompletion(task)}
                                                    >
                                                    {task.completed && <Check className="w-5 h-5 text-center text-white" />}
                                                    </button>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className={task.completed ? "line-through text-gray-500" : ""}>
                                                                {task.title}
                                                            </span>
                                                            {task.date && (
                                                                <span className="text-sm text-gray-500">
                                                                    {task.startTime} {"| "}
                                                                    {(() => {
                                                                        const date = new Date(task.date);
                                                                        const day = date.getDate();
                                                                        const month = date.toLocaleString('default', { month: 'short' });
                                                                        const suffix = (day) => {
                                                                            if (day >= 11 && day <= 13) return 'th';
                                                                            switch (day % 10) {
                                                                                case 1: return 'st';
                                                                                case 2: return 'nd';
                                                                                case 3: return 'rd';
                                                                                default: return 'th';
                                                                            }
                                                                        };
                                                                        return `${month}${day}${suffix(day)}`;
                                                                    })()}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {task.amount && (
                                                            <span className="text-sm text-[#C4A962]">
                                                                {task.amount} {money}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="text-gray-400 hover:text-white hover:bg-slate-700"
                                                        onClick={() => handleOpen(task)}
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="text-red-500 hover:bg-slate-700"
                                                        onClick={() => onDeleteTaskToggle(task)}
                                                    >
                                                        <Trash className="w-4 h-4" />
                                                    </Button>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                    )}
                                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                                <DialogContent className="bg-[#1A1F24] text-white border-gray-800">
                                    <DialogHeader>
                                        <DialogTitle>Update Payment</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-2">
                                        <div>
                                            <Label>Title</Label>
                                            <Input
                                                placeholder="Payment Name"
                                                className="bg-[#0B1015] border-gray-800"
                                                value={newTaskData.title || ""}
                                                onChange={(e) => handleTaskInputChange("title", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label className="pt-2">Amount To Pay</Label>
                                            <Input
                                                type="number"
                                                placeholder="EX: 4000DA"
                                                className="bg-[#0B1015] border-gray-800"
                                                value={newTaskData.amount}
                                                onChange={(e) => handleTaskInputChange("amount", Number(e.target.value) || 0)}
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <Label>Due Date</Label>
                                                <div className="relative">
                                                    <Input
                                                        type="text"
                                                        className="bg-[#0B1015] border-gray-800 pr-10 w-full"
                                                        value={newTaskData.date || ""}
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
                                                {showDatePicker && (
                                                    <div className="mt-2 flex justify-end">
                                                        <Calendar
                                                            mode="single"
                                                            selected={newTaskData.date ? new Date(newTaskData.date) : undefined}
                                                            onSelect={(date) => {
                                                                if (date) {
                                                                    const adjustedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
                                                                    handleTaskInputChange("date", adjustedDate)
                                                                } else {
                                                                    handleTaskInputChange("date", '')
                                                                }
                                                                setShowDatePicker(false)
                                                            }}
                                                            className="rounded-md border border-gray-800 w-fit bg-black"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <Button
                                            className="w-full bg-[#C4A962] hover:bg-[#B39952] text-black"
                                            onClick={handleUpdateTask}
                                            disabled={updatePaymentMutation.isLoading}
                                        >
                                            {updatePaymentMutation.isLoading ? "Updating..." : "Update Payment"}
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

    )
}


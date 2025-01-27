/* eslint-disable react/prop-types */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown, MoreHorizontal, Trash} from 'lucide-react'
import { jwtDecode } from "jwt-decode"
import { useSetTaskToComplete } from "@/hooks/tasks/useSetTaskToComplete"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import Spinner from "../Spinner"
import { useDeleteTask } from "@/hooks/tasks/useDeleteTask"
import { useLocation } from "react-router-dom"


export default function DentalAssistant({tasks = [], isLoading}) {
     const location = useLocation(); // Get the current location
              const isActive = location.pathname.includes(`/channels`); // Check if the current pa
    const userInfo = jwtDecode(localStorage.getItem('token'))
    const [isVisible, setIsVisible] = useState(true)

    const completedTask = useSetTaskToComplete();
    const toggleCompletion = (task) => {
        const newStatus = !task.completed;
        completedTask.mutate({ userId: userInfo.userId, id: task._id, completed: newStatus });
    };
    const deleteTask = useDeleteTask();
    const onDeleteTaskToggle = (task) =>{
        deleteTask.mutate({ userId: userInfo.userId, id: task._id });
    }


    return (
        <div className="relative size-full animate-fade-in">
            <div className="scrollbar-none overflow-x-visible  overscroll-y-none h-full w-full">
            <div className={`scrollbar-none relative h-full overflow-y-scroll overscroll-y-none sm:max-h-none bg-next-midnight rounded-lg px-0 pb-4 swipe-dialog-scroll-descendant ${isActive? " sm:px-0":" sm:px-5"}`}>
            <div className={`scrollbar-none mx-2 mt-1 flex h-auto flex-col overflow-hidden  ${isActive ? "w-full":"w-[400px]"} `}>
                        <div className="group relative flex w-full items-center">
                        <div className="group relative w-full rounded-xl bg-next-d mt-2 mb-2 inline-flex flex-col justify-around overflow-visible " style={{border:"1px solid gray"}}>
                        <div className="group rounded-xl m-[1px] px-[5.5px] pt-[7.5px] pb-[0.79rem] z-10 inline-flex flex-col justify-around gap-1 w-[calc(100%-2px)] transition-all" style={{
                                    background:"#0E1C26"
                                }}>
                                    <div className="z-10 flex items-center rounded-xl  text-white py-2 pr-3 pl-5" style={{
                                        backgroundColor: "rgb(6, 14, 21, 1)",
                                    }} >
                                        <span className="mr-auto flex items-center px-1 pr-3 font-semibold">
                                            Your Dental Assistant
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsVisible(!isVisible)}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            <ChevronDown className={`w-5 h-5 transition-transform ${isVisible ? '' : 'rotate-180'}`} />
                                        </Button>
                                    </div>
                                    {isVisible && (
                                    <div className="rounded-lg p-4 space-y-4" > 
                                        {isLoading && <Spinner size="large"/>}
                                        {tasks.map((task,index) => (
                                            <div key={index} className="flex items-center justify-between group">
                                                <div className="flex items-center gap-3">
                                                <button
                                                    size="icon"
                                                    className="h-6 w-6 rounded border bg-slate-900"
                                                    style={{
                                                        color: "white",        // Text color
                                                        borderColor: "gold",   // Border color
                                                        borderWidth: "2px",    // Ensures border is thick enough to be visible
                                                    }}
                                                    onClick={() => toggleCompletion(task)}
                                                    >
                                                    {task.completed && <Check className="w-5 h-6 text-center text-white" />}
                                                    </button>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className={task.completed ? "line-through text-gray-500" : ""}>
                                                                {task.title}
                                                            </span>
                                                            {task.startDate && (
                                                                <span className="text-sm text-gray-500">
                                                                    {task.startTime} {"| "}
                                                                    {(() => {
                                                                        const date = new Date(task.startDate);
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
                                                        {task.repeatDays && (
                                                            <span className="text-sm text-[#C4A962]">
                                                                {task.repeatDays.length === 7 ? (
                                                                    `Daily at ${task.startTime}`
                                                                ) : (
                                                                    task.repeatDays.map((day, index) => {
                                                                        const dayNames = {
                                                                            'su': 'Sunday',
                                                                            'mo': 'Monday',
                                                                            'tu': 'Tuesday',
                                                                            'we': 'Wednesday',
                                                                            'th': 'Thursday',
                                                                            'fr': 'Friday',
                                                                            'sa': 'Saturday',
                                                                        };
                                                                        return (
                                                                            <span key={index} >
                                                                                {dayNames[day]}{index < task.repeatDays.length - 1 ? ', ' : ''}
                                                                            </span>
                                                                        );
                                                                    })
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="opacity-0 group-hover:opacity-100"
                                                        >
                                                            <MoreHorizontal className="w-5 h-5" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent 
                                                        align="start" 
                                                        className="w-[160px] bg-[#1a2634]  border-[#2a3744]"
                                                    >
                                                        <DropdownMenuItem 
                                                            className="flex  gap-2 px-3 py-2 text-sm text-red-500 hover:bg-[#2a3744] cursor-pointer"
                                                            onClick={() => onDeleteTaskToggle(task)}
                                                            style={{
                                                                flexDirection:"row",
                                                                justifyContent:"start",
                                                                alignItems:"start"
                                                            }}
                                                        >
                                                            <Trash className="w-4 h-4" />
                                                            Delete Task
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        ))}
                                    </div>
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


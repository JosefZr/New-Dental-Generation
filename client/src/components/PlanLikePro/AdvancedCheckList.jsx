/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown, MoreHorizontal, Trash, Pencil, LucideCalendar } from 'lucide-react'
import { jwtDecode } from "jwt-decode"
import { useSetTaskToComplete } from "@/hooks/tasks/useSetTaskToComplete"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import * as SliderPrimitive from "@radix-ui/react-slider";
import { useDeleteTask } from "@/hooks/tasks/useDeleteTask"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { Calendar } from "../ui/calendar"
import { Switch } from "../ui/switch"
import { DAYS_OF_WEEK, REMINDER_TIMES } from "./TaskList"
import { useUpdateTask } from "@/hooks/tasks/useUpdateTask"
import { format } from "date-fns"
import { LoadingSpinner } from "../server/ServerSideBar"
import { useLocation } from "react-router-dom"

export default function dAdvancedCheckList({tasks = [], isLoading, title}) {
    const [todayTasks, setTodayTasks] = useState([]);
    const location = useLocation(); // Get the current location
    const isActive = location.pathname.includes('/channels');
    
   // Filter today's tasks inside useEffect
    useEffect(() => {
    if (isActive) {
      // Filter for today's tasks when in channel view
        if(title==="Advanced Check List"){
            const today = new Date().toISOString().split('T')[0];
            const todaysTasks = tasks.filter((task) => {
                if (!task.startDate) return false;
                const taskDate = new Date(task.startDate);
                if (isNaN(taskDate)) return false;
                return taskDate.toISOString().split('T')[0] === today;
            });
            setTodayTasks(todaysTasks);
        }
        else{
            const today = new Date().toISOString().split('T')[0];
            const todaysTasks = tasks.filter((task) => {
                if (!task.createdAt) return false;
                const taskDate = new Date(task.createdAt);
                if (isNaN(taskDate)) return false;
                return taskDate.toISOString().split('T')[0] === today;
            });
            setTodayTasks(todaysTasks);
        }
    } else {
      // Show all tasks when not in channel view
      setTodayTasks(tasks);
    }
  }, [tasks, isActive,title]);
    console.log(todayTasks)

    const userInfo = jwtDecode(localStorage.getItem('token'))
    const [isVisible, setIsVisible] = useState(true)
    const [isUpdateTask, setIsUpdateTask] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [sliderValue, setSliderValue] = useState([30]);
    const [showReminder, setShowReminder] = useState(false);
    const [selectedRepeatDays, setSelectedRepeatDays] = useState([]);
    const [showRepeat, setShowRepeat] = useState(false);
    const [taskId,setTaskId ]= useState("");
    const [newTaskData, setNewTaskData] = useState({
        title: "",
        description: "",
        startDate: "",
        startTime: "",
        duration: 30,
        hasCustomEnd: false,
        hasReminder: false,
        isRepeating: false,
        category: "General Tasks",
    });
    const handleTaskInputChange = (field, value) => {
        if (field === "startDate" && value instanceof Date) {
        const adjustedDate = new Date(value.getTime() - (value.getTimezoneOffset() * 60000));
        value = adjustedDate.toISOString().split('T')[0];
        }
        setNewTaskData((prev) => ({ ...prev, [field]: value }));
    };
    const handleRepeatDaySelection = (day) => {
        setSelectedRepeatDays((prevSelectedDays) => {
        if (prevSelectedDays.includes(day)) {
            return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
        } else {
            return [...prevSelectedDays, day];
        }
        });
    };
    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };
    const completedTask = useSetTaskToComplete();
    const toggleCompletion = (task) => {
        const newStatus = !task.completed;
        completedTask.mutate({ userId: userInfo.userId, id: task._id, completed: newStatus });
    };
    const deleteTask = useDeleteTask();
    const onDeleteTaskToggle = (task) =>{
        deleteTask.mutate({ userId: userInfo.userId, id: task._id });
    }
    const updateTask = useUpdateTask();

    const handleUpdateTask = () => {
        // Task and User ID to send to the backend
        const id = userInfo.userId
        const task = {
            ...newTaskData,
            duration: sliderValue[0],
            repeatDays: selectedRepeatDays,
        };
        
        // Remove 'hasCustomEnd' and 'hasReminder' if they are not needed
        const { hasCustomEnd, hasReminder, ...taskWithoutCustomEndAndReminder } = task;
        // Trigger the mutation
        console.log("Sending payload:", { id,taskId, task: taskWithoutCustomEndAndReminder });
        updateTask.mutate({ id, taskId, task:taskWithoutCustomEndAndReminder });
        
        // Resetting the form state
        setIsUpdateTask(false);
        setNewTaskData({
            title: '',
            description: '',
            startDate: '',
            startTime: '',
            duration: 30,
            hasCustomEnd: false,
            hasReminder: false,
            isRepeating: false,
            category: 'Advanced',
        });
        setSelectedRepeatDays([]);
        setShowDatePicker(false);
    };
    return (
        <div className="relative size-full animate-fade-in ">
            <div className="scrollbar-none overflow-x-visible  overscroll-y-none h-full w-full ">
                <div className={`scrollbar-none relative h-full overflow-y-scroll overscroll-y-none sm:max-h-none bg-next-midnight rounded-lg px-0 pb-4 swipe-dialog-scroll-descendant ${isActive? " sm:px-0":" sm:px-5"}`}>
                    <div className={`scrollbar-none mx-2 mt-1 flex h-auto flex-col overflow-hidden  ${isActive ? "w-full":"w-[400px]"} `}>
                        <div className="group relative flex w-full items-center rounded-lg" >
                            <div className="group relative w-full rounded-xl bg-next-d mt-2 mb-2 inline-flex flex-col justify-around overflow-visible " style={{border:"1px solid gray"}}>
                                <div className="group rounded-xl m-[1px] px-[5.5px] pt-[7.5px] pb-[0.79rem] z-10 inline-flex flex-col justify-around gap-1 w-[calc(100%-2px)] transition-all" style={{
                                    background:"#0E1C26"
                                }}>
                                    <div className="z-10 flex items-center rounded-xl  text-white py-2 pr-3 pl-5" style={{
                                        backgroundColor: "rgb(6, 14, 21, 1)",
                                    }} >
                                        <span className="mr-auto flex items-center px-1 pr-3 font-semibold">
                                            {title}
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
                                        {isLoading && <LoadingSpinner/>}
                                        {todayTasks.map((task,index) => (
                                            <div key={index} className="flex items-center justify-between group">
                                                <div className="flex items-center gap-3 ">
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
                                                            className=" gap-2 px-3 py-2 text-sm text-gray-200 hover:bg-[#2a3744] cursor-pointer"
                                                            onClick={() => {
                                                                setNewTaskData({
                                                                    title: task.title,
                                                                    description: task.description,
                                                                    startDate: format(new Date(task.startDate), 'MM/dd/yyyy'),
                                                                    startTime: task.startTime,
                                                                    duration: task.duration || 30,
                                                                    hasCustomEnd: task.hasCustomEnd || false,
                                                                    hasReminder: task.hasReminder || false, 
                                                                    isRepeating: task.repeatDays?.length > 0,
                                                                    category: task.category || "Advanced"
                                                                });
                                                                setIsUpdateTask(true);
                                                                if (task.repeatDays) {
                                                                    setSelectedRepeatDays(task.repeatDays);
                                                                    setShowRepeat(true);
                                                                }
                                                                if (task.duration) {
                                                                    setSliderValue([task.duration]); // Set initial slider value
                                                                }
                                                                setTaskId(task._id);

                                                            }}
                                                            style={{
                                                                flexDirection:"row",
                                                                justifyContent:"start",
                                                                alignItems:"start"
                                                            }}
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                            Edit Task
                                                        </DropdownMenuItem>
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
                                    <Dialog open={isUpdateTask} onOpenChange={setIsUpdateTask}>
                                        <DialogContent className="bg-[#1A1F24] text-white border-gray-800">
                                        <DialogHeader>
                                            <DialogTitle>New Task</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-6">
                                            <Input
                                            placeholder="Task name"
                                            className="bg-[#0B1015] border-gray-800"
                                            value={newTaskData.title}
                                            onChange={(e) => handleTaskInputChange("title", e.target.value)}
                                            />
                                            <Textarea
                                            placeholder="Describe your task..."
                                            className="bg-[#0B1015] border-gray-800"
                                            value={newTaskData.description}
                                            onChange={(e) => handleTaskInputChange("description", e.target.value)}
                                            />
                                            <div className="space-y-4">
                                            <div>
                                                <Label>Start</Label>
                                                <div className="grid grid-cols-2 gap-2 mt-2">
                                                <div className="relative">
                                                    <Input
                                                    type="text"
                                                    className="bg-[#0B1015] border-gray-800 pr-10"
                                                    value={newTaskData.startDate}
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
                                                <Input
                                                    type="time"
                                                    className="bg-[#0B1015] border-gray-800"
                                                    value={newTaskData.startTime}
                                                    onChange={(e) => handleTaskInputChange("startTime", e.target.value)}
                                                />
                                                </div>
                                                {showDatePicker && (
                                                <div className="mt-2">
                                                    <Calendar
                                                    mode="single"
                                                    selected={newTaskData.startDate ? new Date(newTaskData.startDate) : undefined}
                                                    onSelect={(date) => {
                                                        if (date) {
                                                        // Adjust for timezone offset
                                                        const adjustedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));

                                                        handleTaskInputChange("startDate", adjustedDate);
                                                        //   console.log(new Date(adjustedDate).setMinutes(new Date(adjustedDate).getMinutes()+30))
                                                        } else {
                                                        handleTaskInputChange("startDate", '');
                                                        }
                                                        setShowDatePicker(false);
                                                    }}
                                                    className="rounded-md border border-gray-800 w-fit bg-black"
                                                    />
                                                </div>
                                                )}
                                            </div>
                                            <div>
                                                <Label>Duration</Label>
                                                <SliderPrimitive.Root
                                                value={sliderValue}
                                                max={120}
                                                step={5}
                                                onValueChange={(value) => {
                                                    setSliderValue(value);
                                                    handleTaskInputChange("duration", value[0]);
                                                }}
                                                className="fixed flex w-[90%] touch-none select-none items-center bg-black"
                                                >
                                                <SliderPrimitive.Track className=" h-2 w-full grow overflow-hidden rounded-full ">
                                                    <SliderPrimitive.Range className="absolute h-full bg-yellow-400" />
                                                </SliderPrimitive.Track>
                                                <SliderPrimitive.Thumb className=" block h-5 w-5 rounded-full border-2 border-primary bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
                                                </SliderPrimitive.Root>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>How many minutes are you available?</span>
                                                <span>{sliderValue[0]} min</span>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                <Label>Set Reminder</Label>
                                                <Switch
                                                    checked={showReminder}
                                                    onCheckedChange={(checked) => setShowReminder(checked)}
                                                />
                                                </div>
                                                {showReminder && (
                                                <div className="space-y-2">
                                                    <Label>Select Reminder Time</Label>
                                                    <select
                                                    className="bg-[#0B1015] border-gray-800 text-white p-2 rounded"
                                                    onChange={(e) =>
                                                        handleTaskInputChange("reminderTime", e.target.value)
                                                    }
                                                    >
                                                    {REMINDER_TIMES.map((time) => (
                                                        <option key={time.value} value={time.value}>
                                                        {time.label}
                                                        </option>
                                                    ))}
                                                    </select>
                                                </div>
                                                )}
                                                <div className="flex items-center justify-between">
                                                <Label>Repeat</Label>
                                                <Switch
                                                    checked={showRepeat}
                                                    onCheckedChange={(checked) => setShowRepeat(checked)}
                                                />
                                                </div>
                                                {showRepeat && (
                                                <div className="space-y-2">
                                                    <Label>Select Days to Repeat</Label>
                                                    <div className="flex gap-2">
                                                    {DAYS_OF_WEEK.map((day) => (
                                                        <Button
                                                        key={day.value}
                                                        size="sm"
                                                        className={`${
                                                            selectedRepeatDays.includes(day.value) ? "bg-yellow-400" : "bg-[#0B1015]"
                                                        } border-gray-800`}
                                                        onClick={() => handleRepeatDaySelection(day.value)}
                                                        >
                                                        {day.label}
                                                        </Button>
                                                    ))}
                                                    </div>
                                                </div>
                                                )}
                                            </div>
                                            </div>
                                            <Button
                                            className="w-full bg-[#C4A962] hover:bg-[#B39952] text-black"
                                            onClick={handleUpdateTask}
                                            >
                                            UPDATE TASK
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


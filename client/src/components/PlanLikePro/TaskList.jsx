import { useContext, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { LucideCalendar, LucidePlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import * as SliderPrimitive from "@radix-ui/react-slider";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserContext } from "@/context/UserContext";
import AdvancedCheckList from "./AdvancedCheckList";
import { jwtDecode } from "jwt-decode";
import { useCreateTask } from "@/hooks/tasks/useCreateTask";
import { useUserTasks } from "@/hooks/tasks/useGetUserTasks";

const Container = styled.div`
  overscroll-behavior-block: none;
  overscroll-behavior-x: none;
  scroll-behavior: auto;
  scroll-snap-stop: always;
  scroll-snap-align: start;
  scroll-snap-type: x mandatory;
`;

export const DAYS_OF_WEEK = [
  { value: "su", label: "Su" },
  { value: "mo", label: "Mo" },
  { value: "tu", label: "Tu" },
  { value: "we", label: "We" },
  { value: "th", label: "Th" },
  { value: "fr", label: "Fr" },
  { value: "sa", label: "Sa" },
];

export const REMINDER_TIMES = [
  { value: "at_time", label: "At time of task" },
  { value: "5_min", label: "5 minutes before" },
  { value: "10_min", label: "10 minutes before" },
  { value: "15_min", label: "15 minutes before" },
  { value: "30_min", label: "30 minutes before" },
  { value: "1_hour", label: "1 hour before" },
];

export default function TaskList() {

    const [sliderValue, setSliderValue] = useState([30]);
    const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
    const { setIsSidebarOpen } = useContext(UserContext);
    const [showReminder, setShowReminder] = useState(false);
    const [showRepeat, setShowRepeat] = useState(false);
    const [selectedRepeatDays, setSelectedRepeatDays] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [newTaskData, setNewTaskData] = useState({
        title: "",
        description: "",
        startDate: "",
        startTime: "",
        duration: 30,
        isRepeating: false,
        category: "Advanced",
    });
    const userInfo = jwtDecode(localStorage.getItem("token"));
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };
    const id = userInfo.userId;
    const { data: tasks, isLoading, isError, error } = useUserTasks({id, category:"Advanced"});
    const mutation = useCreateTask(); // Use the custom hook

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
        // console.log(id, newTaskData )
        mutation.mutate({ id, task:newTaskData });
        setNewTaskData({
            title: '',
            description: '',
            startDate: '',
            startTime: '',
            duration: 30,
            category: 'Advanced',
        });
        }
    };
    const HandleAddQuickTaskTask = (e)=>{
        e.preventDefault();
        if (!newTaskData.title ) {
            alert("Title.");
            return;
        }
        const task = {
            ...newTaskData,
            duration: sliderValue[0],
            repeatDays: selectedRepeatDays,
        }
        const id = userInfo.userId
        mutation.mutate({ id, task  });
        // console.log(newTask)
        setNewTaskData({
            title: '',
            description: '',
            startDate: '',
            startTime: '',
            duration: 30,
            category: 'Advanced',
        });
    }

    const handleTaskInputChange = (field, value) => {
        if (field === "startDate" && value instanceof Date) {
        const adjustedDate = new Date(value.getTime() - (value.getTimezoneOffset() * 60000));
        value = adjustedDate.toISOString().split('T')[0];
        }
        setNewTaskData((prev) => ({ ...prev, [field]: value }));
    };
    const isTaskValid = () => {
        if (!newTaskData.title || !newTaskData.startDate || !newTaskData.startTime) {
            alert("Title, date, and time are required.");
            return false;
            }
            return true;
    };
    const HandleAddTask = () => {
        if (!isTaskValid()) return;
          // Task and User ID to send to the backend
        const id = userInfo.userId
        const task = {
            ...newTaskData,
            duration: sliderValue[0],
            repeatDays: selectedRepeatDays,
        };
            console.log(task);
            // Remove 'hasCustomEnd' and 'hasReminder' if they are not needed
          // Trigger the mutation
            console.log("Sending payload:", { id, task });

            mutation.mutate({ id, task });
            
            // Resetting the form state
            setIsNewTaskOpen(false);
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
                    className="w-full bg-[#1A1F24] border-gray-800 pr-12 text-white placeholder:text-gray-500 "
                    placeholder="Describe your task"
                    value={newTaskData.title}
                    onChange={(e) => handleTaskInputChange("title", e.target.value)}
                    onKeyDown={handleQuickAdd}
                    />
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        onClick={() => setIsNewTaskOpen(true)}
                        >
                        <LucideCalendar className="w-5 h-5" />
                    </Button>
                    
                </div>
                <Button 
                    className=" rounded-md bg-my-gold hover:bg-my-gold hover:opacity-90" 
                    onClick={HandleAddQuickTaskTask}
                >
                        <LucidePlus className="h-[24px] w-[24px]" />
                    </Button>
            </div>
            <button
            className="absolute top-2 left-2 cursor-pointer z-50 p-2 hover:bg-gray-800 rounded-md transition-colors"
            onClick={toggleSidebar}
            >
            <GiHamburgerMenu className="md:hidden text-2xl text-white" />
            </button>
            <AdvancedCheckList tasks={tasks || []} isLoading={isLoading} />
            </div>
        <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
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
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    onValueChange={(value) => setSliderValue(value)}
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
                onClick={HandleAddTask}
                >
                ADD TASK
                </Button>
            </div>
            </DialogContent>
        </Dialog>
        </Container>
    );
}


import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react"
import { IoCalendarNumber } from "react-icons/io5"
import { createViewWeek, createViewMonthGrid, createViewDay } from "@schedule-x/calendar"
import "@schedule-x/theme-shadcn/dist/index.css";
import { useUserTasks } from "@/hooks/tasks/useGetUserTasks";
import { useUserSimpleTasks } from "@/hooks/tasks/useGetSimpleTasks";
import { jwtDecode } from "jwt-decode";
import { useContext, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DAYS_OF_WEEK, REMINDER_TIMES } from "./SmallTaskList";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateTask } from "@/hooks/tasks/useCreateTask";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LucideCalendar} from "lucide-react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Calendar } from "@/components/ui/calendar";
import DynamicScheduler from "./DynamicScheduler";
import { UserContext } from "@/context/UserContext";

export default function Schedular() {
  const userInfo = jwtDecode(localStorage.getItem("token"));
  const [selectedRepeatDays, setSelectedRepeatDays] = useState([]);
  const {isNewTaskOpen, setIsNewTaskOpen} = useContext(UserContext);
  const [showReminder, setShowReminder] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  const [newTaskData, setNewTaskData] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    duration: 30,
    isRepeating: false,
    category: "",
});
const [sliderValue, setSliderValue] = useState([30]);

const [showDatePicker, setShowDatePicker] = useState(false);

  const id = userInfo.userId;

  const { data: advanced, isLoading: isGettingAdvanced } = useUserTasks({ id, category: "Advanced" });
  const { data: simple, isLoading: isGettingSimple } = useUserSimpleTasks({ id, category: "Simple" });
  const mutation = useCreateTask(); // Use the custom hook

  // Transform tasks into calendar events
  const events = useMemo(() => {
    const allTasks = [...(advanced || []), ...(simple || [])];
    
    return allTasks.filter(task => {
      // For advanced tasks, check startDate and startTime
      // For simple tasks, use createdAt if startDate is null
      return task && (
        (task.startDate && task.startTime) || 
        (task.category === "Simple" && task.createdAt)
      );
    }).map((task) => {
      // Determine start date and time
      const startDate = task.startDate 
        ? task.startDate.split('T')[0] 
        : new Date(task.createdAt).toISOString().split('T')[0];
      
      const startTime = task.startTime || '09:00'; // Default time if not specified
      
      // Default duration to 1 hour if not specified
      const duration = task.duration || 60; 
      
      // Parse start date and time
      const startDateTime = new Date(`${startDate}T${startTime}`);
      
      // Calculate end time by adding duration in minutes
      const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

      return {
        id: task._id,
        title: task.title || 'Untitled Task',
        start: startDateTime.toISOString().slice(0, 16).replace('T', ' '),
        end: endDateTime.toISOString().slice(0, 16).replace('T', ' '),
        description: task.description || ''
      };
    });
  }, [advanced, simple]);

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
    events: events,
    selectedDate: new Date().toISOString().split('T')[0],
  });

  calendar.setTheme('dark');
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
  // Loading state
  if (isGettingAdvanced || isGettingSimple) {
    return <div>Loading tasks...</div>;
  }
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
        category: "Advanced",
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
            category: '',
        });
        setSelectedRepeatDays([]);
        setShowDatePicker(false);
    };
  return (
    <div className="h-full w-full rounded-xl bg-next-midnight text-white flex flex-col">
    <div className="overflow-auto ">
    <DynamicScheduler events={events} />
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
    </div>
  );
}
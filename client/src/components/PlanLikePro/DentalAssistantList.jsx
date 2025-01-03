
import { Button } from "@/components/ui/button";

import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import { useCreateTask } from "@/hooks/tasks/useCreateTask";
import DentalAssistant from "./DentalAssistant";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/Select";
import { useGetAllInventory } from "@/hooks/inventory/useGetAllInventory";
import { useState } from "react";
import { LucidePlus } from "lucide-react";
import { useUserInventoryTasks } from "@/hooks/tasks/useUserInventoryTasks";
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
export default function DentalAssistantList() {
    const [newTaskData, setNewTaskData] = useState({
        title: "",
        category: "Assistant",
    });
    const { data: inventorys=[] , isLoading:isLoadingInventroy, isError:isInventoryError, error:inventoryError } = useGetAllInventory()
    console.log(inventorys)
    const userInfo = jwtDecode(localStorage.getItem("token"));
    const id = userInfo.userId;
    const { data: tasks, isLoading, isError, error } = useUserInventoryTasks({id, category:"Assistant"});
    const mutation = useCreateTask(); // Use the custom hook
    const handleTaskInputChange = (field, value) => {
        setNewTaskData((prev) => ({ ...prev, [field]: value }));
    };
        const handleCreateTask = () => {
        // Ensure required fields are filled
        if (!newTaskData.title.trim()) {
            alert("Please provide a task title.");
            return;
        }
        // console.log(id,newTaskData )
        setNewTaskData([
            ...tasks,
            {
            title: newTaskData.title,
            completed: false,
            category: "Assistant",
            },
        ]);
            console.log(id, newTaskData )
            mutation.mutate({ id, task:newTaskData });
        setNewTaskData({
            title: "",
            category: "Assistant",
        });
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
        <div className="w-full max-w-md px-5 z-10 pt-2 flex flex-row justify-center items-center gap-2">
                <div className="relative w-full ">
                    
                    <Select
                        onValueChange={(value) => handleTaskInputChange("title", value)}
                        value={newTaskData.title}
                    >
                        <SelectTrigger className="w-full bg-[#1A1F24] border-slate-800 h-10 text-center">
                            <SelectValue placeholder="Select a Dental Inventory" />
                        </SelectTrigger>
                        <SelectContent
                            className="bg-[#1A1F24] border-slate-800 text-white"
                        >
                            <SelectGroup>
                            <SelectLabel>Dental Inventory</SelectLabel>
                            {isLoadingInventroy ? (
                                <SelectItem disabled>Loading...</SelectItem>
                            ) : inventorys.length === 0 ? (
                                <SelectItem disabled>No inventory available</SelectItem>
                            ) : (
                                inventorys.map((inventory, index) => (
                                <SelectItem key={index} value={inventory.name}>
                                    {inventory.name}
                                </SelectItem>
                                ))
                            )}
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                </div>
                <Button 
                    className=" rounded-md bg-my-gold hover:bg-my-gold hover:opacity-90" 
                    onClick={handleCreateTask}
                >
                    <LucidePlus className="h-[24px] w-[24px]" />
                </Button>
            </div>
            <DentalAssistant  tasks={tasks} isLoading={isLoading} />
        </div>
        </Container>
    );
}


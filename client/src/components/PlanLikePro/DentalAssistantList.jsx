import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styled from "styled-components";
import { useCreateTask } from "@/hooks/tasks/useCreateTask";
import DentalAssistant from "./DentalAssistant";
import { useGetAllInventory } from "@/hooks/inventory/useGetAllInventory";
import { LucidePlus } from "lucide-react";
import { useUserInventoryTasks } from "@/hooks/tasks/useUserInventoryTasks";
import { useLocation } from "react-router-dom";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import useGetSubscriptionStatus from "@/hooks/limitation/useGetSubscriptionStatus";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";

const Container = styled.div`
  overscroll-behavior-block: none;
  overscroll-behavior-x: none;
  scroll-behavior: auto;
  scroll-snap-stop: always;
  scroll-snap-align: start;
  scroll-snap-type: x mandatory;
`;

export default function DentalAssistantList() {
    const location = useLocation();
    const {onOpen} = useModal()
    const status = useGetSubscriptionStatus()
    
    const isActive = location.pathname.includes('/channels');
    const [isCustomInput, setIsCustomInput] = useState(false);
    const [newTaskData, setNewTaskData] = useState({
        title: "",
        category: "Assistant",
    });

    const { data: inventorys = [], isLoading: isLoadingInventory } = useGetAllInventory();
    const userInfo = useAuthUser();
    const id = userInfo.userId;
    const { data: tasks, isLoading } = useUserInventoryTasks({ id, category: "Assistant" });
    const mutation = useCreateTask();

    const handleTaskInputChange = (value) => {
        setNewTaskData((prev) => ({ ...prev, title: value }));
    };

    const handleCreateTask = () => {
        if (!newTaskData.title.trim()) {
            alert("Please provide a task title.");
            return;
        }
        if(status ==="off"){
            onOpen(MODAL_TYPE.LIMITATION_MODAL)
        }
        else{
            mutation.mutate({ 
                id, 
                task: {
                    ...newTaskData,
                    title: newTaskData.title.trim()
                } 
            });
        }
        

        setNewTaskData({
            title: "",
            category: "Assistant",
        });
        setIsCustomInput(false);
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
                <div className={` z-10  flex flex-row justify-center gap-2 p-1  rounded-lg border-[1px]  border-[#365169] border-solid  ${isActive ? "w-full":" w-[400px] max-sm:w-full"}`}>
                    <div className="relative w-full">
                        {isCustomInput ? (
                            <Input
                                type="text"
                                placeholder="Enter custom item"
                                value={newTaskData.title}
                                onChange={(e) => handleTaskInputChange(e.target.value)}
                                className="w-full h-10 text-white px-3"
                            />
                        ) : (
                            <select
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "custom") {
                                        setIsCustomInput(true);
                                        setNewTaskData((prev) => ({ ...prev, title: "" }));
                                    } else {
                                        handleTaskInputChange(value);
                                    }
                                }}
                                value={newTaskData.title}
                                className={`w-full bg-[#0B1015] border-none h-full cursor-pointer ${isActive && "bg-my-Modal-back"} h-10 text-white px-3`}
                            >
                                <option value="" disabled>
                                    Select a Dental Inventory
                                </option>
                                {isLoadingInventory ? (
                                    <option disabled>Loading...</option>
                                ) : inventorys.length === 0 ? (
                                    <option disabled>No inventory available</option>
                                ) : (
                                    inventorys.map((inventory, index) => (
                                        <option key={index} value={inventory.name}>
                                            {inventory.name}
                                        </option>
                                    ))
                                )}
                                <option value="custom">+ Add Custom Item</option>
                            </select>
                        )}
                        {isCustomInput && (
                            <Button 
                                variant="ghost" 
                                size="sm"
                                className="absolute right-0 top-0 text-gray-400 hover:text-white h-10"
                                onClick={() => setIsCustomInput(false)}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                    <button 
                        className="rounded-md bg-gradient-to-r from-my-from to-my-to hover:bg-my-gold hover:opacity-90 text-center flex justify-center items-center h-14 w-14" 
                        onClick={handleCreateTask}
                    >
                        <LucidePlus className=" text-black " />
                    </button>
                </div>
                <DentalAssistant tasks={tasks} isLoading={isLoading} />
            </div>
        </Container>
    );
}

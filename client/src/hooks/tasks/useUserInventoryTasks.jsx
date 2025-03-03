import { useQuery } from "react-query";

const fetchUserTasks = async (id,category) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/tasks/getInventory`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, category }),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }
    const data = await response.json();
    return data.tasks;
};

export const useUserInventoryTasks = ({id,category}) => {
    return useQuery(["userInventroyTasks", id], () => fetchUserTasks(id,category), {
        enabled: !!id, // Fetch only when userId is provided
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });
};

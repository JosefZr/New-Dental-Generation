import { useQuery } from "react-query";

const fetchUserTasks = async (id,category) => {
    const response = await fetch(`http://localhost:3000/api/v1/tasks/get`,{
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

export const useUserTasks = ({id,category}) => {
    return useQuery(["userTasks", id], () => fetchUserTasks(id,category), {
        enabled: !!id, // Fetch only when userId is provided
        staleTime: 0, // Reduce stale time
    });
};

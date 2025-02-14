import { useQuery } from "react-query";

const fetchUserSimpleTasks = async (id,category) => {
    const response = await fetch(`http://localhost:3000/api/v1/tasks/getAllSimple`,{
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

export const useUserSimpleTasks = ({id,category}) => {
    return useQuery(["userSimpleTasks", id], () => fetchUserSimpleTasks(id,category), {
        enabled: !!id, // Fetch only when userId is provided
        staleTime: 0, // Reduce stale time
    });
};


import { useQuery } from "react-query";

const fetchUserTasks = async () => {
    const response = await fetch(`http://localhost:3000/api/v1/job/get`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }
    const data = await response.json();
    return data.data;
};

export const useGetAllJobs = () => {
    return useQuery(["job"], () => fetchUserTasks(), {
        staleTime: 0, // Reduce stale time
    });
};

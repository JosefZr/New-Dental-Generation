
import { useQuery } from "react-query";

const fetchUserSimpleTasks = async (userId) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/istighfar/get`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch prayer");
    }
    const data = await response.json();
    console.log(data)
    return data.data;
};

export const useGetPrayers = ({userId}) => {
    return useQuery(["prayer", userId], () => fetchUserSimpleTasks(userId), {
        enabled: !!userId, // Fetch only when userId is provided
        staleTime: 0, // Reduce stale time
    });
};

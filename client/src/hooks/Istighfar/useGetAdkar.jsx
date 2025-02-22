import { useQuery } from "react-query";

const fetchUserSimpleTasks = async (userId) => {
    const response = await fetch(`http://localhost:3000/api/v1/istighfar/dikr`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch adkar");
    }
    const data = await response.json();
    return data.data;
};

export const useGetAdkar = ({userId}) => {
    return useQuery(["adkar", userId], () => fetchUserSimpleTasks(userId), {
        enabled: !!userId, // Fetch only when userId is provided
        staleTime: 0, // Reduce stale time
    });
};

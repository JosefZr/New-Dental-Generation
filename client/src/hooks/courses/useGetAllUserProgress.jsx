import { useQuery } from "react-query";

const getAllUserProgress = async (userId) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/student/progression/getAll`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }) // Fixed: Need to stringify the body

    });
    if (!response.ok) {
        throw new Error("Failed to fetch inventory");
    }
    const {data} = await response.json();
    console.log("API Response:", data);
    return data; // Return the data array from the response
};

export const useGetAllUserProgress = (userId) => {
    return useQuery(["userProgress", userId], () => getAllUserProgress(userId), {
        enabled: !!userId,
        // Remove staleTime or set to 0 for immediate updates
        staleTime: 0,

    });
};

import { useQuery } from "react-query";

const getAllUserProgress = async (userId) => {
    const response = await fetch(`http://localhost:3000/api/v1/student/progression/getAll`,{
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
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
        enabled: !!userId, // Only run query if userId exists

    });
};

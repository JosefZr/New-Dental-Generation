import { useQuery } from "react-query";

const getAllCourses = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/student/course/get`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch courses");
    }
    const { data } = await response.json();
    return data;
};

export const useGetAllCourses = (options = {}) => {
    return useQuery(
        ["courses"], // Query key
        () => getAllCourses(), // Query function
        {
            staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
            ...options, // Spread any additional options passed to the hook
        }
    );
};
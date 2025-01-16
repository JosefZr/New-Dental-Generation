import { useQuery } from "react-query";

const getAllCourses = async () => {
    const response = await fetch(`http://localhost:3000/api/v1/student/course/get`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch inventory");
    }
    const {data} = await response.json();
    console.log(data)
    return data;
};

export const useGetAllCourses = () => {
    return useQuery(["courses"], () => getAllCourses(), {
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });
};


import axiosInstance from "@/api/axiosInstance";
import { useQuery } from "react-query";

const getAllUserProgress = async (userId, courseId) => {
    const { data } = await axiosInstance.post(`/api/v1/student/progression/get`,{ userId, courseId })
    console.log("API Response:", data);
    return data; // Return the data array from the response
};

export const useGetStudentCourseProgressDetails = (userId,courseId) => {
    return useQuery(["userProgress", userId], () => getAllUserProgress(userId,courseId), {
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
        enabled: !!userId, // Only run query if userId exists

    });
};

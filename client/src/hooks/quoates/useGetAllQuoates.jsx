import { useQuery } from "react-query";

const getAllQuoates = async () => {
    const response = await fetch(`http://localhost:3000/api/v1/quoate/getAll`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch quoates");
    }
    const {data} = await response.json();
    console.log(data)
    return data;
};

export const useGetAllQuoates = () => {
    return useQuery(["quoate"], () => getAllQuoates(), {
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });
};

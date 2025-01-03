import { useQuery } from "react-query";

const getAllInventory = async () => {
    const response = await fetch(`http://localhost:3000/api/v1/inventory/getAll`,{
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

export const useGetAllInventory = () => {
    return useQuery(["inventory"], () => getAllInventory(), {
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });
};

import { useQuery } from "react-query";

const fetchUserEarnings = async (id) => {
    console.log("Fetching earnings for ID:", id);

    const response = await fetch(`http://localhost:3000/api/v1/payment/managment/getEarnings`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });

    if (!response.ok) {
        console.error("Fetch failed with status:", response.status);
        throw new Error("Failed to fetch tasks");
    }

    const data = await response.json();
    return data.earnings;
};


export const useUserEarnings = ({id}) => {
    return useQuery(["userEarnings", id], () => fetchUserEarnings(id), {
        enabled: !!id, // Fetch only when userId is provided
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });
};

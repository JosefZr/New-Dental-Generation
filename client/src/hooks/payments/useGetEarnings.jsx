import { useQuery } from "react-query";

const fetchUserEarnings = async (id, type) => {
    console.log("Fetching earnings for ID:", id, "and type:", type);

    const response = await fetch(`http://localhost:3000/api/v1/payment/managment/get`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, type }),
    });

    if (!response.ok) {
        console.error("Fetch failed with status:", response.status);
        throw new Error("Failed to fetch tasks");
    }

    const data = await response.json();
    console.log("Fetched earnings data:", data);
    return data.earnings;
};


export const useUserEarnings = ({id,type}) => {
    return useQuery(["userPayments", id], () => fetchUserEarnings(id,type), {
        enabled: !!id, // Fetch only when userId is provided
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });
};

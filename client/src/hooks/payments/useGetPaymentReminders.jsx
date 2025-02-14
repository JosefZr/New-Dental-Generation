import { useQuery } from "react-query";

const fetchUserSimpleTasks = async (id,type) => {
    console.log(id,type)
    const response = await fetch(`http://localhost:3000/api/v1/payment/managment/get`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, type }),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }
    const data = await response.json();
    console.log(data.payments)
    return data.payments;
};

export const useGetPaymentReminders = ({id,type}) => {
    return useQuery(["userPayments", id], () => fetchUserSimpleTasks(id,type), {
        enabled: !!id, // Fetch only when userId is provided
        staleTime: 0, // Reduce stale time
    });
};

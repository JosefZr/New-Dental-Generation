
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useAddSubscription = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({userId,days }) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/subscription`, {
                method: 'PUT', // Correct method
                headers: {
                    Authorization:
                        localStorage.getItem("token"),
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({userId,days }),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log('subscription added successfully successfully:', data);
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(['user'],data?.data?._id); // Try invalidating
            toast.success('subscription added successfully successfully!');
        },
        onError: (error) => {
            console.log( error);
            toast.error('Failed to add journey'); // Optional error notification
        },
    })
}
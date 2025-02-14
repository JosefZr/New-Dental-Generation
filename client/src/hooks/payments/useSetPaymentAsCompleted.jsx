import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useSetPaymentAsCompleted=()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId, id,completed }) => {
            const response = await fetch('http://localhost:3000/api/v1/payment/managment/check', {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId, id,completed }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch payemnt');
            }
    
            return response.json();
        },
        onSuccess: (data) => {
            console.log('payemnt checked successfully:', data);
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(["userPayments"]);
            toast.success('payemnt checked successfully!'); // Optional success notification
        },
        onError: (error) => {
            console.log( error);
            toast.error('Failed to check payemnt'); // Optional error notification
        },
    })
}
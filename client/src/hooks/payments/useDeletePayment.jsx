
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useDeletePayment = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId, id }) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/payment/managment/delete`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId, id }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch payment');
            }
    
            return response.json();
        },
        onSuccess: (data) => {
            console.log('payment deleted successfully:', data);
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(["userPayments",data.payment.userId]);

            toast.success('payment deleted successfully!'); // Optional success notification
        },
        onError: (error) => {
            console.log( error);
            toast.error('Failed to delete payment'); // Optional error notification
        },
    })
}
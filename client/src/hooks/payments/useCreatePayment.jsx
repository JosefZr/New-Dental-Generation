import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";

export const useCreatePayment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, payment }) => {
        const response = await fetch('http://localhost:3000/api/v1/payment/managment/create', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, payment }),
        });

        if (!response.ok) {
            throw new Error('Failed to create payment');
        }

        return response.json();
        },
        onSuccess: (data) => {
        console.log('payment created successfully:', data);
        // Invalidate queries related to user tasks to refresh the data
        queryClient.invalidateQueries(["userPayments"]);
        queryClient.invalidateQueries(["userEarnings"]);

        // queryClient.invalidateQueries(["userInventroyTasks"])
        toast.success('payment created successfully!'); // Optional success notification
        },
        onError: (error) => {
        console.error('Error creating payment:', error.message);
        toast.error('Failed to create payment'); // Optional error notification
        },
    });
};

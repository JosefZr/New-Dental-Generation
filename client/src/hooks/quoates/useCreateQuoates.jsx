import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useCreateQuoate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ text }) => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/quoate/create`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text}),
        });

        if (!response.ok) {
            throw new Error('Failed to create quoate');
        }

        return response.json();
        },
        onSuccess: (data) => {
        console.log('quoate created successfully:', data);
        // Invalidate queries related to user tasks to refresh the data
        queryClient.invalidateQueries(["quoate"]);
        toast.success('quoate created successfully!'); // Optional success notification
        },
        onError: (error) => {
        console.error('Error creating quoate:', error.message);
        toast.error('Failed to create quoate'); // Optional error notification
        },
    });
};

import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useCreateInventory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ inventory }) => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/inventory/create`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inventory}),
        });

        if (!response.ok) {
            throw new Error('Failed to create inventory');
        }

        return response.json();
        },
        onSuccess: (data) => {
        console.log('inventory created successfully:', data);
        // Invalidate queries related to user tasks to refresh the data
        queryClient.invalidateQueries(["inventory"]);
        toast.success('inventory created successfully!'); // Optional success notification
        },
        onError: (error) => {
        console.error('Error creating inventory:', error.message);
        toast.error('Failed to create inventory'); // Optional error notification
        },
    });
};

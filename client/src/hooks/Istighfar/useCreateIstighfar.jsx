import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";

export const useCreateIstighfar = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, istighfar }) => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/istighfar/create`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, istighfar }),
        });

        if (!response.ok) {
            throw new Error('Failed to create Istighfar');
        }

        return response.json();
        },
        onSuccess: (data) => {
        console.log('Istighfar created successfully:', data);
        // Invalidate queries related to user tasks to refresh the data
        queryClient.invalidateQueries(["Istighfar"]);
        // queryClient.invalidateQueries(["userInventroyTasks"])
        toast.success('Istighfar created successfully!'); // Optional success notification
        },
        onError: (error) => {
        console.error('Error creating Istighfar:', error.message);
        toast.error('Failed to create Istighfar'); // Optional error notification
        },
    });
};

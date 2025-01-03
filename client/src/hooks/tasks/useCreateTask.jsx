import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, task }) => {
        const response = await fetch('http://localhost:3000/api/v1/tasks/create', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, task }),
        });

        if (!response.ok) {
            throw new Error('Failed to create task');
        }

        return response.json();
        },
        onSuccess: (data) => {
        console.log('Task created successfully:', data);
        // Invalidate queries related to user tasks to refresh the data
        queryClient.invalidateQueries(["userTasks"]);
        queryClient.invalidateQueries(["userInventroyTasks"])
        toast.success('Task created successfully!'); // Optional success notification
        },
        onError: (error) => {
        console.error('Error creating task:', error.message);
        toast.error('Failed to create task'); // Optional error notification
        },
    });
};

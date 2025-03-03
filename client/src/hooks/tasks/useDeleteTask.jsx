import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteTask = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId, id }) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/tasks/delete`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId, id }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch task');
            }
    
            return response.json();
        },
        onSuccess: (data) => {
            console.log('Task deleted successfully:', data);
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(["userTasks"]);
            queryClient.invalidateQueries(["userSimpleTasks"]);

            queryClient.invalidateQueries(["userInventroyTasks"])

            toast.success('Task deleted successfully!'); // Optional success notification
        },
        onError: (error) => {
            console.log( error);
            toast.error('Failed to delete task'); // Optional error notification
        },
    })
}
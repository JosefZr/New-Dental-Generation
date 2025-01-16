import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateTask = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id,taskId, task }) => {
            const response = await fetch('http://localhost:3000/api/v1/tasks/update', {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({id,taskId, task }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch task');
            }
    
            return response.json();
        },
        onSuccess: (data) => {
            console.log('Task checked successfully:', data);
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(["userTasks"]);
            queryClient.invalidateQueries(["userSimpleTasks"]);

            toast.success('Task checked successfully!'); // Optional success notification
        },
        onError: (error) => {
            console.log( error);
            toast.error('Failed to check task'); // Optional error notification
        },
    })
}
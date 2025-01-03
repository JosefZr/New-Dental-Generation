import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useIpdateInventory = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, name }) => {
            const response = await fetch('http://localhost:3000/api/v1/inventory/update', {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({id, name  }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to inventory task');
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log('inventory checked successfully:', data);
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(["inventory"]);
            toast.success('inventory checked successfully!'); // Optional success notification
        },
        onError: (error) => {
            console.log( error);
            toast.error('Failed to check inventory'); // Optional error notification
        },
    })
}
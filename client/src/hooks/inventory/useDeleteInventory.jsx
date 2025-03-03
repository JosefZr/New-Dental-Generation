

import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteInventory = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({id}) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/inventory/delete`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch inventory');
            }
    
            return response.json();
        },
        onSuccess: (data) => {
            console.log('inventory deleted successfully:', data);
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(["inventory"]);
            toast.success('inventory deleted successfully!'); // Optional success notification
        },
        onError: (error) => {
            console.log( error);
            toast.error('Failed to delete inventory'); // Optional error notification
        },
    })
}


import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteQuoate = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({id}) => {
            const response = await fetch('http://localhost:3000/api/v1/quoate/delete', {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch quoate');
            }
    
            return response.json();
        },
        onSuccess: (data) => {
            console.log('quoate deleted successfully:', data);
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(["quoate"]);
            toast.success('quoate deleted successfully!'); // Optional success notification
        },
        onError: (error) => {
            console.log( error);
            toast.error('Failed to delete quoate'); // Optional error notification
        },
    })
}
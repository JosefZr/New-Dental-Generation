import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteJourney = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId,id }) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/delete/journey`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId,id }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch journey');
            }
    
            return response.json();
        },
        onSuccess: (data) => {
            console.log('journey deleted successfully:', data);
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(['user'],data.userId); // Try invalidating
            toast.success('journey deleted successfully!'); // Optional success notification
        },
        onError: (error) => {
            console.log( error);
            toast.error('Failed to delete journey'); // Optional error notification
        },
    })
}
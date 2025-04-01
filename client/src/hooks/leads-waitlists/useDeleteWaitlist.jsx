

import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteWaitlist = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({id}) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/emails/waitlist/delete`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch waitlist');
            }
    
            return response.json();
        },
        onSuccess: (data) => {
            console.log('waitlist deleted successfully:', data);
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(["waitlist"]);
        },
        onError: (error) => {
            console.log( error);
            toast.error('Failed to delete waitlist'); // Optional error notification
        },
    })
}
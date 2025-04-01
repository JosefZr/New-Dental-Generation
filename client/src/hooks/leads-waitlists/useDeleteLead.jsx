import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteLead = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({id}) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/emails/lead/delete`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch lead');
            }
    
            return response.json();
        },
        onSuccess: (data) => {
            console.log('lead deleted successfully:', data);
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(["leads"]);
        },
        onError: (error) => {
            console.log( error);
            toast.error('Failed to delete lead'); // Optional error notification
        },
    })
}
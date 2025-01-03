
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteChannel = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id }) => {
            const response = await fetch(`http://localhost:3000/api/v1/channels/${id}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token").toString(),
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch channel');
            }
    
        },
        onSuccess: (data) => {
            console.log('channel deleted successfully:', data);
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(["channel"]);

            toast.success('channel deleted successfully!'); // Optional success notification
        },
        onError: (error) => {
            console.log( error);
            toast.error('Failed to delete channel'); // Optional error notification
        },
    })
}
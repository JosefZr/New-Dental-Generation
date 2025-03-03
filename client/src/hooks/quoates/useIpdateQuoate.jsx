import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useIpdateQuoate = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, text }) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/quoate/update`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({id, text  }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to quoate task');
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log('quoate checked successfully:', data);
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(["quoate"]);
            toast.success('quoate checked successfully!'); // Optional success notification
        },
        onError: (error) => {
            console.log( error);
            toast.error('Failed to check quoate'); // Optional error notification
        },
    })
}
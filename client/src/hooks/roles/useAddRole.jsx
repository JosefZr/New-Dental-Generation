
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useAddRole = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({userId, role }) => {
            const response = await fetch('http://localhost:3000/api/v1/roles/add', {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId, role  }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add role');
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log('role added successfully:', data);
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(["roles",data._id]);
            toast.success('role added successfully!'); // Optional success notification
        },
        onError: (error) => {
            console.log( error);
            toast.error('Failed to add role'); // Optional error notification
        },
    })
}
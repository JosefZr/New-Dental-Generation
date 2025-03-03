import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteRole = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({userId, role}) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/roles/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId, role}),
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete role');
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log('role removed successfully:', data);
            // Invalidate queries related to user roles to refresh the data
            queryClient.invalidateQueries(["roles", data.data._id]);
            toast.success('Role removed successfully!');
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to remove role');
        },
    });
};

import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useAddJourney = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({userId,content,images,chanTitle,chanId }) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/update/journey`, {
                method: 'PUT', // Correct method
                headers: {
                    Authorization:
                        localStorage.getItem("token"),
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({userId,content,images,chanTitle,chanId }),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log('journey added successfully successfully:', data);
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(['user'],); // Try invalidating
            toast.success('journey added successfully successfully!');
        },
        onError: (error) => {
            console.log( error);
            toast.error('Failed to add journey'); // Optional error notification
        },
    })
}
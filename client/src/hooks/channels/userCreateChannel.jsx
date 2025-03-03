import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";

export const useCreateChannel = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (value) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/channels/`, {
                method: "POST",
                headers: {
                    Authorization:
                        localStorage.getItem("token"),
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(value),
                });

        if (!response.ok) {
            throw new Error('Failed to create channel');
        }

        return response.json();
        },
        onSuccess: (data) => {
        console.log('channel created successfully:', data);
        // Invalidate queries related to user tasks to refresh the data
        queryClient.invalidateQueries(["channel"]);
        toast.success('channel created successfully!'); // Optional success notification
        },
        onError: (error) => {
        console.error('Error creating channel:', error.message);
        toast.error('Failed to create channel'); // Optional error notification
        },
    });
};

import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateChannel = ()=>{
    const queryClient = useQueryClient();
  const {channels, setChannels} = useContext(UserContext)

    return useMutation({
        mutationFn: async ({id,title }) => {
            console.log({id,title })
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/channels/${id}`, {
                method: 'PUT', // Correct method
                headers: {
                    Authorization:
                        localStorage.getItem("token"),
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch channel');
            }
    
            return response.json();
        },
        onSuccess: (data) => {
            console.log('channel checked successfully:', data);
            setChannels((prev) => {
                return prev.map((chan) => 
                  chan._id === data.data._id ? { ...chan, title: data.data.title } : chan
                );
              });
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(['channel']); // Try invalidating
            queryClient.refetchQueries(['channel']); // Force refetch
            toast.success('Channel updated successfully!');
        },
        onError: (error) => {
            console.log( error);
            toast.error('Failed to check channel'); // Optional error notification
        },
    })
}
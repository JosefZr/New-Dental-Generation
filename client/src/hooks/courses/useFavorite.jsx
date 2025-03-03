
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useFavorite = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({userId, courseId }) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/student/progression/fav`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId, courseId  }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add course to favorite');
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log('course added to favorite successfully:', data);
            // Invalidate queries related to user tasks to refresh the data
            queryClient.invalidateQueries(["userProgress"]);
            queryClient.invalidateQueries(["courses"]);

            toast.success('course added to favorite successfully!'); // Optional success notification
        },
        onError: (error) => {
            console.log( error);
            toast.error('You have to be registered to the course first'); // Optional error notification
        },
    })
}
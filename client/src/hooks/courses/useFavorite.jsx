import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useFavorite = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({ userId, courseId, lectureId }) => {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API}/api/v1/student/progression/fav`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, courseId, lectureId }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to update lecture favorite");
        }
        return response.json();
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["userProgress", data.userId]);
        queryClient.invalidateQueries(["courses"]);

        toast.success("Favorite status updated");
      },
      onError: () => {
        toast.error("Failed to update favorite");
      },
    });
  };
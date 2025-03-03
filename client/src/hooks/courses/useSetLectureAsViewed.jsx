import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";

export const useSetLectureAsViewed = () => {
        const queryClient = useQueryClient();
    
  return useMutation(
    async ({ userId, courseId, lectureId }) => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/student/progression/setLectureViewed`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId, courseId, lectureId   }),
      });
      return response;
    },
    {
      onSuccess: (data) => {
        if (data.success) {
          toast.success("Lecture marked as viewed.");
          queryClient.invalidateQueries(["userProgress"]);
          queryClient.invalidateQueries(["courses"]);
        } else {
          toast.error("Failed to update lecture progress.");
        }
      },
      onError: (error) => {
        console.error("Error updating lecture progress:", error);
        toast.error("An error occurred while updating progress.");
      },
    }
  );
};

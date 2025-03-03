import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, goal }) => {
      const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/settings/goal`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, goal }),
      });

      if (!response.ok) {
        throw new Error("Failed to update goal");
      }

      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["userSettings", data.updatedGoal.userId]); // Refresh updated settings
      toast.success("Goal updated successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update goal.");
    },
  });
};

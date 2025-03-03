import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useUpdatePrayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId,name }) => {
      const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/istighfar/toggle`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId,name }),
      });

      if (!response.ok) {
        throw new Error("Failed to update prayer");
      }

      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["prayer", data.data.userId]); // Refresh updated settings
      toast.success("prayer updated successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update currency.");
    },
  });
};

import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateCurrency = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, currency }) => {
      const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/settings/currency`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, currency }),
      });

      if (!response.ok) {
        throw new Error("Failed to update currency");
      }

      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["userSettings", data.updatedCurrency.userId]); // Refresh updated settings
      toast.success("currency updated successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update currency.");
    },
  });
};

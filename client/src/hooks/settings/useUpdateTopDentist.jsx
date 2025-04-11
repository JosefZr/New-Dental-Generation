import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateTopDentistSettings = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId }) => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/settings/topDentist`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            throw new Error("Failed to update top Dentsit");
        }

        return response.json();
        },
        onSuccess: (data) => {
        queryClient.invalidateQueries(["userSettings", data.updateTopDentist.userId]); // Refresh updated settings
        toast.success("topDentsit updated successfully!");
        },
        onError: (error) => {
        console.error(error);
        toast.error("Failed to update top Dentsit.");
        },
    });
};

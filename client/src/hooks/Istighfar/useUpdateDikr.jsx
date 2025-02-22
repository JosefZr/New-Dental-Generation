import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateDikr = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ( data ) => {
        const response = await fetch("http://localhost:3000/api/v1/istighfar/updateDikr", {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data ),
        });

        if (!response.ok) {
            throw new Error("Failed to update Istighfar goal");
        }

        return response.json();
        },
        onSuccess: (data) => {
        queryClient.invalidateQueries(["adkar", data.userAdkar.userId]); // Refresh updated settings
        toast.success("Istighfar Goal updated successfully!");
        },
        onError: (error) => {
        console.error(error);
        toast.error("Failed to update Istighfar goal.");
        },
    });
};

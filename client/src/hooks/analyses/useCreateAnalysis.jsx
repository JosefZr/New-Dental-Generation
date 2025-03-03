import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"

export const useCreateAnalysis = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (formData) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/analyse/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error("Failed to create analyse")

            return response.json()
        },
        onSuccess: (data) => {
            console.log("Analyse created successfully:", data)
            queryClient.invalidateQueries(["analyse"])
            toast.success("Analysis created successfully!")
        },
        onError: (error) => {
            console.error("Error creating analyse:", error.message)
            toast.error("Failed to create analyse")
        },
    })
}

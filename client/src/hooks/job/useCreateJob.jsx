import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"

export const useCreateJob = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (formData) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/job/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error("Failed to create job")

            return response.json()
        },
        onSuccess: (data) => {
            console.log("job created successfully:", data)
            queryClient.invalidateQueries(["job"])
            toast.success("job created successfully!")
        },
        onError: (error) => {
            console.error("Error creating job:", error.message)
            toast.error("Failed to create job")
        },
    })
}

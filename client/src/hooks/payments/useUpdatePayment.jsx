import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"

export const useUpdatePayment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, taskId, payment }) => {
            const response = await fetch('http://localhost:3000/api/v1/payment/managment/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, taskId, task: payment }), // Match the backend expected format
            })

            if (!response.ok) {
                throw new Error('Failed to update payment')
            }

            return response.json()
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["userPayments",data.payment.userId])
            toast.success('Payment updated successfully!')
        },
        onError: (error) => {
            console.error('Error updating payment:', error.message)
            toast.error('Failed to update payment')
        },
    })
}
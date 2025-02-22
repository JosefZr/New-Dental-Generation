export const useGetDaysDifference = (createdAt) => {
    const created = new Date(createdAt)
    const now = new Date()
    created.setHours(0, 0, 0, 0)
    now.setHours(0, 0, 0, 0)
    const diffTime = Math.abs(now - created)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
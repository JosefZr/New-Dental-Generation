import { useQuery } from "react-query";

const fetchUserRoles = async (userId) => {
    const response = await fetch(`http://localhost:3000/api/v1/roles/get`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });
    
    if (!response.ok) {
        throw new Error("Failed to fetch roles");
    }
    
    const result = await response.json();
    return result.data; // Return the data directly
};

export const useGetAllOtherRoles = (userId) => {
    return useQuery(
        ["roles", userId], 
        () => fetchUserRoles(userId), 
        {
            enabled: !!userId, // Fetch only when userId is provided
            staleTime: 0, // Reduce stale time for immediate updates
            refetchOnWindowFocus: false, // Don't refetch when window gains focus
        }
    );
};
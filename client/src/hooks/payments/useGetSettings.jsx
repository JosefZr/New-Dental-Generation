import { useQuery } from "react-query";

const fetchUserSettings = async (userId) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/settings/getSettings`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch settings: ${response.statusText}`);
    }
    const data = response.json()
    return data
};

export const useGetSettings = ({ userId }) => {
    return useQuery(["userSettings", userId], () => fetchUserSettings(userId), {
        enabled: !!userId,
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });
};

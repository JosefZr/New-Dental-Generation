import { useQuery } from "react-query";

const fetchUserSettings = async () => {
    const response = await fetch(`http://localhost:3000/api/v1/auth/getAdmin`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch admin: ${response.statusText}`);
    }
    const data = response.json()
    return data.data
};

export const useGetAdmin = () => {
    return useQuery(["admin"], () => fetchUserSettings(), {
    });
};

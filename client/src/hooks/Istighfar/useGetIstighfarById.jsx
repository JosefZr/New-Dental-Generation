import { useQuery } from "react-query";

const fetchUserSimpleTasks = async (id,type) => {
    const response = await fetch(`http://localhost:3000/api/v1/istighfar/getIstighfar`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, type }),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch istighfars");
    }
    const data = await response.json();
    return data.istighfars;
};

export const useGetIstighfarById = ({id,type}) => {
    return useQuery(["Istighfar", id], () => fetchUserSimpleTasks(id,type), {
        enabled: !!id, // Fetch only when userId is provided
        staleTime: 0, // Reduce stale time
    });
};

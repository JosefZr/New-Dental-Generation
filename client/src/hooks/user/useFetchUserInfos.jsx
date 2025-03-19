import { useQuery } from "react-query";

const fetchUserTasks = async (id) => {
    const response = await fetch(
        `${import.meta.env.VITE_SERVER_API}/api/v1/users/${id}`, // Use id directly
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }
    const data = await response.json();
    return data.tasks;
};


export const useFetchUserInfos = (id) => {
    return useQuery(["users", id], () => fetchUserTasks(id), {
      enabled: !!id, // Fetch only when id is provided
      staleTime: 0,
    });
  };
  

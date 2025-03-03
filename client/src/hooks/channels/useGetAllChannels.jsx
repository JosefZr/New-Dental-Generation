import { useQuery } from "react-query";

const fetchChannels = async () => {
  const token = localStorage.getItem("token").toString() 
  console.warn(token)
  const resp = await fetch(
    `${import.meta.env.VITE_SERVER_API}/api/v1/channels/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  if (!resp.ok) {
    throw new Error(resp.status);
  }

  const data = await resp.json();
  return data;
};

export const useGetAllChannels = () => {
  return useQuery(["channel"], fetchChannels, {
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
};

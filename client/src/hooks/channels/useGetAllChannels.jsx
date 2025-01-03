import { useQuery } from "react-query";

const fetchChannels = async () => {
  const resp = await fetch(
    "http://localhost:3000/api/v1/channels?type=control/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token").toString(),
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

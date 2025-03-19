import { useQuery } from "react-query";

const fetchChannels = async ({clickedChannelID}) => {
  const token = localStorage.getItem("token").toString() 
  console.warn(token)
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_API}/api/v1/channels/${clickedChannelID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token").toString(),
      },
    }
  );
  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = await response.json();
  return data;
};

export const useGetChannelMessages = (clickedChannelID) => {
  return useQuery(["channel",clickedChannelID], fetchChannels, {
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
};
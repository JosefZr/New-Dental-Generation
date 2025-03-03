import { useQuery } from "react-query";

const getRandomQuoates = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/quoate/random`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch quotes");
    }

    const { data } = await response.json();
    return data;
};

export const useGetRandomQuoate = () => {
    return useQuery(
        ["quoate"],
        async () => {
            // Get today's date in YYYY-MM-DD format
            const today = new Date().toISOString().split("T")[0];
            const storedData = localStorage.getItem("dailyQuote");

            if (storedData) {
                const { date, quote } = JSON.parse(storedData);
                // If stored date matches today's date, return cached quote
                if (date === today) {
                    return quote;
                }
            }

            // Fetch a new quote if no cached quote for today exists
            const quote = await getRandomQuoates();
            localStorage.setItem(
                "dailyQuote",
                JSON.stringify({ date: today, quote })
            ); // Cache the new quote
            return quote;
        },
        {
            staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
            cacheTime: 24 * 60 * 60 * 1000, // Keep data in cache for 24 hours
        }
    );
};

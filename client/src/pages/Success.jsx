import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SuccessPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      const hash = window.location.hash;

      const hashWithoutHash = hash.slice(1);
      const queryParams = hashWithoutHash.split("?")[1];

      const params = new URLSearchParams(queryParams);

      const sessionId = params.get("sessionId");
      const userId = params.get("userId");

      console.log(sessionId, userId);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API}/api/v1/payment/validate-subscription`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId, userId }),
          }
        );

        if (response.ok) {
          setIsSuccess(true);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          const data = await response.json();
          setErrorMessage(data.message || "Payment validation failed.");
        }
      } catch (error) {
        setErrorMessage("An error occurred while validating the subscription.");
        console.error("the error is :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      {isLoading && (
        <div className="text-center">
          <div className="animate-spin border-8 border-t-8 border-blue-500 rounded-full w-16 h-16 mx-auto mb-4"></div>
          <p className="text-xl">Validating your subscription...</p>
        </div>
      )}

      {!isLoading && isSuccess && (
        <div className="text-center text-green-600">
          <div className="text-6xl">✔️</div>
          <p className="text-2xl mt-4">Payment validated successfully!</p>
          <p className="text-lg mt-4 text-blue-500">
            Redirecting to your dashboard...
          </p>
        </div>
      )}

      {!isLoading && !isSuccess && (
        <div className="text-center text-red-600">
          <div className="text-6xl">❌</div>
          <p className="text-2xl mt-4">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

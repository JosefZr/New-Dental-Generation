import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
const ProtectedRoutes = () => {
  const [isOnline, setIsOnline] = useState(true);
  const token = localStorage.getItem("token");

  // Network status detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };

    // Set initial state
    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }

    return (
      <div >
  {/* Offline banner */}
  {!isOnline && (
    <div 
      className="top-[-1px] left-0 right-0 border-my-gold border-[1px] border-solid text-my-gold text-center p-2 z-[9999] w-fit mx-auto backdrop-blur-xl flex items-center gap-2 px-4 py-2"
      style={{ 
        borderRadius: "0 0 10px 10px",
        position: "fixed",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}
    >
      <span className="text-sm font-medium drop-shadow-md">⚠️ Reconnecting...</span>
    </div>
  )}
  <Outlet />
</div>
    );

  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
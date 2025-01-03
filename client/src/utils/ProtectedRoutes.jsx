import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);

    // Check if the token has expired
    const currentTime = Date.now() / 1000; // current time in seconds
    if (decodedToken.exp < currentTime) {
      // Token has expired
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }

    // Token is valid, allow access to protected routes
    return <Outlet />;
  } catch (error) {
    // If there's an error decoding the token, treat it as invalid
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;

// PrivateRoutes.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>; // You can replace this with a spinner
  }

  if (!user) {
    // If user not logged in, redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated, show the protected content
  return children;
};

export default PrivateRoutes;

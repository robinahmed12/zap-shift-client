import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";
import useUserRole from "../hook/useUserRole";

// import Loader from "../components/Loader"; // Optional: Your loading spinner component

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const email = user?.email;
  const { data: role, isLoading } = useUserRole(email);
  console.log(role);
  const location = useLocation();

  if (loading || isLoading) {
    return (
      <div>
        <h1>loading....</h1>
      </div>
    ); // Show spinner while loading
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/forbidden" state={{ from: location }} replace />;
};

export default AdminRoute;

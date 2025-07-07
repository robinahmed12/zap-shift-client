import React from "react";
import useAuth from "../../hook/useAuth";
import useUserRole from "../../hook/useUserRole";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import RiderDashboard from "./RiderDashboard";

const DashboardHome = () => {
  const { user } = useAuth();
  const email = user?.email;
  const { data: role } = useUserRole(email);
  console.log(role);

  return (
    <>
      {role === "admin" && <AdminDashboard />}
      {role === "user" && <UserDashboard />}
      {role === "rider" && <RiderDashboard />}
    </>
  );
};

export default DashboardHome;

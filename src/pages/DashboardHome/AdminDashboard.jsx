import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import ParcelStatusPieChart from "./ParcelStatusPieChart";

const fetchParcelStatusCounts = async (axiosSecure) => {
  const res = await axiosSecure.get("/parcel-status-counts");
  return res.data;
};

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["parcelStatusCounts"],
    queryFn: () => fetchParcelStatusCounts(axiosSecure),
  });

  if (isLoading) return <p>Loading dashboard...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const { statusSummary = [], paidNotAssigned = 0 } = data;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statusSummary.map((status) => (
          <div key={status._id} className="p-6 bg-white shadow rounded">
            <h3 className="text-xl font-bold capitalize">
              {status._id.replaceAll("_", " ")}
            </h3>
            <p className="text-4xl text-[#E30613] font-semibold">
              {status.count}
            </p>
          </div>
        ))}

        <div className="p-6 bg-yellow-500 text-white shadow rounded">
          <h3 className="text-xl font-bold">Paid but Not Assigned</h3>
          <p className="text-4xl font-semibold">{paidNotAssigned}</p>
        </div>
      </div>

      <ParcelStatusPieChart/>
    </div>
  );
};

export default AdminDashboard;

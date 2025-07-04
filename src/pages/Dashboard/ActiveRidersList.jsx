import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";

const ActiveRidersList = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch active riders
  const { data: activeRiders = [], isLoading } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=active");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold text-[#E30613] mb-6">Active Riders</h2>

      {activeRiders.length === 0 ? (
        <div className="bg-[#FFD700] bg-opacity-20 p-6 rounded-lg border border-[#FFD700]">
          <p className="text-center text-gray-700">No active riders found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-[#000000] text-[#FFFFFF]">
              <tr>
                <th className="py-3 px-4 text-left">Rider</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Vehicle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activeRiders.map((rider) => (
                <tr key={rider._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-4 px-4">
                    <div className="font-medium">{rider.fullName}</div>
                    <div className="text-sm text-gray-500">
                      ID: {rider._id.slice(-6)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>{rider.applicantEmail}</div>
                    <div className="text-sm text-gray-500">{rider.phoneNumber}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="capitalize">{rider.vehicleType}</div>
                    <div className="text-sm text-gray-500">{rider.licensePlate}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveRidersList;

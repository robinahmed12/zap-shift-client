import React from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FaCheck, FaTimes, FaEye, FaUserClock } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";

const PendingRidersList = () => {
  const axiosSecure = useAxiosSecure();

  const { data: pendingRiders = [], refetch } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=pending");
      return res.data;
    },
  });

  const queryClient = useQueryClient();

  const { mutate: handleApprove, isPending: isUpdating } = useMutation({
    mutationFn: async (riderId) => {
      return await axiosSecure.patch(`/riders/${riderId}`, {
        status: "active",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingRiders"] });
      Swal.fire({
        icon: "success",
        title: "Approved!",
        text: "The rider has been successfully approved.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
  });

  const handleReject = async (id) => {
    try {
      await axiosSecure.delete(`/riders/${id}`);
      refetch();
    } catch (error) {
      console.error("Error rejecting rider:", error);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaUserClock className="text-2xl text-[#E30613]" />
        <h2 className="text-2xl font-bold text-[#E30613]">
          Pending Rider Applications
        </h2>
      </div>

      {pendingRiders.length === 0 ? (
        <div className="bg-[#FFD700] bg-opacity-20 p-6 rounded-lg border border-[#FFD700]">
          <p className="text-center text-gray-700">
            No pending rider applications found.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-[#000000] text-[#FFFFFF]">
              <tr>
                <th className="py-3 px-4 text-left">Rider</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Vehicle</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingRiders.map((rider) => (
                <tr
                  key={rider._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-4 px-4">
                    <div className="font-medium">{rider.fullName}</div>
                    <div className="text-sm text-gray-500">
                      ID: {rider._id.slice(-6)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>{rider.applicantEmail}</div>
                    <div className="text-sm text-gray-500">
                      {rider.phoneNumber}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="capitalize">{rider.vehicleType}</div>
                    <div className="text-sm text-gray-500">
                      {rider.licensePlate}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {rider.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleApprove(rider._id)}
                        className={`p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors flex items-center justify-center ${
                          isUpdating ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        title="Approve"
                        disabled={isUpdating}
                      >
                        {isUpdating ? "Accepting..." : ""}{" "}
                        <FaCheck className="" />
                      </button>
                      <button
                        onClick={() => handleReject(rider._id)}
                        className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        title="Reject"
                      >
                        <FaTimes />
                      </button>
                      <button
                        className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                    </div>
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

export default PendingRidersList;

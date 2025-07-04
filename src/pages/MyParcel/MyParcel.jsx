import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import { FaEye, FaTrash, FaMoneyBillWave } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../../hook/useAxiosSecure";

const MyParcel = () => {
  const { user } = useAuth();
  const userEmail = user?.email;
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myParcels", userEmail],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `http://localhost:3000/my-parcel?email=${userEmail}`
      );
      return response.data;
    },
    enabled: !!userEmail,
  });

  const handlePay = (id) => {
    console.log("Proceed to payment for", id);
    navigate(`/dashboard/payment/${id}`);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E30613]"></div>
      </div>
    );

  if (isError)
    return (
      <div className="p-4 bg-red-100 border-l-4 border-[#E30613] text-red-700">
        <p>Error: {error.message}</p>
      </div>
    );

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#E30613]">
        My Parcels
      </h1>

      {parcels.length === 0 ? (
        <div className="bg-[#FFD700] bg-opacity-20 p-6 rounded-lg border border-[#FFD700]">
          <p className="text-lg text-center">
            No parcels found. Create your first delivery request!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-[#000000] text-[#FFFFFF]">
              <tr>
                <th className="py-3 px-4 text-left">Parcel ID</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Cost</th>
                <th className="py-3 px-4 text-left">Payment</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {parcels.map((parcel) => (
                <tr key={parcel._id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm">{parcel._id.slice(-6)}</td>
                  <td className="py-4 px-4 font-medium">{parcel.type}</td>
                  <td className="py-4 px-4">
                    {formatDate(parcel.creation_date)}
                  </td>
                  <td className="py-4 px-4 font-bold">
                    ${parcel.cost?.toFixed(2)}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      className={`px-2 py-1 rounded-full text-xs ${
                        parcel.payment_status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {parcel.payment_status}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        parcel.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : parcel.status === "in transit"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {parcel.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        className="p-2 bg-[#000000] text-[#FFFFFF] rounded hover:bg-gray-700 transition"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      {parcel.payment_status !== "paid" && (
                        <button
                          onClick={() => handlePay(parcel._id)}
                          className="p-2 bg-[#FFD700] text-[#000000] rounded hover:bg-yellow-500 transition"
                          title="Make Payment"
                        >
                          <FaMoneyBillWave />
                        </button>
                      )}
                      <button
                        className="p-2 bg-[#E30613] text-[#FFFFFF] rounded hover:bg-red-700 transition"
                        title="Delete Parcel"
                      >
                        <FaTrash />
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

export default MyParcel;

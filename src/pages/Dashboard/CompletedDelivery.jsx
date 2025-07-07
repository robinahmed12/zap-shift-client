import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";

const fetchCompletedParcels = async (axiosSecure, riderEmail) => {
  const res = await axiosSecure.get(
    `/rider-completed-parcels?email=${riderEmail}`
  );
  return res.data;
};

const requestCashout = async ({ axiosSecure, parcelId }) => {
  const res = await axiosSecure.patch(`/parcels/${parcelId}/cashout`, {
    cashout_status: "requested",
  });
  return res.data;
};

const CompletedDelivery = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const riderEmail = user?.email;

  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["completedParcels", riderEmail],
    queryFn: () => fetchCompletedParcels(axiosSecure, riderEmail),
    enabled: !!riderEmail,
  });

  const { mutate: cashoutRequest, isPending: cashoutPending } = useMutation({
    mutationFn: ({ parcelId }) => requestCashout({ axiosSecure, parcelId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["completedParcels", riderEmail]);
      Swal.fire(
        "Requested!",
        "Your cashout request has been submitted.",
        "success"
      );
    },
    onError: (error) => {
      Swal.fire("Error!", "Something went wrong.", "error");
      console.error("Cashout Error:", error);
    },
  });

  const handleCashout = (parcelId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to request cashout for this delivery?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, request it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cashoutRequest({ parcelId });
      }
    });
  };

  if (isLoading) return <p>Loading completed deliveries...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Completed Deliveries</h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#E30613] text-white">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Tracking ID</th>
              <th className="px-4 py-3">From - To</th>
              <th className="px-4 py-3">Earnings</th>
              <th className="px-4 py-3">Fee</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parcels.map((parcel) => {
              const isSameCenter =
                parcel.senderServiceCenter === parcel.receiverServiceCenter;
              const earningRate = isSameCenter ? 0.7 : 0.8;
              const earnings = parcel.cost * earningRate;

              return (
                <tr
                  key={parcel._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">{parcel.title}</td>
                  <td className="px-4 py-3">{parcel.tracking_id}</td>
                  <td className="px-4 py-3">
                    {parcel.senderServiceCenter} →{" "}
                    {parcel.receiverServiceCenter}
                  </td>
                  <td className="px-4 py-3">${earnings.toFixed(2)}</td>
                  <td className="px-4 py-3">${parcel.cost.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <button
                      className={`px-3 py-1 rounded ${
                        parcel.cashout_status === "requested"
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                      disabled={parcel.cashout_status === "requested"}
                      onClick={() => handleCashout(parcel._id)}
                    >
                      {parcel.cashout_status === "requested"
                        ? "Requested"
                        : "Cashout"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDelivery;

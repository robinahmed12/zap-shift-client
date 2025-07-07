import React, { useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useTracking from "../../hook/useTracking";
import useAuth from "../../hook/useAuth";

const fetchParcels = async (axiosSecure) => {
  const res = await axiosSecure.get("/parcels/assignable");
  return res.data;
};

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { saveTracking } = useTracking();
  const { user } = useAuth();

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch assignable parcels
  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: () => fetchParcels(axiosSecure),
  });

  // Fetch riders based on selected parcel's senderServiceCenter
  const { data: riders = [], isLoading: ridersLoading } = useQuery({
    queryKey: ["riders", selectedParcel?.senderServiceCenter],
    queryFn: async () => {
      if (!selectedParcel?.senderServiceCenter) return [];
      const res = await axiosSecure.get(
        `/riders-by-city?city=${selectedParcel.senderServiceCenter}`
      );
      return res.data;
    },
    enabled: !!selectedParcel,
  });

  // Mutation to assign rider and save tracking
  const { mutate: assignRider } = useMutation({
    mutationFn: async ({ parcelId, rider, tracking_id }) => {
      // Assign rider to parcel
      const res = await axiosSecure.patch(`/parcels/${parcelId}/assign-rider`, {
        riderId: rider._id,
        riderName: rider.fullName,
        riderPhone: rider.phone,
        riderEmail: rider.applicantEmail,
      });

      // Save tracking info - await this call!
      await saveTracking({
        tracking_id,
        status: "Rider Assigned",
        details: `Assigned to ${rider.fullName} (${rider.phone})`,
        updated_by: user?.email,
        timestamp: new Date().toISOString(),
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["assignableParcels"]);
      setIsModalOpen(false);
      setSelectedParcel(null);
    },
    onError: (err) => {
      console.error("Failed to assign rider:", err);
    },
  });

  const handleAssignClick = (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedParcel(null);
  };

  // IMPORTANT: Pass tracking_id here as well!
  const handleAssignRider = (rider) => {
    if (!selectedParcel) return;
    assignRider({
      parcelId: selectedParcel._id,
      rider,
      tracking_id: selectedParcel.tracking_id,
    });
  };

  if (isLoading) return <p>Loading parcels...</p>;

  if (isError)
    return (
      <div className="p-4 bg-red-100 border-l-4 border-red-600 text-red-800">
        <p>Error: {error.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#E30613]">
        Assignable Parcels
      </h2>

      {parcels.length === 0 ? (
        <div className="bg-yellow-50 border-l-4 border-[#FFD700] p-4 text-gray-700">
          <p>No parcels available for assignment.</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#E30613] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs md:text-sm font-medium uppercase tracking-wider">
                  Tracking ID
                </th>
                <th className="px-4 py-3 text-left text-xs md:text-sm font-medium uppercase tracking-wider">
                  Sender Center
                </th>
                <th className="px-4 py-3 text-left text-xs md:text-sm font-medium uppercase tracking-wider">
                  Receiver Center
                </th>
                <th className="px-4 py-3 text-left text-xs md:text-sm font-medium uppercase tracking-wider">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-xs md:text-sm font-medium uppercase tracking-wider">
                  Title
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {parcels.map((parcel) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-xs md:text-sm font-medium">
                    {parcel.tracking_id}
                  </td>
                  <td className="px-4 py-3 text-xs md:text-sm">
                    {parcel.senderServiceCenter}
                  </td>
                  <td className="px-4 py-3 text-xs md:text-sm">
                    {parcel.receiverServiceCenter}
                  </td>
                  <td className="px-4 py-3 text-xs md:text-sm">
                    <button
                      className="px-3 py-1 bg-[#E30613] text-white rounded hover:bg-red-700"
                      onClick={() => handleAssignClick(parcel)}
                    >
                      Assign
                    </button>
                  </td>
                  <td className="px-4 py-3 text-xs md:text-sm">
                    {parcel.title}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-w-full">
            <h3 className="text-lg font-bold mb-4 text-[#E30613]">
              Select Rider
            </h3>

            {ridersLoading ? (
              <p>Loading riders...</p>
            ) : riders.length === 0 ? (
              <p>No riders found in this city.</p>
            ) : (
              <ul className="space-y-2 max-h-60 overflow-auto">
                {riders.map((rider) => (
                  <li
                    key={rider._id}
                    className="flex justify-between items-center border p-2 rounded"
                  >
                    <div>
                      <p className="font-semibold">{rider.fullName}</p>
                      <p className="text-sm text-gray-500">{rider.phone}</p>
                    </div>
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={() => handleAssignRider(rider)}
                    >
                      Assign
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;

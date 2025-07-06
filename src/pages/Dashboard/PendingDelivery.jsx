import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";

const fetchAssignedParcels = async (axiosSecure, riderEmail) => {
  const res = await axiosSecure.get(
    `/rider-assigned-parcels?email=${riderEmail}`
  );
  return res.data;
};

const updateParcelStatus = async ({ axiosSecure, parcelId, newStatus }) => {
  const res = await axiosSecure.patch(`/parcels/${parcelId}`, {
    delivery_status: newStatus,
  });
  return res.data;
};

const PendingDelivery = () => {
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
    queryKey: ["assignedParcels", riderEmail],
    queryFn: () => fetchAssignedParcels(axiosSecure, riderEmail),
    enabled: !!riderEmail,
  });

  const { mutate: updateDeliveryStatus, isPending: updating } = useMutation({
    mutationFn: ({ parcelId, newStatus }) =>
      updateParcelStatus({ axiosSecure, parcelId, newStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries(["assignedParcels", riderEmail]);
    },
  });

  if (isLoading) return <p>Loading parcels...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Deliveries</h2>

      {parcels.length === 0 ? (
        <p>No assigned parcels pending pickup or delivery.</p>
      ) : (
        <ul className="space-y-4">
          {parcels.map((parcel) => (
            <li key={parcel._id} className="p-4 border rounded shadow">
              <p>
                <strong>Tracking ID:</strong> {parcel.tracking_id}
              </p>
              <p>
                <strong>Title:</strong> {parcel.title}
              </p>
              <p>
                <strong>Receiver:</strong> {parcel.receiverName}
              </p>
              <p>
                <strong>Address:</strong> {parcel.receiverAddress}
              </p>
              <p>
                <strong>Status:</strong> {parcel.delivery_status}
              </p>

              {parcel.delivery_status === "assigned" && (
                <button
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  disabled={updating}
                  onClick={() =>
                    updateDeliveryStatus({
                      parcelId: parcel._id,
                      newStatus: "in_transit", // Change status to in_transit
                    })
                  }
                >
                  {updating ? "Updating..." : "Mark as Picked Up"}
                </button>
              )}

              {parcel.delivery_status === "in_transit" && (
                <button
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  disabled={updating}
                  onClick={() =>
                    updateDeliveryStatus({
                      parcelId: parcel._id,
                      newStatus: "delivered", // Final delivery
                    })
                  }
                >
                  {updating ? "Updating..." : "Mark as Delivered"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingDelivery;

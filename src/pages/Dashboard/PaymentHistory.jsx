import React from "react";
import useAuth from "../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E30613]"></div>
      </div>
    );

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-[#E30613]">
        Payment History
      </h2>

      {paymentHistory.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-lg text-gray-600">No payment records found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full">
            <thead>
              <tr className="bg-[#E30613] text-white">
                <th className="p-4 text-left font-semibold">#</th>
                <th className="p-4 text-left font-semibold">Parcel ID</th>
                <th className="p-4 text-left font-semibold">Transaction ID</th>
                <th className="p-4 text-left font-semibold">Amount</th>
                <th className="p-4 text-left font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-medium text-gray-800">
                    {payment.parcelId || "N/A"}
                  </td>
                  <td className="p-4 font-mono text-sm text-[#E30613]">
                    {payment.transactionId}
                  </td>
                  <td className="p-4 font-bold text-[#FFD700]">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Date(payment.paymentDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 bg-black text-white p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-2 text-[#FFD700]">Need Help?</h3>
        <p className="mb-4">
          If you have any questions about your payments, please contact our
          support team.
        </p>
        <button className="bg-[#E30613] hover:bg-[#C00511] text-white font-bold py-2 px-6 rounded transition-colors duration-300">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default PaymentHistory;

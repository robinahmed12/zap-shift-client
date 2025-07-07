import React from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const riderEmail = user?.email;

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["riderEarnings", riderEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider-earnings?email=${riderEmail}`);
      return res.data;
    },
    enabled: !!riderEmail,
  });

  if (isLoading) return <p>Loading earnings...</p>;

  // Calculate earnings
  const today = dayjs().format("YYYY-MM-DD");
  const currentMonth = dayjs().format("YYYY-MM");
  const currentYear = dayjs().format("YYYY");

  let dailyTotal = 0,
    monthlyTotal = 0,
    yearlyTotal = 0,
    overallTotal = 0,
    remainingCashout = 0;

  parcels.forEach((parcel) => {
    const createdAt = dayjs(parcel.creation_date);
    const fromCenter = parcel.senderServiceCenter;
    const toCenter = parcel.receiverServiceCenter;

    // Calculate earning percentage
    const earningPercentage = fromCenter === toCenter ? 0.7 : 0.8;
    const earning = parcel.cost * earningPercentage;

    overallTotal += earning;

    if (createdAt.format("YYYY-MM-DD") === today) {
      dailyTotal += earning;
    }
    if (createdAt.format("YYYY-MM") === currentMonth) {
      monthlyTotal += earning;
    }
    if (createdAt.format("YYYY") === currentYear) {
      yearlyTotal += earning;
    }

    if (parcel.cashout_status !== "requested") {
      remainingCashout += earning;
    }
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Earnings Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Today's Earnings</h3>
          <p>${dailyTotal.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Monthly Earnings</h3>
          <p>${monthlyTotal.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Yearly Earnings</h3>
          <p>${yearlyTotal.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-purple-100 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
          <p>${overallTotal.toFixed(2)}</p>
        </div>
      </div>

      <div className="p-4 bg-pink-100 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Remaining Cashout Amount</h3>
        <p>${remainingCashout.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default MyEarnings;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../hook/useAxiosSecure";

// Custom Colors
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6363",
  "#A28DFF",
];

const ParcelStatusPieChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["parcelStatusCounts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcel-status-counts");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading chart...</p>;

  const { statusSummary = [], paidNotAssigned = 0 } = data;

  // Prepare data for PieChart
  const chartData = statusSummary.map((status) => ({
    name: status._id === "not_collected" ? "Not Assigned" : status._id,
    value: status.count,
  }));

  // Add the "Paid but Not Assigned" as a separate slice
  chartData.push({
    name: "Paid but Not Assigned",
    value: paidNotAssigned,
  });

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#E30613]">
        Parcel Status Breakdown
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParcelStatusPieChart;

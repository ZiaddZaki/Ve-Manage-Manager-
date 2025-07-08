import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

async function fetchData(api) {
  try {
    const response = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return 0;
  }
}

export default function VehicleStatusBarChart( ) {
  const { data: VehicleAvailable, isLoading: isAvailableLoading } = useQuery({
    queryKey: ["Vehicle-Available"],
    queryFn: () =>
      fetchData(
        "https://veemanage.runasp.net/api/Dashboard/Total-Vehicle-Available"
      ),
  });

  const { data: VehicleUnderMaintencance, isLoading: isUnderLoading } = useQuery({
    queryKey: ["Vehicle-UnderMaintencance"],
    queryFn: () =>
      fetchData(
        "https://veemanage.runasp.net/api/Dashboard/Total-Vehicle-UnderMaintencance"
      ),
  });

  const { data: TotalVehicles, isLoading: isTotalLoading } = useQuery({
    queryKey: ["Vehicles"],
    queryFn: () =>
      fetchData("https://veemanage.runasp.net/api/Dashboard/Total-Vehicle"),
  });

  if (isAvailableLoading || isUnderLoading || isTotalLoading) {
    return <div className="text-center text-primary fs-5">Loading...</div>;
  }

  const chartData = [
    {
      name: "Today",
      Total: TotalVehicles || 0,
      Available: VehicleAvailable || 0,
      UnderMaintenance: VehicleUnderMaintencance || 0,
    },
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="95%" height="100%">
        <BarChart data={chartData} barGap={30} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}`}
            label={{
              value: "Total Vehicles",
              angle: -90,
              position: "insideLeft",
              offset: -5,
              fontSize: 14,
            }}
          />
          <Tooltip
            formatter={(value, name) => [`${value} Vehicle`, name]}
            labelFormatter={() => "Today"}
          />
          <Legend />
          <Bar dataKey="Total" fill="#8884d8" name="All" />
          <Bar dataKey="Available" fill="#82ca9d" name="Available" />
          <Bar dataKey="UnderMaintenance" fill="#ffc658" name="Under Maintenance" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

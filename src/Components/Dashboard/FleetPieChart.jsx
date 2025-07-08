import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";



export default function FleetPieChart() {
  async function fetchData(api) {
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response?.data);
      
      return response?.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  const{data:tripWithFaults,isLoading:tripWithFaultIsloading}=useQuery({
    queryKey: ["tripWithFaults"],
    queryFn: () => fetchData("https://veemanage.runasp.net/api/Dashboard/Trips-With-Faults"),
  })
  const{data:tripCompleted,isLoading:tripCompletedIsloading}=useQuery({
    queryKey: ["tripCompleted"],
    queryFn: () => fetchData("https://veemanage.runasp.net/api/Dashboard/Trips-Without-Faults"),
  })
  const data = [
  { name: "Trip Completed", value:tripCompleted&&tripCompleted , color: "#3B82F6" },
  { name: "Trip With Fault", value:tripWithFaults, color: "#F95f1f" },

];
  return (
    <div className="w-full h-[300px]">
      {tripWithFaultIsloading || tripCompletedIsloading ? (
        <Loader/>
      
      ) : (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      )}
    </div>
  );
}

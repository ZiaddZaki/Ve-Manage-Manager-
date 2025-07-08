import axios from "axios";
import FleetPieChart from "./FleetPieChart";
import SalesBarChart from "./SalesBarChart";
import SalesLineChart from "./SalesLineChart";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";

export default function Dashboard() {
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
  const{data:maintenanceCost,isLoading:maintenanceCostIsloading}=useQuery({
    queryKey: ["maintenanceCost"],
    queryFn: () => fetchData("https://veemanage.runasp.net/api/Dashboard/Total-Maintenance-Cost"),
  })
  const{data:fuelCost,isLoading:fuelCostIsloading}=useQuery({
    queryKey: ["fuelCost"],
    queryFn: () => fetchData("https://veemanage.runasp.net/api/Dashboard/Total-Fuel-Cost"),
  })
  
return (
  (fuelCostIsloading || maintenanceCostIsloading) ? (
    <Loader/>
  ) : (
    <div className="main">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black text-white  rounded-xl  shadow-md w-[100%] ">
          <div className="flex flex-col gap-4 p-4">
            <span className="text-base font-semibold mb-1">Total Maintenance Cost</span>
            <span className="text-2xl mb-3 font-medium">
              {maintenanceCost.toLocaleString()} EGP{" "}
              <span style={{ fontSize: "12px" }}>Per Month</span>
            </span>
          </div>
        </div>
        <div className="bg-white text-black border border-stone-300 shadow-md  rounded-xl w-[100%]">
          <div className="flex flex-col gap-4 p-4">
            <span className="text-base font-semibold mb-1">Total Fuel Cost</span>
            <span className="text-2xl mb-3 font-medium">
              {fuelCost.toLocaleString()} EGP{" "}
              <span style={{ fontSize: "12px" }}>Per Month</span>
            </span>
          </div>
        </div>
        <div className="bg-white text-black border border-stone-300 shadow-md  rounded-xl w-[100%]">
          <div className="flex flex-col gap-4 p-4">
            <span className="text-sm font-semibold mb-1">Fleets</span>
            <span className="text-2xl mb-3 font-medium">523</span>
          </div>
        </div>
        <div className="bg-white text-black border border-stone-300 shadow-md  rounded-xl w-[100%]">
          <div className="flex flex-col gap-4 p-4">
            <span className="text-sm font-semibold mb-1">Fleets</span>
            <span className="text-2xl mb-3 font-medium">128</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white text-black border  border-stone-300 shadow-md  rounded-xl w-[100%]">
          <div className="flex flex-col gap-4 p-4">
            <FleetPieChart />
          </div>
        </div>
        <div className="bg-white text-black border  border-stone-300 shadow-md  rounded-xl w-[100%]">
          <div className="flex flex-col gap-4 p-4">
            <SalesLineChart />
          </div>
        </div>
        <div className="bg-white text-black border border-stone-300 shadow-md  rounded-xl w-[100%] col-span-1 md:col-span-2">
          <div className="flex flex-col gap-4 p-4">
            <SalesBarChart />
          </div>
        </div>
      </div>
    </div>
  )
);

}

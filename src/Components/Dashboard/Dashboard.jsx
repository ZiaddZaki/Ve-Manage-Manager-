import FleetPieChart from "./FleetPieChart";
import SalesBarChart from "./SalesBarChart";
import SalesLineChart from "./SalesLineChart";

export default function Dashboard() {
  return (
    <div className="main">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-black text-white  rounded-xl  shadow-md w-[100%] ">
          <div className="flex flex-col gap-4 p-4">
            <span className="text-sm font-semibold mb-1">Fleets</span>
            <span className="text-2xl mb-3 font-medium">1, 283</span>
          </div>
        </div>
        <div className="bg-white text-black border border-stone-300 shadow-md  rounded-xl w-[100%]">
          <div className="flex flex-col gap-4 p-4">
            <span className="text-sm font-semibold mb-1">Fleets</span>
            <span className="text-2xl mb-3 font-medium">2, 983</span>
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
  );
}

import React from "react";
import { Settings } from "lucide-react";
import { Check } from "lucide-react";

const DriversReports = () => {
  console.log("DriversReports component rendered");
  return (
    <div>
      <div className="text-center mb-7 w-[100%] py-[0.5rem] bg-red-500 text-white border border-stone-300   rounded-md shadow-sm font-semibold text-xl">
        Drivers Reports
      </div>
      <div>
        <span className=" px-4 rounded-lg border border-stone-700 ml-7 ">
          <button className="mb-3">data</button>
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2 mx-5">
        <div className="">
          <div className="bg-[#4CAF50] rounded-tr-lg rounded-tl-lg">
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center">
                <Check className="w-6 h-6 text-white" />
                <span className="text-white font-medium text-xl ml-2">
                  Trip Completed
                </span>
              </div>

              <span className="text-white font-medium mr-2">May 19, 2023</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 bg-white pb-8">
            <div className="bg-[#E8E8E8] rounded-xl border-l-4 border-[#4880FF] max-w-[] py-1 px-2">
              <span className="block px-4 pb-1 font-semibold">Driver Name</span>
              <span className="block px-4 pb-3">ziad mahmoud</span>
            </div>
            <div className="bg-[#E8E8E8] rounded-xl border-l-4 border-[#4880FF] py-1 px-2">
              <span className="block px-4 pb-1 font-semibold">
                Car plate number
              </span>
              <span className="block px-4 pb-3">طبف 2211</span>
            </div>
            <div className="bg-[#E8E8E8] rounded-xl border-l-4 border-[#4880FF] py-1 px-2">
              <span className="block px-4 pb-1 font-semibold">
                vehicle name (model)
              </span>
              <span className="block px-4 pb-3">honda cevic</span>
            </div>
            <div className="bg-[#E8E8E8] rounded-xl border-l-4 border-[#4880FF] py-1 px-2">
              <span className="block px-4 pb-1 font-semibold">
                vehicle category
              </span>
              <span className="block px-4 pb-3">ma3rfsh</span>
            </div>
            <div className="bg-[#E8E8E8] rounded-xl border-l-4 border-[#4880FF] py-1 px-2">
              <span className="block px-4 pb-1 font-semibold">trip type</span>
              <span className="block px-4 pb-3">ma3rfsh</span>
            </div>
            <div className="bg-[#E8E8E8] rounded-xl border-l-4 border-[#4880FF] py-1 px-2">
              <span className="block px-4 pb-1 font-semibold">
                trip destination
              </span>
              <span className="block px-4 pb-3">210km</span>
            </div>
            <div className="bg-[#E8E8E8] rounded-xl border-l-4 border-[#4880FF] py-1 px-2">
              <span className="block px-4 pb-1 font-semibold">fuel cost</span>
              <span className="block px-4 pb-3">11$</span>
            </div>
          </div>
          <div className="bg-white ">
            <hr className="border-t-2 border-gray-400 mb-2" />
            <div className="flex justify-end">
              <button className="bg-[#3567DB] text-white px-5 py-2 rounded-xl my-2 mr-2 ">
                Mark as Seen
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <div className="bg-[#FA2E2E] rounded-tr-lg rounded-tl-lg">
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center">
                <Settings className="w-6 h-6 text-white" />
                <span className="text-white font-medium text-xl ml-2">
                  Fault Reported
                </span>
              </div>

              <span className="text-white font-medium mr-2">May 19, 2023</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 bg-white pb-8">
            <div className="bg-[#E8E8E8] rounded-xl border-l-4 border-[#FA2E2E] max-w-[] py-1 px-2">
              <span className="block px-4 pb-1 font-semibold">Driver Name</span>
              <span className="block px-4 pb-3">ziad mahmoud</span>
            </div>
            <div className="bg-[#E8E8E8] rounded-xl border-l-4 border-[#FA2E2E] py-1 px-2">
              <span className="block px-4 pb-1 font-semibold">
                Car plate number
              </span>
              <span className="block px-4 pb-3">طبف 2211</span>
            </div>
            <div className="bg-[#E8E8E8] rounded-xl border-l-4 border-[#FA2E2E] py-1 px-2">
              <span className="block px-4 pb-1 font-semibold">issue type</span>
              <span className="block px-4 pb-3">oil change</span>
            </div>
            <div className="bg-[#E8E8E8] rounded-xl border-l-4 border-[#FA2E2E] py-1 px-2">
              <span className="block px-4 pb-1 font-semibold">
                problem description
              </span>
              <span className="block px-4 pb-3">ma3rfsh</span>
            </div>
            <div className="bg-[#E8E8E8] rounded-xl border-l-4 border-[#FA2E2E] py-1 px-2">
              <span className="block px-4 pb-1 font-semibold">
                fuel refile (Liters)
              </span>
              <span className="block px-4 pb-3">10</span>
            </div>
            <div className="bg-[#E8E8E8] rounded-xl border-l-4 border-[#FA2E2E] py-1 px-2">
              <span className="block px-4 pb-1 font-semibold">
                Cost (currency)
              </span>
              <span className="block px-4 pb-3">70$</span>
            </div>
            <div className="bg-[#E8E8E8] rounded-xl border-l-4 border-[#FA2E2E] py-1 px-2">
              <span className="block px-4 pb-1 font-semibold">Location</span>
              <span className="block px-4 pb-3">htpss.hhhhhhh</span>
            </div>
            <div className="bg-[#E8E8E8] rounded-xl border-l-4 border-[#FA2E2E] py-1 px-2">
              <span className="block px-4 pb-1 font-semibold">Destination</span>
              <span className="block px-4 pb-3">Porsaid</span>
            </div>
          </div>
          <div className="bg-white ">
            <hr className="border-t-2 border-gray-400 mb-2" />
            <div className="flex justify-end">
              <button className="bg-[#3567DB] text-white px-5 py-2 rounded-xl my-2 mr-2 ">
                Mark as Seen
              </button>
              <button className="bg-[#FF9800] text-white px-5 py-2 rounded-xl my-2 mr-2 ">
                Send To Mechanic
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriversReports;

import { ChevronDown } from "lucide-react";
import React from "react";

const AssignTrip = () => {
  const data = [
    { title: "Driver" },
    { title: "Category" },
    { title: "Plate Number" },
    { title: "Trip Date" },
    { title: "Pickup Location" },
    { title: "Destination" },
    { title: "Trip Type" },
  ];
  return (
    <>
      <div className="main">
        <div className="head text-center">
          <span className="font-bold text-2xl ">Assign Trip to Driver</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-8  ml-6">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-start p-4  ml-6">
              <span className="text-lg font-medium font-Nunito text-[#666666]">
                {item.title}
              </span>
              <button className=" flex justify-end border border-stone-400 rounded-md px-3 py-2 h-[50px]  w-[70%]">
                <ChevronDown className="w-5 h-8 text-blue-600 mr-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="col-span-2 flex flex-col items-start p-4 ml-6">
          <span className="text-lg font-medium font-Nunito text-[#666666]">
            Details
          </span>
          <textarea
            placeholder="Additional info..."
            className="border border-stone-400 rounded-md px-3 py-2 w-[90%] h-[150px] resize-none"
          />
        </div>
      </div>
    </>
  );
};

export default AssignTrip;

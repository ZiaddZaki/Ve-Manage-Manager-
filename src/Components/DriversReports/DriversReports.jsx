import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ReportCard from "./ReportCard";
import { ChevronDown } from "lucide-react";

const DriversReports = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All");

  async function fetchTrips() {
    //fetching completed trips
    try {
      const response = await axios.get(
        "http://veemanage.runasp.net/api/DriverReport/reports",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            Sort: "DateDesc",
          },
        }
      );

      console.log("Fetched trips:", response?.data);
      return response?.data;
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ["driversReports"],
    queryFn: fetchTrips,
  });

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const filteredData = data?.filter((item) => {
    if (selected === "All") return true;
    return item.reportType === selected;
  });

  return (
    <div>
      <div className="text-center mb-7 w-[100%] py-[0.5rem] bg-stone-200 text-stone-700 border border-stone-300   rounded-md shadow-sm font-semibold text-xl">
        Drivers Reports
      </div>
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 bg-white text-black border border-black rounded-full px-4 py-1 shadow-sm hover:shadow-md transition ml-4"
        >
          {selected}
          <ChevronDown className="w-4 h-4" />
        </button>
        {open && (
          <div className="flex flex-col items-start px-3 w-[150px] h-[90px] bg-stone-100 border border-stone-400 rounded-md shadow-lg mt-2 ml-4 ">
            <span
              className="mb-1 cursor-pointer text-base hover:text-lg transition-all"
              onClick={() => {
                setSelected("All");
                setOpen(false);
              }}
            >
              ALL
            </span>
            <span
              className="mb-1 cursor-pointer text-base hover:text-lg transition-all text-green-700"
              onClick={() => {
                setSelected("Trip");
                setOpen(false);
              }}
            >
              Trip Completed
            </span>
            <span
              className="mb-1 cursor-pointer text-base hover:text-lg transition-all text-red-700"
              onClick={() => {
                setSelected("Fault");
                setOpen(false);
              }}
            >
              Fault Reports
            </span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 my-5 mx-5">
        <ReportCard
          data={filteredData}
          isLoading={isLoading}
          formatDateTime={formatDateTime}
        />
      </div>
    </div>
  );
};

export default DriversReports;

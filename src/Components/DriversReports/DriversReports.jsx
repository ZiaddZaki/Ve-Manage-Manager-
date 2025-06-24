import React from "react";
import { Settings } from "lucide-react";
import { Check } from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ReportCard from "./ReportCard";

const DriversReports = () => {
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

  return (
    <div>
      <div className="text-center mb-7 w-[100%] py-[0.5rem] bg-stone-200 text-stone-700 border border-stone-300   rounded-md shadow-sm font-semibold text-xl">
        Drivers Reports
      </div>
      <div>
        <span className=" px-4 rounded-lg border border-stone-700 ml-7 ">
          <button className="mb-3">data</button>
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2 mx-5">
        <ReportCard
          data={data}
          isLoading={isLoading}
          formatDateTime={formatDateTime}
        />
      </div>
    </div>
  );
};

export default DriversReports;

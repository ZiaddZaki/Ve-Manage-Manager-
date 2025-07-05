import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReportCard from "./ReportCard";
import { ChevronDown } from "lucide-react";
import Loader from "../Loader/Loader";
import FetchWrapper from "../FetchWrapper";

const DriversReports = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All");

  async function fetchTrips() {
    //fetching completed trips
    try {
      const response = await axios.get(
        "https://veemanage.runasp.net/api/DriverReport/reports",
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

  async function markAsSeen(api) {
    try {
      const res = await axios.patch(api, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Marked as seen:", res);
      return res;
    } catch (err) {
      console.error("Error marking report as seen:", err);
      return [];
    }
  }

  const queryClient = useQueryClient();

  const { mutate: markAsSeenMutation } = useMutation({
    mutationFn: markAsSeen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["driversReports"] });
    },
  });
  return (
    <>
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
          <div
            className={`flex flex-col items-start  w-[150px] mt-2 bg-stone-100 border border-stone-400 rounded-md shadow-lg  ml-4  border-loverflow-hidden transition-[max-height] duration-300 ${
              open ? "max-h-40 " : "max-h-0 overflow-hidden border-none "
            }`}
          >
            <span
              className="hover:bg-stone-200 cursor-pointer text-sm   transition-all font-bold text-blue-500 border-b-2 w-full px-2 py-1"
              onClick={() => {
                setSelected("All");
                setOpen(false);
              }}
            >
              All
            </span>
            <span
              className="hover:bg-stone-200 cursor-pointer text-sm   transition-all text-red-500 font-bold border-b-2 w-full px-2 py-1"
              onClick={() => {
                setSelected("Fault");
                setOpen(false);
              }}
            >
              Fault Reports
            </span>
            <span
              className="hover:bg-stone-200 cursor-pointer text-sm   transition-all text-green-600 font-bold  w-full px-2 py-1"
              onClick={() => {
                setSelected("Trip");
                setOpen(false);
              }}
            >
              Trip Reports
            </span>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 my-5 mx-5">
            <FetchWrapper isLoading={isLoading} data={filteredData}>
              <ReportCard
                data={filteredData}
                isLoading={isLoading}
                formatDateTime={formatDateTime}
                markAsSeenMutation={markAsSeenMutation}
              />
            </FetchWrapper>
          </div>
        )}
      </div>
    </>
  );
};

export default DriversReports;

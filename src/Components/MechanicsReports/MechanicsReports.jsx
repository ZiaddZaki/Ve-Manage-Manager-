import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import FetchWrapper from "../FetchWrapper";
import { ChevronDown } from "lucide-react";

export default function MechanicsReports() {
    const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All");

  const { data, error, isLoading } = useQuery({
    queryKey: ["mechanicReports"],
    queryFn: getMechanicReports,
  });

  // Function to format ISO date string to a readable date and time
  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    try {
      const date = new Date(isoDate);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (err) {
      console.error("Error formatting date:", err);
      return "N/A";
    }
  };

  async function getMechanicReports() {
    try {
      const res = await axios.get("http://veemanage.runasp.net/api/Maintenance/Report/reports/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
             params: {
            Sort: "DateDesc",
          },
        },
      });
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
    } catch (err) {
      console.error("Error fetching mechanic reports:", err);
      return [];
    }
  }
   const filteredData = data?.filter((item) => {
    if (selected === "All") return true;
    return item.reportType === selected;
  });


  return (
    <>
      <div>
        <div className="text-center mb-7 w-[100%] py-[0.5rem] bg-stone-200 text-stone-700 border border-stone-300 rounded-md shadow-sm font-semibold text-xl">
          Mechanics Reports
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
    className={`flex flex-col items-start px-3 w-[150px] mt-2 bg-stone-100 border border-stone-400 rounded-md shadow-lg  ml-4 pl-2 border-loverflow-hidden transition-[max-height] duration-300 ${
      open ? "max-h-40 " : "max-h-0 overflow-hidden border-none "
    }`}
  >
    <span
      className="mb-1 cursor-pointer text-base hover:text-lg transition-all font-bold text-blue-500"
      onClick={() => {
        setSelected("All");
        setOpen(false);
      }}
    >
      All
    </span>
    <span
      className="mb-1 cursor-pointer text-base hover:text-lg transition-all text-yellow-500 font-bold"
      onClick={() => {
        setSelected("Initial");
        setOpen(false);
      }}
    >
      Initial Reports
    </span>
    <span
      className="mb-1 cursor-pointer text-base hover:text-lg transition-all text-green-500 font-bold"
      onClick={() => {
        setSelected("Final");
        setOpen(false);
      }}
    >
      Final Reports
    </span>
  </div>
</div>
        <div className="font-Inter font-[540] w-full p-1 md:p-3 text-[0.75rem] md:text-[0.9rem] lg:text-[1.1rem] flex flex-col gap-3">
          <FetchWrapper isLoading={isLoading} error={error}>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {filteredData?.map((report, index) => {
                const isInitial = report?.reportType === "Initial";
                const reportDetails = isInitial
                  ? [
                    {
                      title: "Vehicle",
                      value: report?.vehicleName || "N/A",
                    },
                    {
                      title: "Mechanic",
                      value: report?.mechanicName || "N/A",
                    },
                    {
                      title: "Maintenance Category",
                      value: report?.maintenanceCategory || "N/A",
                    },
                    {
                      title: "Request Title",
                      value: report?.requestTitle || "N/A",
                    },
                    {
                      title: "Expected Changed Parts",
                      value: report?.expectedChangedParts?.join(", ") || "N/A",
                    },
                    {
                      title: "Expected Cost",
                      value: report?.expectedCost || "N/A",
                    },
                    {
                      title: "Expected Finish Date",
                      value: formatDate(report?.expectedFinishDate),
                    },
                    {
                      title: "Notes",
                      value: report?.notes || "N/A",
                    },
                  ]
                : [
                    {
                      title: "Vehicle",
                      value: report?.vehicleName || "N/A",
                    },
                    {
                      title: "Mechanic",
                      value: report?.mechanicName || "N/A",
                    },
                    {
                      title: "Maintenance Category",
                      value: report?.maintenanceCategory || "N/A",
                    },
                    {
                      title: "Request Title",
                      value: report?.requestTitle || "N/A",
                    },
                    {
                      title: "Changed Parts",
                      value: report?.changedParts?.join(", ") || "N/A",
                    },
                    {
                      title: "Total Cost",
                      value: report?.totalCost || "N/A",
                    },
                    {
                      title: "Report Date",
                      value: formatDate(report?.reportDate),
                    },
                    {
                      title: "Notes",
                      value: report?.notes || "N/A",
                    },
                  ];

              return (
                <div
                  className={`${
                    report?.reportType === "Initial" ? `border-yellow-500` : `border-green-500`
                  } bg-[#FFFFFF] p-3 rounded border-l-8 flex flex-col`}
                  key={index}
                >
                  <div className="text-black font-semibold mb-3 text-xl">
                    {report?.reportType} Report
                  </div>
                  <div className="flex flex-col gap-2 p-1">
                    {reportDetails.map((detail, i) => (
                      <div key={i}>
                        <span className="font-semibold">{detail.title} : </span>
                        {detail.value}
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 bg-blue-500 text-white py-1 px-3 rounded-md ml-auto">Mark as Seen</button>
                </div>
              );
            })}
          </div>
                      </FetchWrapper>
        </div>
      </div>
    </>
  );
}
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import FetchWrapper from "../FetchWrapper";
import { ChevronDown } from "lucide-react";

export default function MechanicsReports() {
    const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All");
  const [type, setType] = useState("");

  const { data, error, isLoading } = useQuery({
    queryKey: ["mechanicReports"],
    queryFn: getMechanicReports,
  });

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
      const res = await axios.get("https://veemanage.runasp.net/api/Maintenance/Report/reports/", {
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

  async function markAsSeen(reportId) {
    try {
      const res = await axios.patch(
        `https://veemanage.runasp.net/api/Maintenance/Report/${type}/${reportId}/mark-as-seen`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          // params: {
          //   seen: true,
          //   Sort: "DateDesc", 
          // },
        }
      );
      if (res.status === 200) {
        console.log("Report marked as seen:", res?.data);
        console.log("id",reportId);
        
      }
    } catch (err) {
      console.error("Error marking report as seen:", err);
              console.log("id",reportId);

    }
  };
  const queryClient = useQueryClient();

  
  const { mutate: markReportAsSeen } = useMutation({
    mutationFn: markAsSeen,
    onSuccess: () => {
      queryClient.invalidateQueries(["mechanicReports"]);
    },
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
    className={`flex flex-col items-start  w-[150px] mt-2 bg-stone-100 border border-stone-400 rounded-md shadow-lg  ml-4  border-loverflow-hidden transition-[max-height] duration-300 ${
      open ? "max-h-40 " : "max-h-0 overflow-hidden border-none "
    }`}
  >
    <span
      className="hover:bg-stone-200  cursor-pointer text-sm transition-all font-bold text-blue-500 border-b-2 w-full px-2 py-1"
      onClick={() => {
        setSelected("All");
        setOpen(false);
      }}
    >
      All
    </span>
    <span
      className="hover:bg-stone-200  cursor-pointer text-sm transition-all text-yellow-500 font-bold border-b-2 w-full px-2 py-1"
      onClick={() => {
        setSelected("Initial");
        setOpen(false);
      }}
    >
      Initial Reports
    </span>
    <span
      className="hover:bg-stone-200  cursor-pointer text-sm transition-all text-green-500 font-bold  w-full px-2 py-1"
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

            <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 p-4">
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
                  } ${report?.seen ? `bg-[#FFFFFF] opacity-55  hover:opacity-100 ` : `bg-[#FFFFFF]`} p-3 rounded border-l-8 flex flex-col shadow-md`}
                  key={index}
                >
                  <div className="text-black font-semibold mb-3 text-xl">
                    {report?.reportType} Report
                  </div>
                  <div className="flex flex-col gap-2 p-1 justify-between">
                    {reportDetails.map((detail, i) => (
                      <div key={i}>
                        <span className="font-semibold">{detail.title} : </span>
                        {detail.value}
                      </div>
                    ))}
                  </div>
                  {report?.seen ? (
                    <div className="text-gray-500">Report has been seen</div>
                  ) : (
                    <button className="mt-auto bg-blue-500 text-white py-1 px-3 rounded-md ml-auto"
                    onClick={() =>{ markReportAsSeen(report.id)
                      setType(report.reportType)
                    }}
                    >Mark as Seen</button>
                  )}
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
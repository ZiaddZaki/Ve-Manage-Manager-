import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FetchWrapper from "../FetchWrapper";

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
  } catch {
    return "N/A";
  }
};

const MechanicHistory = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["mechanicReports"],
    queryFn: async () => {
      const res = await axios.get(
        "https://veemanage.runasp.net/api/Maintenance/Report/reports/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    },
  });

  const seenReports = data?.filter((item) => item.seen === true);

  return (
    <div className="p-4">
      <div className="text-center mb-7 w-[100%] py-[0.5rem] bg-stone-200 text-stone-700 border border-stone-300 rounded-md shadow-sm font-semibold text-xl">
        Mechanic Reports History
      </div>
      <FetchWrapper isLoading={isLoading} error={error}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seenReports?.map((report, index) => (
            <div
              key={index}
              className={`border-l-8 rounded p-4 shadow ${
                report.reportType === "Initial"
                  ? "border-yellow-500"
                  : "border-green-500"
              }`}
            >
              <h2 className="text-lg font-bold mb-2">
                {report.reportType} Report
              </h2>
              <p>
                <strong>Vehicle:</strong> {report.vehicleName || "N/A"}
              </p>
              <p>
                <strong>Mechanic:</strong> {report.mechanicName || "N/A"}
              </p>
              <p>
                <strong>Maintenance Category:</strong>{" "}
                {report.maintenanceCategory || "N/A"}
              </p>
              <p>
                <strong>Request Title:</strong> {report.requestTitle || "N/A"}
              </p>
              <p>
                <strong>Seen:</strong> ✅
              </p>
              <p>
                <strong>
                  {report.reportType === "Initial"
                    ? "Expected Finish Date"
                    : "Report Date"}
                  :
                </strong>{" "}
                {formatDate(
                  report.reportType === "Initial"
                    ? report.expectedFinishDate
                    : report.reportDate
                )}
              </p>
            </div>
          ))}
        </div>
      </FetchWrapper>
    </div>
  );
};

export default MechanicHistory;

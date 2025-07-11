import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReportCard from "./ReportCard";
import { ChevronDown } from "lucide-react";
import Loader from "../Loader/Loader";
import FetchWrapper from "../FetchWrapper";
import { toast, ToastContainer } from "react-toastify";
import { NavLink } from "react-router";

const DriversReports = () => {
  const sampleReports = [
  {
    id: "123",
    seen: false,
    reportType: "Fault",
    reportedAt: "2025-07-05T10:30:00Z",
    driver: { displayName: "Ahmed Salah" },
    vehicle: {
      id: "v001",
      palletNumber: "ABC-1234",
    },
    faultType: "Engine",
    faultDetails: "Overheating detected by driver",
    status: "Pending",
    cost: 0,
    faultAddress: "Cairo, Nasr City",
    aiDetection: {
      issueName: "Engine Overheat",
      level: "High",
    },
  },
];

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All");
  const[FaultReportId, setFaultReportId] = useState(null);

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

  async function sendToMechanic({ mechanicId, vehicleId, description }) {
   const data={
         
          mechanicId,
          vehicleId,
          maintenanceCategory: 0,
          parts: [],
          description,
          falutReportId: FaultReportId  
        
    }
    console.log("data to be sent", data);

    try {
      const res = await axios.post(
        "https://veemanage.runasp.net/api/Maintenance/Request",
        data,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },}
        
      );
      console.log("Sent to mechanic:", res);
      return res;
    } catch (err) {
      console.error("Error sending to mechanic:", err);
    }
  }

  const { mutate: sendToMechanicMutation } = useMutation({
    mutationFn: sendToMechanic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["driversReports"] });
      toast.success("Sent to mechanic!");
    },
    onError: () => {
      toast.error("Error sending to mechanic!");
    },
  });

  return (
    <>
    <ToastContainer/>
      <div>
        <div className="text-center mb-7 w-[100%] py-[0.5rem] bg-stone-200 text-stone-700 border border-stone-300   rounded-md shadow-sm font-semibold text-xl">
          Drivers Reports
        </div>
        <div className="flex items-center justify-between">
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
          <div className="MaintainceHistory  text-end mx-5">
              <NavLink
                to={"/trips/history"}
                className="block  border border-primaryColor w-[180px] p-2 text-center rounded-lg text-primaryColor font-bold ml-auto hover:bg-primaryColor hover:text-white "
                >
                   History
              </NavLink>        
              </div>
              </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5 mx-5">
            <FetchWrapper isLoading={isLoading} data={filteredData}>
              <ReportCard
                data={filteredData}
                isLoading={isLoading}
                formatDateTime={formatDateTime}
                markAsSeenMutation={markAsSeenMutation}
                sendToMechanicMutation={sendToMechanicMutation}
                setFaultReportId={setFaultReportId}
              />
            </FetchWrapper>
          </div>
        )}
      </div>
    </>
  );
};

export default DriversReports;

import React from "react";
import AllUsersTable from "../AllUsersTable/AllUsersTable";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import FetchWrapper from "../FetchWrapper";

const Trips = () => {
  async function getTips() {
    try {
      const response = await axios.get(
        "http://veemanage.runasp.net/api/TripRequest/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Trips data:", response?.data);
      return response?.data;
    } catch (error) {
      console.error("Error fetching trips:", error);
      return [];
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ["trips"],
    queryFn: getTips,
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
      <div className="text-center mb-7 w-full py-2 bg-stone-200 text-stone-700 border border-stone-300 rounded-md shadow-sm font-semibold text-xl">
        Trips
      </div>
      <FetchWrapper isLoading={isLoading} data={data}>
        <AllUsersTable
          titles={[
            "#",
            "Driver Name",
            "Vehicle Type",
            "Plate Number",
            "Trip Status",
            "Destination",
            "Date & Time",
            " ",
          ]}
          rows={data?.map((item, index) => ({
            link: `/VehiclesProfile/${item.id}`,
            id: item.id,
            values: [
              index + 1,
              item.driver.displayName,
              item.vehicle.vehicleModelDto.brand?.name,
              item.vehicle.palletNumber,
              item.tripStatus,
              item.destination,
              formatDateTime(item.date),
            ],
          }))}
          columnSizes={[
            "5%", // #
            "16%", // Driver Name
            "12%", // Vehicle Type
            "12%", // Plate Number
            "14%", // Trip Status
            "16%", // Destination
            "20%", // Date & Time
            "5%", // Action
          ]}
        />
      </FetchWrapper>
    </div>
  );
};

export default Trips;

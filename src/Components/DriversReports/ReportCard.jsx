import { Settings, Check } from "lucide-react";
import Loader from "../Loader/Loader";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { set } from "lodash";

const ReportCard = ({
  data,
  isLoading,
  formatDateTime,
  markAsSeenMutation,
  sendToMechanicMutation,
}) => {
  const [openCardId, setOpenCardId] = useState(null);
  const [selectedMechanic, setSelectedMechanic] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleId, setVehicleId] = useState("");

  console.log(description);
  console.log(selectedMechanic);
  console.log(vehicleId);

  async function fetchMechanics() {
    try {
      const response = await axios.get(
        "https://veemanage.runasp.net/api/User/all/mechanic",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching mechanics:", error);
      return [];
    }
  }

  const { data: mechanics = [], isLoading: isMechanicsLoading } = useQuery({
    queryKey: ["mechanics"],
    queryFn: fetchMechanics,
  });

  if (isLoading)
    return (
      <div className="text-center">
        <Loader />
      </div>
    );

  return (
    <>
      {data?.map((item, index) => {
        const isTrip = item?.reportType === "Trip";

        const reportDetails = isTrip
          ? [
              {
                title: "Driver Name",
                value: item?.driver?.displayName || "N/A",
              },
              {
                title: "Car Plate Number",
                value: item?.vehicle?.palletNumber || "N/A",
              },
              {
                title: "Vehicle Name (Model)",
                value: item?.vehicle?.vehicleModelDto?.brand?.name || "N/A",
              },
              {
                title: "Vehicle Category",
                value: item?.vehicle?.vehicleModelDto?.category?.name || "N/A",
              },
              {
                title: "Fuel Efficiency",
                value: item?.vehicle?.vehicleModelDto?.fuelEfficiency || "N/A",
              },
              { title: "Trip Destination", value: item?.destination || "N/A" },
              { title: "Fuel Cost", value: `${item?.fuelCost || 0}$` },
            ]
          : [
              {
                title: "Driver Name",
                value: item?.driver?.displayName || "N/A",
              },
              {
                title: "Car Plate Number",
                value: item?.vehicle?.palletNumber || "N/A",
              },
              { title: "Issue Type", value: item?.faultType || "N/A" },
              {
                title: "Problem Description",
                value: item?.faultDetails || "N/A",
              },
              { title: "Status", value: item?.status || "N/A" },
              { title: "Cost", value: `${item?.cost || 0}$` },
              { title: "Location", value: item?.faultAddress || "N/A" },
            ];

        return (
          <div
            key={index}
            className="bg-[#FFFFFF] w-[95%] lg:ml-4 mb-4 rounded-md shadow"
          >
            <div
              className={`${
                item.seen
                  ? "bg-stone-400"
                  : isTrip
                  ? "bg-[#4CAF50]"
                  : "bg-[#FA2E2E]"
              } rounded-tr-md rounded-tl-md`}
            >
              <div className="flex justify-between items-center p-2">
                <div className="flex items-center">
                  {isTrip ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <Settings className="w-6 h-6 text-white" />
                  )}
                  <span className="text-white font-medium text-lg ml-2">
                    {isTrip ? "Trip Completed" : "Fault Reported"}
                  </span>
                </div>
                <span className="text-white font-medium mr-2 break-words">
                  {formatDateTime(item?.reportedAt)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 pb-8">
              {reportDetails.map((detail, i) => (
                <div
                  key={i}
                  className={`bg-[#E8E8E8] rounded-xl border-l-4 ${
                    isTrip ? "border-[#4880FF]" : "border-[#FA2E2E]"
                  } py-1 px-2`}
                >
                  <span className="block px-4 pb-1 font-semibold">
                    {detail.title}
                  </span>
                  <span className="block px-4 pb-3 break-words">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white">
              <hr className="border-t-2 border-gray-400 mb-2" />
              <div className="flex flex-col gap-2 px-2 pb-4">
                <div className="flex justify-end gap-2">
                  {item.seen === false && (
                    <button
                      onClick={() => {
                        const url =
                          item.reportType === "Fault"
                            ? `https://veemanage.runasp.net/api/Trip/Report/Fault/Report/Fault/${item.id}/mark-as-seen`
                            : `https://veemanage.runasp.net/api/TripReport/Report/Regular/${item.id}/mark-as-seen`;
                        markAsSeenMutation(url);
                      }}
                      className="bg-[#3567DB] text-white px-5 py-2 rounded-xl my-2"
                    >
                      Mark as Seen
                    </button>
                  )}

                  {!isTrip && openCardId !== item.id && (
                    <button
                      onClick={() => {
                        setOpenCardId(item?.id);
                        setVehicleId(item?.vehicle?.id);
                      }}
                      className="bg-[#FF9800] text-white px-5 py-2 rounded-xl my-2"
                    >
                      Send To Mechanic
                    </button>
                  )}
                </div>

                {openCardId === item.id && !isTrip && (
                  <div className="flex flex-col gap-2 w-full px-2">
                    <textarea
                      className="border p-2 rounded-md"
                      placeholder="Enter Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex justify-between items-center">
                      <select
                        value={selectedMechanic}
                        onChange={(e) => setSelectedMechanic(e.target.value)}
                        className="border px-3 py-2 rounded-md"
                      >
                        <option value="">Select Mechanic</option>
                        {mechanics.map((mechanic) => (
                          <option key={mechanic.id} value={mechanic.id}>
                            {mechanic.displayName}
                          </option>
                        ))}
                      </select>
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => {
                            sendToMechanicMutation({
                              mechanicId: selectedMechanic,
                              vehicleId: vehicleId,
                              description: description,
                            });
                            setOpenCardId(null);
                            setDescription("");
                            setSelectedMechanic("");
                            setVehicleId("");
                          }}
                          className="bg-green-600 text-white px-4 py-2 rounded-md"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => {
                            setOpenCardId(null);
                            setDescription("");
                            setSelectedMechanic("");
                            setVehicleId("");
                          }}
                          className="bg-gray-400 text-white px-4 py-2 rounded-md"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ReportCard;

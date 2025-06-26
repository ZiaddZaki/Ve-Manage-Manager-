import { Settings, Check } from "lucide-react";
import Loader from "../Loader/Loader";

const ReportCard = ({ data, isLoading, formatDateTime }) => {
  if (isLoading)
    return (
      <div className="text-center">
        <Loader/>
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
              {
                title: "Trip Destination",
                value: item?.destination || "N/A",
              },
              {
                title: "Fuel Cost",
                value: `${item?.fuelCost || 0}$`,
              },
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
              {
                title: "Issue Type",
                value: item?.faultType || "N/A",
              },
              {
                title: "Problem Description",
                value: item?.faultDetails || "N/A",
              },
              {
                title: "Status",
                value: item?.status || "N/A",
              },
              {
                title: "Cost",
                value: `${item?.cost || 0}$`,
              },
              {
                title: "Location",
                value: item?.faultAddress || "N/A",
              },
            ];

        return (
          <div key={index}>
            <div
              className={`${
                isTrip ? "bg-[#4CAF50]" : "bg-[#FA2E2E]"
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

            <div className="grid grid-cols-2 gap-4 p-4 bg-white pb-8">
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
              <div className="flex justify-end gap-2 px-2">
                <button className="bg-[#3567DB] text-white px-5 py-2 rounded-xl my-2">
                  Mark as Seen
                </button>
                {!isTrip && (
                  <button className="bg-[#FF9800] text-white px-5 py-2 rounded-xl my-2">
                    Send To Mechanic
                  </button>
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

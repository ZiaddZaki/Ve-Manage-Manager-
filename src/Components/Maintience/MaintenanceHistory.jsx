import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Clock, CheckCircle, Wrench, Loader } from "lucide-react";
import FetchWrapper from "../FetchWrapper";
import { FaCar } from "react-icons/fa";

const MaintenanceHistory = () => {
  async function fetchHistory() {
    try {
      const res = await axios.get(
        "https://veemanage.runasp.net/api/Maintenance/Request",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res?.data?.data);

      return res.data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ["maintenanceHistory"],
    queryFn: fetchHistory,
  });

  isLoading && (
    <div>
      <Loader />
    </div>
  );

  return (
    <>
      <div className="text-center mb-7 w-[100%] py-[0.5rem]  bg-stone-200 text-stone-700 border border-stone-300   rounded-md shadow-sm font-semibold text-xl">
          Maintenance History
      </div>
      <div className="p-6 grid lg:grid-cols-2 gap-7 md:w-[95%] mx-auto">
        <FetchWrapper data={data} isLoading={isLoading}>
          {data?.map((item) => {
            const maintenanceDate = new Date(item.date).toLocaleDateString();

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-5 mb-6 border-l-4 border-blue-500"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-3 items-center">
                    <FaCar size={24} className="text-blue-600" />

                    <h3 className="text-lg font-semibold text-blue-600">
                      {item.vehicle?.name} ({item.vehicle?.palletNumber})
                    </h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    📅 {maintenanceDate}
                  </span>
                </div>

                <p className="mb-2 text-gray-700">
                  <strong>Category:</strong> {item.maintenaceCategory}
                </p>

                <p className="mb-2 text-gray-700">
                  <strong>Description:</strong> {item.description}
                </p>

                <p className="mb-2 text-gray-700 flex items-center gap-2">
                  <strong>Status:</strong>{" "}
                  {item.status === "Pending" ? (
                    <span className="text-yellow-600 flex items-center gap-1">
                      <Clock size={16} /> Pending
                    </span>
                  ) : (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle size={16} /> Done
                    </span>
                  )}
                </p>

                <p className="mb-2 text-gray-700">
                  <strong>Mechanic:</strong> {item.mechanic?.displayName} (
                  {item.mechanic?.phoneNumber})
                </p>

                <p className="mb-2 text-gray-700">
                  <strong>Manager:</strong> {item.manager?.displayName}
                </p>

                {item.parts?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2 text-gray-800 flex items-center gap-1">
                      <Wrench size={18} /> Parts Used:
                    </h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
                      {item.parts.map((part) => (
                        <li key={part.id}>
                          {part.name} — Qty: {part.quantity} — Cost: {part.cost}{" "}
                          EGP
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </FetchWrapper>
      </div>
    </>
  );
};

export default MaintenanceHistory;

import { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowDownZA,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { FaBus, FaCar } from "react-icons/fa";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FetchWrapper from "../FetchWrapper";
import { NavLink } from "react-router";

export default function MaintenanceCard() {
  const [selectMode, setSelectMode] = useState(false);
  const [selectedParts, setSelectedParts] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState("");
  const [cardIndex, setCardIndex] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [description, setDescription] = useState("");

  function handleToggle(index) {
    if (index == cardIndex) {
      setCardIndex(null); //close if already opened
    } else {
      setCardIndex(index); //open a card
    }
  }
  console.log(selectedMechanic);
  async function getData(api) {
    try {
      const res = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res?.data);
      return res?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  const { data: MaintainceData, isLoading: isMaintainceLoading } = useQuery({
    queryFn: () =>
      getData(
        "https://veemanage.runasp.net/api/MaintenanceeTracking/vehicle-with-due-parts"
      ),
    queryKey: ["MaintainceData"],
  });
  const { data: mechanicsData, isLoading: isMechanincsLoading } = useQuery({
    queryFn: () =>
      getData("https://veemanage.runasp.net/api/User/all/mechanic"),
    queryKey: ["mechanicData"],
  });

  async function sendMaintaince() {
    try {
      const res = await axios.post(
        "https://veemanage.runasp.net/api/Maintenance/Request",
        {
          mechanicId: selectedMechanic,
          vehicleId: selectedVehicleId,
          maintenanceCategory: 1,
          description: description,
          parts: selectedParts,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("data sent success", res);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  const queryClient = useQueryClient();
  const { mutate, isLoading: isSending } = useMutation({
    mutationFn: sendMaintaince,
    onSuccess: () => {
      toast.success("Sent!");
      setSelectMode(false);
      setSelectedParts([]);
      setSelectedMechanic("");
      setDescription("");
      setSelectedVehicleId("");
      queryClient.invalidateQueries({ queryKey: ["MaintainceData"] });
    },

    onError: (error) => {
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        const allMessages = Object.values(errors).flat();
        toast.error(allMessages.join(" - "));
      } else {
        toast.error("Something went wrong");
      }

      setSelectMode(false);
      setSelectedParts([]);
      setSelectedMechanic("");
      setDescription("");
      setSelectedVehicleId("");
    },
  });

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedParts([]);
  };

  return (
    <div>
      <ToastContainer />
      <div className="text-center mb-7 w-[100%] py-[0.5rem]  bg-stone-200 text-stone-700 border border-stone-300   rounded-md shadow-sm font-semibold text-xl">
        Maintience
      </div>
      <div className="MaintainceHistory  text-end mr-5">
        <button className="bg-blue-600 p-3 text-white rounded-xl hover:bg-blue-700 transition">
          <NavLink to={"/maintience/history"}>Maintaince History</NavLink>
        </button>
      </div>
      <FetchWrapper data={MaintainceData} isLoading={isMaintainceLoading}>
        <div className="p-6 max-w-6xl mx-auto">
          {MaintainceData?.map((MaintainceItem, index) => {
            const isDue = MaintainceItem.dueParts.some((part) => part.isDue);
            console.log(selectedParts);
            return (
              <div
                className="bg-white rounded-xl shadow-md px-6 py-3 w-full mb-4 relative z-1"
                key={index}
              >
                {isDue ? (
                  <span className="flex items-center text-red-500 font-medium z-10 absolute -top-3 -left-4 ">
                    <AlertTriangle className="w-10 h-6 " />
                  </span>
                ) : (
                  <span className="flex items-center text-yellow-500 font-medium z-10 absolute -top-3 -left-4">
                    <Clock className="w-8 h-6 mr-1" />
                  </span>
                )}

                <div
                  className="flex flex-col  md:flex-row lg:items-center justify-between gap-5 mb-4 cursor-pointer"
                  onClick={() => {
                    handleToggle(index);
                  }}
                >
                  <div className="flex items-start gap-4">
                    <FaCar className="text-blue-500 " size={28} />

                    <div>
                      <div className="flex gap-4 mb-3">
                        <div className="text-xl font-semibold">
                          {MaintainceItem.brandName} {MaintainceItem.modelName}{" "}
                          {new Date(MaintainceItem.modelYear).getFullYear()}
                        </div>
                        {cardIndex !== index ? (
                          <ChevronDown className="w-10 h-8 text-blue-600" />
                        ) : (
                          <ChevronUp className="w-10 h-8 text-blue-600" />
                        )}
                      </div>

                      <p className="text-gray-500 text-sm mb-2">
                        Plate: {MaintainceItem?.plateNumber}
                      </p>
                      <p className="text-gray-500 text-sm mb-2">
                        Category: {MaintainceItem.categoryName}
                      </p>
                      <p className="text-blue-600 text-sm font-semibold ">
                        Current KM: {MaintainceItem.currentOdometerKM}
                      </p>
                    </div>
                  </div>

                  {!selectMode && (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition whitespace-nowrap text-center w-[11rem] h-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectMode(true);
                        setCardIndex(index);
                        setSelectedVehicleId(MaintainceItem.vehicleId);
                      }}
                    >
                      Send to Mechanic
                    </button>
                  )}
                </div>

                {selectMode && cardIndex == index && (
                  <select
                    className="border p-2 rounded-md w-[49%] mb-1"
                    onChange={(e) => setSelectedMechanic(e.target.value)}
                  >
                    <option value="">Select Mechanic</option>
                    {isMechanincsLoading
                      ? "loading..."
                      : mechanicsData.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.displayName}
                          </option>
                        ))}
                  </select>
                )}
                <div
                  className={`grid lg:grid-cols-2 gap-4 mt-4  overflow-hidden transition-[max-height] duration-300  ${
                    cardIndex === index
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  {MaintainceItem?.dueParts.map((part, idx) => {
                    const nextDate = new Date(
                      part.nextChangeDate
                    ).toLocaleDateString();
                    return (
                      <div
                        key={idx}
                        className="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <p className="mb-1">
                            <strong>Part:</strong> {part.partName}
                          </p>
                          <p className="mb-1">
                            <strong>Last Changed:</strong>
                            {part.lastReplacedAtKm} km
                          </p>
                          <p className="mb-1">
                            <strong>Next Change:</strong> {part.nextChangeKm} km
                          </p>
                          <p className="mb-1">
                            <strong>Change Date:</strong> {nextDate}
                          </p>
                        </div>

                        <div className="text-right">
                          {part.isDue && (
                            <span className="flex items-center text-red-500 font-medium">
                              <AlertTriangle className="w-10 h-6" /> Warning
                            </span>
                          )}
                          {part.isAlmostDue && (
                            <span className="flex items-center text-yellow-500 font-medium">
                              <Clock className="w-4 h-4 mr-1" /> Near to
                              maintaince
                            </span>
                          )}

                          {selectMode && (
                            <input
                              type="checkbox"
                              className="mt-2 w-5 h-5"
                              checked={selectedParts.includes(part.partId)}
                              value={part.partId}
                              onChange={() => {
                                if (selectedParts.includes(part.partId)) {
                                  setSelectedParts(
                                    selectedParts.filter(
                                      (id) => id !== part.partId
                                    )
                                  );
                                } else {
                                  setSelectedParts([
                                    ...selectedParts,
                                    part.partId,
                                  ]);
                                }
                              }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {selectMode && cardIndex === index && (
                  <div className="flex gap-12 justify-between items-center mt-4 ">
                    <textarea
                      name=""
                      id=""
                      placeholder="description"
                      className="w-[50%] h-[50px] border border-stone-400 shadow-sm p-2 rounded-lg outline-none"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <div
                      className="flex gap-3 mt-3 justify-end"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className={` text-white px-4 py-2 rounded-md hover:bg-blue-700 ${
                          isSending ? "bg-blue-300" : "bg-blue-600"
                        }`}
                        onClick={() => mutate()}
                        disabled={isSending}
                      >
                        {isSending ? "Sending..." : "Confirm"}
                      </button>
                      <button
                        className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                        onClick={toggleSelectMode}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </FetchWrapper>
    </div>
  );
}

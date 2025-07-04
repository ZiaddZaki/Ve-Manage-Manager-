import { useState } from "react";
import {
  AlertCircle,
  ArrowDown,
  ArrowDownZA,
  CheckCircle,
  ChevronDown,
  Clock,
} from "lucide-react";

const vehicles = [
  {
    vehicleId: "vehicle-123",
    name: "Audi Q3 Sportsback",
    image: "/car-image.jpg",
    category: "Car",
    plateNumber: "123abc",
    dueParts: [
      {
        partName: "Brake Pads",
        isDue: true,
        isAlmostDue: false,
        lastReplacedAtKm: 10000,
        nextChangeKm: 19900,
        nextChangeDate: "2025-07-30T20:29:08.4446521",
        currentKm: 20000,
      },
      {
        partName: "Air Filter",
        isDue: false,
        isAlmostDue: true,
        lastReplacedAtKm: 15000,
        nextChangeKm: 22000,
        nextChangeDate: "2025-08-15T12:00:00.000Z",
        currentKm: 20000,
      },
      {
        partName: "Engine Oil",
        isDue: true,
        isAlmostDue: false,
        lastReplacedAtKm: 12000,
        nextChangeKm: 18000,
        nextChangeDate: "2025-07-20T09:00:00.000Z",
        currentKm: 20000,
      },
      {
        partName: "Coolant",
        isDue: false,
        isAlmostDue: false,
        lastReplacedAtKm: 10000,
        nextChangeKm: 30000,
        nextChangeDate: "2025-12-30T10:00:00.000Z",
        currentKm: 20000,
      },
    ],
  },
];

const mechanics = [
  { id: "1", name: "Mohamed Salah" },
  { id: "2", name: "Ahmed Ali" },
  { id: "3", name: "Mina Magdy" },
];

export const StatusBadge = ({ isDue, isAlmostDue }) => {
  if (isDue)
    return (
      <span className="flex items-center text-red-500 font-medium">
        <AlertCircle className="w-4 h-4 mr-1" /> Due
      </span>
    );
  if (isAlmostDue)
    return (
      <span className="flex items-center text-yellow-500 font-medium">
        <Clock className="w-4 h-4 mr-1" /> Almost Due
      </span>
    );
  return (
    <span className="flex items-center text-green-500 font-medium">
      <CheckCircle className="w-4 h-4 mr-1" /> Good
    </span>
  );
};

export default function MaintenanceCard() {
  const vehicle = vehicles[0];
  const [selectMode, setSelectMode] = useState(false);
  const [selectedParts, setSelectedParts] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedParts([]);
  };

  const handleSelect = (partName) => {
    setSelectedParts((prev) =>
      prev.includes(partName)
        ? prev.filter((p) => p !== partName)
        : [...prev, partName]
    );
  };

  const handleSendToMechanic = () => {
    if (!selectedMechanic || selectedParts.length === 0) {
      alert("Select a mechanic and at least one part.");
      return;
    }

    selectedParts.forEach((partName) => {
      const part = vehicle.dueParts.find((p) => p.partName === partName);
      const payload = {
        mechanicId: selectedMechanic,
        vehicleId: vehicle.vehicleId,
        maintenanceCategoryId: "replace-me",
        description: `Send ${partName} for maintenance`,
      };
      console.log("Sending to mechanic:", payload);
      // axios.post("/api/send-maintenance", payload)
    });

    alert("Sent!");
    setSelectMode(false);
    setSelectedParts([]);
    setSelectedMechanic("");
  };

  return (
    <div>
      <div className="text-center mb-7 w-[100%] py-[0.5rem]  bg-stone-200 text-stone-700 border border-stone-300   rounded-md shadow-sm font-semibold text-xl">
        Maintience
      </div>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 w-full">
          {/* Header with toggle and actions */}
          <div
            className="flex flex-col  md:flex-row items-center justify-between gap-5 mb-4 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-4">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <div className="flex gap-4">
                  <h2 className="text-xl font-bo  ld">{vehicle.name}</h2>
                  <ChevronDown className="w-10 h-8 text-blue-600" />
                </div>

                <p className="text-gray-500 text-sm">
                  Plate: {vehicle.plateNumber}
                </p>
                <p className="text-gray-500 text-sm">
                  Category: {vehicle.category}
                </p>
                <p className="text-blue-600 text-sm font-semibold mt-1">
                  Current KM: {vehicle.dueParts[0].currentKm}
                </p>
              </div>
            </div>

            {!selectMode ? (
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectMode(true);
                }}
              >
                Send to Mechanic
              </button>
            ) : (
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <select
                  className="border px-2 py-1 rounded-md"
                  onChange={(e) => setSelectedMechanic(e.target.value)}
                >
                  <option value="">Select Mechanic</option>
                  {mechanics.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  onClick={handleSendToMechanic}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                  onClick={toggleSelectMode}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Parts section */}
          {isExpanded && (
            <div className="grid lg:grid-cols-2 gap-4 mt-4">
              {vehicle.dueParts.map((part, idx) => {
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
                        <strong>Last Changed:</strong> {part.lastReplacedAtKm}{" "}
                        km
                      </p>
                      <p className="mb-1">
                        <strong>Next Change:</strong> {part.nextChangeKm} km
                      </p>
                      <p className="mb-1">
                        <strong>Change Date:</strong> {nextDate}
                      </p>
                    </div>

                    <div className="text-right">
                      <StatusBadge
                        isDue={part.isDue}
                        isAlmostDue={part.isAlmostDue}
                      />
                      {selectMode && (
                        <input
                          type="checkbox"
                          className="mt-2 w-5 h-5"
                          checked={selectedParts.includes(part.partName)}
                          onChange={() => handleSelect(part.partName)}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

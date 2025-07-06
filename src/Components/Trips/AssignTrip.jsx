import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import Popup from "../Popup/Popup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";

const AssignTrip = () => {
  const schema = Yup.object().shape({
    driverId: Yup.string().required("Driver ID is required"),
    vehicleId: Yup.string().required("Vehicle ID is required"),
    tripType: Yup.number()
      .required("Trip type is required")
      .oneOf([1], "Trip type must be 1"),
    date: Yup.string(),
    details: Yup.string().required("Details are required"),
    pickupLocation: Yup.string().required("Pickup location is required"),
    destination: Yup.string().required("Destination is required"),
  });

  const defaultValues = {
    driverId: "",
    vehicleId: "",
    // categoryId:"",
    tripType: 1,
    date: "",
    details: "",
    pickupLocation: "",
    destination: "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState("");
  const [tempDate, setTempDate] = useState("");
  const [Finaldate, setFinalDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  console.log("category id", categoryId);

  async function getDrivers() {
    try {
      const res = await axios.get("https://veemanage.runasp.net/api/User/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          Role: "driver",
          TripDate: Finaldate,
          filter: "FreeDrivers",
        },
      });
      console.log("drivers data", res?.data);
      return res?.data;
    } catch (err) {
      console.error("Failed to fetch drivers:", err.message);
      throw err;
    }
  }

  const { data: driversData, isLoading: isDriverDataLoading } = useQuery({
    queryFn: getDrivers,
    queryKey: ["driverData", Finaldate],
  });

  async function getVehicles() {
    try {
      const res = await axios.get("https://veemanage.runasp.net/api/Vehicle/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          CategoryId: categoryId,
          TripDate: Finaldate,
          AvailableForTrip: true,
        },
      });
      console.log("vehicles", res?.data);
      return res?.data;
    } catch (err) {
      throw err;
    }
  }
  async function getCategory() {
    try {
      const res = await axios.get(
        "https://veemanage.runasp.net/api/Vehicle/Category",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("category", res?.data);
      return res?.data;
    } catch (err) {
      throw err;
    }
  }

  const { data: vehiclesData, isLoading: isVehiclesDataLoading } = useQuery({
    queryFn: getVehicles,
    queryKey: ["vehiclesData", categoryId, Finaldate],
  });
  const { data: categoryData, isLoading: isCategoryLoading } = useQuery({
    queryFn: getCategory,
    queryKey: ["categoryData"],
  });

  async function onSubmit(data) {
    setIsLoading(true);
    console.log("data to be sent", data);

    try {
      const res = await axios.post(
        "https://veemanage.runasp.net/api/TripRequest/",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      toast.success("Trip is Sent");
      setIsPopupOpen(true);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      setError(errorMessage);
      toast.error(errorMessage);
    }
    setIsLoading(false);
  }
  //   console.log("final date",Finaldate);
  // console.log("temp date",tempDate);

  return (
    <>
      <div className="main">
        <div className="head text-center">
          <span className="font-bold text-2xl">Assign Trip to Driver</span>
        </div>
        <ToastContainer />

        {Error && <div className="text-red-500 text-center mt-4">{Error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 ml-6">
            <div className="flex flex-col items-start p-4 ml-6">
              <span className="mb-2 text-lg font-medium font-Nunito text-[#666666]">
                Trip Date
              </span>
              <input
                type="date"
                {...register("date")}
                name="date"
                className="border border-stone-400 rounded-md px-3 py-2 h-[50px] w-[100%] focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e) => {
                  setTempDate(e.target.value);
                  setValue("date", e.target.value);
                }}
                onBlur={() => {
                  setFinalDate(tempDate);
                }}
              />

              {errors.date && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.date.message}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start p-4 ml-6">
              <span className="mb-2 text-lg font-medium font-Nunito text-[#666666]">
                Category
              </span>
              <div className="relative w-[100%]">
                <select
                  className="appearance-none border border-stone-400 rounded-md px-3 py-2 h-[50px] w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                  disabled={isCategoryLoading}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="" disabled>
                    {isCategoryLoading
                      ? "Loading Categories..."
                      : "Select Category..."}
                  </option>
                  {categoryData?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-8 text-blue-600" />
              </div>
            </div>

            {/* Driver ID (Select) */}
            <div className="flex flex-col items-start p-4 ml-6">
              <span className="mb-2 text-lg font-medium font-Nunito text-[#666666]">
                Driver
              </span>
              <div className="relative w-[100%]">
                <select
                  {...register("driverId")}
                  className="appearance-none border border-stone-400 rounded-md px-3 py-2 h-[50px] w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                  disabled={Finaldate == "" || isDriverDataLoading}
                >
                  <option value="" disabled>
                    {isDriverDataLoading
                      ? "Loading drivers..."
                      : "Select driver..."}
                  </option>
                  {driversData?.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.displayName}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-8 text-blue-600" />
                {errors.driverId && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.driverId.message}
                  </span>
                )}
              </div>
            </div>

            {/* Vehicle ID (Select) */}
            <div className="flex flex-col items-start p-4 ml-6">
              <span className="mb-2 text-lg font-medium font-Nunito text-[#666666]">
                Vehicle
              </span>
              <div className="relative w-[100%]">
                <select
                  {...register("vehicleId")}
                  className="appearance-none border border-stone-400 rounded-md px-3 py-2 h-[50px] w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                  disabled={
                    (Finaldate == "" && categoryId == "") ||
                    isVehiclesDataLoading
                  }
                >
                  <option value="" disabled>
                    {isVehiclesDataLoading
                      ? "Loading vehicles..."
                      : "Select vehicle..."}
                  </option>
                  {vehiclesData?.map(
                    (vehicle) =>
                      vehicle.status == "Active" && (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.name}
                        </option>
                      )
                  )}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-8 text-blue-600" />
                {errors.vehicleId && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.vehicleId.message}
                  </span>
                )}
              </div>
            </div>

            {/* Trip Type (Select) */}
            <div className="flex flex-col items-start p-4 ml-6">
              <span className="mb-2 text-lg font-medium font-Nunito text-[#666666]">
                Trip Type
              </span>
              <div className="relative w-[100%]">
                <select
                  {...register("tripType")}
                  className="appearance-none border border-stone-400 rounded-md px-3 py-2 h-[50px] w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="" disabled>
                    Select trip type...
                  </option>
                  <option value={1}>Daily</option>
                  <option value={2}>Trip</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-8 text-blue-600" />
                {errors.tripType && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.tripType.message}
                  </span>
                )}
              </div>
            </div>

            {/* Trip Date */}

            {/* Pickup Location */}
            <div className="flex flex-col items-start p-4 ml-6">
              <span className="mb-2 text-lg font-medium font-Nunito text-[#666666]">
                Pickup Location
              </span>
              <input
                type="text"
                placeholder="Enter pickup location..."
                {...register("pickupLocation")}
                className="border border-stone-400 rounded-md px-3 py-2 h-[50px] w-[100%] focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.pickupLocation && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.pickupLocation.message}
                </span>
              )}
            </div>

            {/* Pickup Latitude */}

            {/* Pickup Longitude */}

            {/* Destination */}
            <div className="flex flex-col items-start p-4 ml-6">
              <span className="mb-2 text-lg font-medium font-Nunito text-[#666666]">
                Destination
              </span>
              <input
                type="text"
                placeholder="Enter destination..."
                {...register("destination")}
                className="border border-stone-400 rounded-md px-3 py-2 h-[50px] w-[100%] focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.destination && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.destination.message}
                </span>
              )}
            </div>

            {/* Destination Longitude */}
          </div>

          {/* Details */}
          <div className="col-span-2 flex flex-col items-start p-4 ml-6">
            <span className="text-lg font-medium font-Nunito text-[#666666]">
              Details
            </span>
            <textarea
              placeholder="Additional info..."
              {...register("details")}
              className="border border-stone-400 rounded-md px-3 py-2 w-[90%] h-[150px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.details && (
              <span className="text-red-500 text-sm mt-1">
                {errors.details.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center p-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-blue-400"
            >
              {isLoading ? "Submitting..." : "Assign Trip"}
            </button>
          </div>
        </form>
        {isPopupOpen && (
          <Popup
            status={true}
            link={"/trips"}
            onClose={() => setIsPopupOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default AssignTrip;

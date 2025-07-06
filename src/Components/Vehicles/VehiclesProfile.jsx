import React from 'react'
import Profile from '../Profile/Profile'
import { useParams } from 'react-router'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function VehiclesProfile() {
   const {id}= useParams()
    const {data, isLoading} = useQuery({
     queryKey: ["vehicle"],
     queryFn: getVehicleById,
    });

   async function getVehicleById() {
    try {
      const response = await axios.get(
        `https://veemanage.runasp.net/api/Vehicle/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }   );
        return response?.data;
    }
     catch (error) {
      console.error("Error fetching vehicles:", error);
      return error;
    }  
   }
    data&&console.log("Vehicles data:", data);

  return <>
  <div className='bg-white p-4 rounded-md shadow-md '>
    <div className="title flex justify-between p-2 border-b-2 border-gray-200">
      <div className="modelName text-blue-500 font-bold text-2xl"> { data?.vehicleModel?.brand?.name } { data?.vehicleModel?.name} </div>
      <div className={`status ${data?.status === "Available" ? "bg-green-500" : "bg-red-500"}  text-white p-2 rounded-2xl px-5 font-bold`}>{data?.status}</div>
    </div>
    <div className="details grid md:grid-cols-2 p-2">
      <div className="parentItems">

      <div className='item flex flex-col gap-2'>
        <span className='text-gray-500'>Model Year</span>
        <span className='font-bold'>{data?.modelYear}</span>
      </div>

      <div className='item flex flex-col gap-2'>
        <span className='text-gray-500'>Category</span>
        <span className='font-bold'>{data?.vehicleModel?.category?.name}</span>
      </div>
      <div className='item flex flex-col gap-2'>
        <span className='text-gray-500'>Current Km</span>
        <span className='font-bold'>{data?.kmDriven}</span>
      </div>
      </div>
      <div className="parentItems">

      <div className='item flex flex-col gap-2'>
        <span className='text-gray-500'>Fuel Type</span>
        <span className='font-bold'>{data?.fuelType}</span>
      </div>
      <div className='item flex flex-col gap-2'>
        <span className='text-gray-500'>Plate Number</span>
        <span className='font-bold'>{data?.palletNumber}</span>
      </div>
    </div>
      </div>

  </div>
  </>
   
}

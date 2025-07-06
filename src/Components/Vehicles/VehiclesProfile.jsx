import React from 'react'
import Profile from '../Profile/Profile'
import { useParams } from 'react-router'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FaCar, FaToolbox, FaTools } from 'react-icons/fa';

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
  <div className="container p-2 grid md:grid-cols-12 gap-4">
   <div className="col-span-8">

  <div className='carInfo bg-white p-4 rounded-lg shadow-md  col-span-8 mb-4 '>
    
    <div className="title flex justify-between p-2 border-b-2 border-gray-200">
      <div className="modelName text-blue-500 font-bold text-xl flex items-center gap-3 "><FaCar size={26}/> { data?.vehicleModel?.brand?.name } { data?.vehicleModel?.name} </div>
      <div className={`status ${data?.status === "Available" ? "bg-green-500" : "bg-red-500"}  text-white p-2 rounded-2xl px-5 font-bold`}>{data?.status}</div>
    </div>
    <div className="details grid md:grid-cols-2 p-2">
      <div className="parentItems">

      <div className='item flex flex-col gap-2 mb-3'>
        <span className=' font-bold'>Model Year</span>
        <span className='text-gray-500'>{data?.modelYear}</span>
      </div>

      <div className='item flex flex-col gap-2 mb-3'>
        <span className=' font-bold'>Category</span>
        <span className='text-gray-500'>{data?.vehicleModel?.category?.name}</span>
      </div>
      <div className='item flex flex-col gap-2 mb-3'>
        <span className=' font-bold'>Current Km</span>
        <span className='text-gray-500'>{data?.kmDriven}</span>
      </div>
      <div className='item flex flex-col gap-2 mb-3'>
        <span className=' font-bold'>Fuel Efficiency</span>
        <span className='text-gray-500'>{data?.vehicleModel?.fuelEfficiency}</span>
      </div>
      </div>
      <div className="parentItems">

      <div className='item flex flex-col gap-2 mb-3'>
        <span className=' font-bold'>Fuel Type</span>
        <span className='text-gray-500'>{data?.fuelType}</span>
      </div>
      <div className='item flex flex-col gap-2 mb-3'>
        <span className=' font-bold'>Plate Number</span>
        <span className='text-gray-500'>{data?.palletNumber}</span>
      </div>
      <div className='item flex flex-col gap-2 mb-3'>
        <span className=' font-bold'>Joined Date</span>
        <span className='text-gray-500'>{data?.joinedYear}</span>
      </div>
    </div>
      </div>
         </div>
  <div className='MaintenanceHistory bg-white p-4 rounded-lg shadow-md  col-span-8 mb-4 '>
    
    <div className="title flex justify-between p-2 border-b-2 border-gray-200 mb-5">
      <div className="modelName text-blue-500 font-bold lg:text-xl flex items-center gap-3 "><FaTools/> Maintenance History </div>
    </div>
    <div className='mb-3 border-l-2 border-gray-300 p-4'>
      <div className="head">
        Major services and Repairs "Oil change, Air Filter"
      </div>
    </div>
   
         </div>


  </div>
  <div className='tripHistory col-span-4 rounded-lg bg-white shadow-md p-4' >

    <div className="title text-xl text-blue-500 font-bold p-2  border-b-2 border-gray-100 mb-3">
      Trips History
    </div>
    {data?.tripRequests?.map((trip,index) => (
      <div className='trip p-2 bg-blue-50 border border-blue-200  rounded-lg mb-2 text-sm' key={index}>
        <div className='flex justify-between gap-2 mb-1'><span className='font-bold'>from :</span> <span className=''>{trip?.pickupLocation}</span></div>
        <div className='flex justify-between gap-2 mb-1'><span className='font-bold'>to :</span> <span className=''>{trip?.destination}</span></div>
        <div className='flex justify-between gap-2 mb-1'><span className='font-bold'>Details :</span> <span className=''>{trip?.details}</span></div>
        <div className='flex justify-between gap-2 mb-1'><span className='font-bold'>Trip Type :</span> <span className=''>{trip?.tripType}</span></div>
        <div className='flex justify-between gap-2 mb-1'><span className='font-bold'>Date :</span> <span className=''>{trip?.date}</span></div>
        {trip?.isDaily&&
        <div className='flex justify-between gap-2 mb-1 text-blue-700 font-bold'>Daily Trip</div>}
        
      </div>
    ))}
  

  </div>
  

  </div>
  </>
   
}

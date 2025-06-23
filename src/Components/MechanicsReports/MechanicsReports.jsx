  import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
  import { IoCheckmarkDone } from "react-icons/io5";


  export default function MechanicsReports() {

    const {data,error,isLoading} = useQuery({
      queryKey: ["mechanicReports"],
      queryFn: getMechanicReports,
    });


    async function getMechanicReports(){
      try{
        const res=await axios.get("http://veemanage.runasp.net/api/Maintenance/Report/Initial/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if(res.status===200){
          console.log(res.data);
          
          return res.data;
      }
    }
      catch(err){
        console.error("Error fetching mechanic reports:", err);
        return [];
      }
    }
    
    return <>
      <div>
         <div className="text-center mb-7 w-[100%] py-[0.5rem]  bg-stone-200 text-stone-700 border border-stone-300   rounded-md shadow-sm font-semibold text-xl">
        Mechanics Reports
    </div>
            <div className="font-Inter font-[540] w-full p-1 md:p-3 text-[0.75rem] md:text-[0.9rem] lg:text-[1.1rem] flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 p-4">
    {data?.map(((report,index ) => (
          <div className="bg-[#FFFFFF] p-3 rounded  border-l-8 border-yellow-500 flex flex-col " key={index}>
        <div className=" text-black font-semibold mb-3 text-xl  "> Initial Report </div>
          <div className=" flex flex-col gap-2 p-1">

          <div><span className="font-semibold">Vehicle : </span> Toyota corolla</div>
          <div><span className="font-semibold">Mechanic : </span> Ahmed Samir</div>
          <div><span className="font-semibold">Task Type : </span> Oil Change , Oil Filter , Air Filter</div>
          <div><span className="font-semibold">Expected Completion : </span> 2025-7-15</div>
          <div><span className="font-semibold">Comments : </span> Toyota corolla</div>
          </div>
          <button className="bg-blue-500 text-white rounded-lg py-2 px-3 mt-4 ml-auto hover:bg-blue-700 flex items-center gap-1"> <IoCheckmarkDone/>  Mark as Seen</button>

      </div>
   
      /* <div className="bg-[#FFFFFF] p-3 rounded  border-l-8 border-green-500 flex flex-col">
        <div className=" text-black font-semibold mb-3 text-xl  "> Final Report </div>
          <div className=" flex flex-col gap-2 p-1">

          <div><span className="font-semibold">Vehicle : </span> Toyota corolla</div>
          <div><span className="font-semibold">Mechanic : </span> Ahmed Samir</div>
          <div><span className="font-semibold">Task Type : </span> Oil Change , Oil Filter , Air Filter</div>
          <div><span className="font-semibold">Expected Completion : </span> 2025-7-15</div>
          <div><span className="font-semibold">Comments : </span> Toyota corolla</div>
          </div>
          <button className="bg-blue-500 text-white rounded-lg py-2 px-3 mt-4 ml-auto hover:bg-blue-700 flex items-center gap-1"> <IoCheckmarkDone/>  Mark as Seen</button>

      </div> */

  )))}
  </div>
            </div>
        </div>
    </>
    
  }

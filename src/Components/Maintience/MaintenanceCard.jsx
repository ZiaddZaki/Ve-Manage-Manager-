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
import { useQuery } from "@tanstack/react-query";
import FetchWrapper from "../FetchWrapper";

export default function MaintenanceCard() {
  const [selectMode, setSelectMode] = useState(false);
  const [selectedParts, setSelectedParts] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState("");
  const [cardIndex, setCardIndex] = useState(null);
  function handleToggle(index){
    if (index==cardIndex) {

    setCardIndex(null) //close if already opened
    }
    else{
      setCardIndex(index) //open a card
    }

  }
  async function getData(api){
  try{
    const res=await axios.get(api,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    console.log(res?.data);
    return res?.data
    

  }
  catch(error){
    console.log(error);
    throw error;
  }
}
const {data:MaintainceData,isLoading:isMaintainceLoading}=useQuery({
  queryFn:()=>getData("https://veemanage.runasp.net/api/MaintenanceeTracking/vehicle-with-due-parts"),
  queryKey:["MaintainceData"]
})
const {data:mechanicsData,isLoading:isMechanincsLoading}=useQuery({
  queryFn:()=>getData("https://veemanage.runasp.net/api/User/all/mechanic"),
  queryKey:["mechanicData"]
})


  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedParts([]);
  };



  const handleSendToMechanic = () => {
    if (!selectedMechanic || selectedParts.length === 0) {
      toast.error("Select a mechanic and at least one part.");  
      return;
    }

    toast.success("Sent!");
    setSelectMode(false);
    setSelectedParts([]);
    setSelectedMechanic("");
  };

  return (
    <div>
      <ToastContainer/>
      <div className="text-center mb-7 w-[100%] py-[0.5rem]  bg-stone-200 text-stone-700 border border-stone-300   rounded-md shadow-sm font-semibold text-xl">
        Maintience
      </div>
      <FetchWrapper data={MaintainceData} isLoading={isMaintainceLoading}>

        <div className="p-6 max-w-6xl mx-auto" >
      {MaintainceData?.map((MaintainceItem,index)=>{
        const isDue = MaintainceItem.dueParts.some((part) => part.isDue);



          return(

        <div className="bg-white rounded-xl shadow-md px-6 py-3 w-full mb-4 relative z-1"key={index}>

         
            {isDue ?<span className="flex items-center text-red-500 font-medium z-10 absolute -top-3 -left-4 "> <AlertTriangle className="w-10 h-6 " /> 
          </span> :<span className="flex items-center text-yellow-500 font-medium z-10 absolute -top-3 -left-4">
        <Clock className="w-4 h-4 mr-1" /> 
      </span>}

          
          {/* Header with toggle and actions */}
          <div
            className="flex flex-col  md:flex-row lg:items-center justify-between gap-5 mb-4 cursor-pointer"
            onClick={() => {
              handleToggle(index)
              }}
          >
            <div className="flex items-start gap-4">
              <FaCar className="text-blue-500 " size={28} />
         
              <div>
                <div className="flex gap-4 mb-3">
                  <div className="text-xl font-semibold">{MaintainceItem.brandName} {MaintainceItem.modelName}  {new Date(MaintainceItem.modelYear).getFullYear()}
                  </div>
                  {cardIndex!==index ?<ChevronDown className="w-10 h-8 text-blue-600" /> :  <ChevronUp className="w-10 h-8 text-blue-600" />}
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
                  setCardIndex(index);}}
              >
                Send to Mechanic
              </button>
            )  
              
            }
          </div>

         {/* Parts section with animation */}
         {selectMode &&cardIndex==index&&<select
                  className="border p-2 rounded-md w-[49%] mb-1"
                  onChange={(e) => setSelectedMechanic(e.target.value)}
                >
                  <option value="">Select Mechanic</option>
                  {mechanicsData.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.displayName}
                    </option>
                  ))}
                </select>}
                <div
                  className={`grid lg:grid-cols-2 gap-4 mt-4  overflow-hidden transition-[max-height] duration-300  ${
                    cardIndex === index
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  {MaintainceItem?.dueParts.map((part, idx) => {
                    const nextDate = new Date(part.nextChangeDate).toLocaleDateString();
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
                            <strong>Last Changed:</strong> {part.lastReplacedAtKm} km
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
                              <Clock className="w-4 h-4 mr-1" /> Near to maintaince
                            </span>
                          )}
               

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
                       {selectMode&& cardIndex===index&&   <div className="flex gap-3 mt-3 justify-end" onClick={(e) => e.stopPropagation()}>
                
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 "
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
      }
      </div>
      ) })
      
      
    }
    </div>
                    </FetchWrapper>
    </div>
  );
}

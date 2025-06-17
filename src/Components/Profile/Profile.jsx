import React, {} from 'react';

import { FaUser } from 'react-icons/fa';

import { useParams } from 'react-router';


export default function Profile({ data }) {
  const { id } = useParams();

  

  return <>
      <div className="font-bold text-[1.25rem] mb-2">Details</div>
      <div className="info mb-12 border-b-2 border-gray-300 px-3 py-7 flex items-center font-Poppins capitalize">
        <div className="flex gap-5 items-center">
          <span className="icon text-4xl border rounded-[50%] p-4 border-gray-400">
            <FaUser />
          </span>
          <div className="flex flex-col gap-2">
            <span>{data && data?.firstName + ' ' + data?.lastName}</span>
            <span className='text-sm text-stone-500'>{data && "email : "+  data?.email }</span>
              </div>
        </div>

        <div className="btns ml-auto flex gap-3">
        
        </div>
      </div>
      <div className="data font-Poppins capitalize mb-8">
        
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-6 flex flex-col gap-2">
              <div className="label">First Name</div>
              <div className="field text-gray-500 bg-white rounded-md p-2">
                {data?.firstName || 'null'}
              </div>
            </div>
            <div className="col-span-6 flex flex-col gap-2">
              <div className="label">Last Name</div>
              <div className="field text-gray-500 bg-white rounded-md p-2">
                {data?.lastName || 'null'}
              </div>
            </div>
            <div className="col-span-6 flex flex-col gap-2">
              <div className="label">Role</div>
              <div className="field text-gray-500 bg-white rounded-md p-2">
                {data?.role || 'null'}
              </div>
            </div>
            <div className="col-span-6 flex flex-col gap-2">
              <div className="label">National Id</div>
              <div className="field text-gray-500 bg-white rounded-md p-2">
                {data?.nationalId || 'null'}
              </div>
            </div>
            <div className="col-span-6 flex flex-col gap-2">
              <div className="label">Date of Birth</div>
              <div className="field text-gray-500 bg-white rounded-md p-2">
                {data?.dateOfBirth || 'null'}
              </div>
            </div>
            <div className="col-span-6 flex flex-col gap-2">
              <div className="label">Phone Number</div>
              <div className="field text-gray-500 bg-white rounded-md p-2">
                {data?.phoneNumber || 'null'}
              </div>
            </div>
            <div className="col-span-3 flex flex-col gap-2">
              <div className="label">Street</div>
              <div className="field text-gray-500 bg-white rounded-md p-2">
                {data?.address?.street || 'null'}
              </div>
            </div>
            <div className="col-span-3 flex flex-col gap-2">
              <div className="label">Governorate</div>
              <div className="field text-gray-500 bg-white rounded-md p-2">
                {data?.address?.governorate || 'null'}
              </div>
            </div>
            <div className="col-span-3 flex flex-col gap-2">
              <div className="label">Country</div>
              <div className="field text-gray-500 bg-white rounded-md p-2">
                {data?.address?.country || 'null'}
              </div>
            </div>
            <div className="col-span-3 flex flex-col gap-2">
              <div className="label">Area</div>
              <div className="field text-gray-500 bg-white rounded-md p-2">
                {data?.address?.area || 'null'}
              </div>
            </div>
          </div>
        
    
      </div>
    </>
}
'use client'
import React, { useState } from 'react'
import { Modal } from 'src/components/modal/Modal';
import { SearchInput } from 'src/components/SearchInput';

const columns=["Name", "Reg No","Gender", "Class", "Roll No", "Monthly Fees", "Reg Fees", "Due Fees","Document", "Action",];

export default function Student() {
  const studentsData=[
    {
      id:1,registrationNo:"123456", name:"Pinki",gender:"Male",  class:"I", rollno:"12", monthlyFees:"1000", registrationFees:"5000", dueFees:"3000", document:"View Docs"
    },
     {
      id:2,registrationNo:"123456", name:"Pinki",gender:"Male", class:"I", rollno:"12", monthlyFees:"1000", registrationFees:"5000", dueFees:"3000",document:"View Docs"
    },
     {
      id:3,registrationNo:"123456", name:"Pinki", gender:"Male", class:"I", rollno:"12", monthlyFees:"1000", registrationFees:"5000", dueFees:"3000",document:"View Docs"
    }
    ,
     {
      id:4,registrationNo:"123456", name:"Pinki", gender:"Male", class:"I", rollno:"12",  monthlyFees:"1000", registrationFees:"5000",dueFees:"3000",document:"View Docs"
    }
  ]

  
  return (
    <div className='w-full flex text-black flex-col gap-2' >
      <div className='flex items-center justify-between'>
         <h1 className='text-2xl font-semibold text-white'>Student</h1>
         <div className='flex items-center gap-5'>
              <SearchInput/>
              <AddButton/>
         </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              {columns?.map(item=><th key={item} scope="col" className="px-6 py-3">{item}</th >)}
          </tr>
        </thead>
        <tbody>
          {studentsData?.map((item)=>{
            return(
              <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.registrationNo}</td>
                <td className="px-6 py-4">{item.gender}</td>
                <td className="px-6 py-4">{item.class}</td>
                <td className="px-6 py-4">{item.rollno}</td>
                <td className="px-6 py-4">{item.monthlyFees}</td>
                 <td className="px-6 py-4">{item.registrationFees}</td>
                <td className="px-6 py-4">{item.dueFees}</td>
                <td className="px-6 py-4">{item.document}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <EditButton/>
                  <DeleteButton/>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
     <AddStudentModal/>
    </div>
  )
}

const EditButton=()=>{
  return(
    <button className='px-3 py-1 bg-green-600 rounded-md text-white cursor-pointer'>Edit</button>
  )
}
const DeleteButton=()=>{
  return(
    <button className='px-3 py-1 bg-red-600 rounded-md text-white cursor-pointer'>Delete</button>
  )
}
const AddButton=()=>{
  return(
    <button className='px-5 py-2 bg-blue-600 rounded-md text-white cursor-pointer'>Add Student</button>
  )
}



export const AddStudentModal=()=>{
  const [open, setOpen]=useState(false);
  return(
     <Modal
      title={"Add Student"}
      open={open}
      onCancel={()=>{setOpen(false)}}
      onOk={()=>{
        console.log("sdfg")
      }}
      >
       <form>
        </form> 
      </Modal>
  )
}

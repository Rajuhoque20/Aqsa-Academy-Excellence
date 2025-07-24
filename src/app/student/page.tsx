'use client'
import React, { useState } from 'react'
import { Modal } from 'src/components/modal/Modal';
import { SearchInput } from 'src/components/SearchInput';
import { AddStudentModal } from './AddStudent';
import { AddButton, DeleteButton, EditButton } from 'src/components/Button';
import { DeleteStudent } from './DeleteStudent';

const columns=["Name", "Reg No","Gender", "Class", "Roll No", "Monthly Fees", "Reg Fees", "Due Fees","Document", "Action",];

export default function Student() {
  const [open, setOpen]=useState<boolean>(false);
  const [isEdit, setIsEdit]=useState(false);
  const [isDelete, setIsDelete]=useState(false);
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
               <AddButton onClick={()=>setOpen(true)}/>                     
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
                  <EditButton onClick={()=>setIsEdit(true)}/>
                  <DeleteButton onClick={()=>setIsDelete(true)}/>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
       <AddStudentModal open={open} type={"add"} setOpen={setOpen}/>
       <AddStudentModal open={isEdit} type='edit' setOpen={setIsEdit}/>
       <DeleteStudent open={isDelete} setOpen={setIsDelete}/>
    </div>
  )
}





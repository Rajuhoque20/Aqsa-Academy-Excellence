'use client'
import React, { useEffect, useState } from 'react'
import { SearchInput } from 'src/components/SearchInput';

import { AddButton, DeleteButton, EditButton } from 'src/components/Button';
import { DeleteStudent } from './DeleteStudent';
import axios from 'axios';
import { useRouter } from "next/navigation";

const columns=[
 {title: "Name", width:'15rem'},
 {title: "Email", width:'15rem'},
 {title: "Phone", width:'10rem'},
 {title:"Gender", width:'10rem'},
 {title: "Class (Cur)", width:'10rem'},
 {title: "Marks (Prev)", width:'10rem'},
 {title: "School (Prev)", width:'10rem'},
 {title: "Address", width:'10rem'},
 {title: "Father's Name", width:'10rem'},
 {title: "Mother's Name", width:'10rem'},
 {title: "Marksheet", width:'10rem'},
 {title: "Action", width:'10rem'},
  ];

export default function Student() {
  const [open, setOpen]=useState<boolean>(false);
  const [studentsData, setStudentsData]=useState([]);
  const [isEdit, setIsEdit]=useState(false);
  const [isDelete, setIsDelete]=useState(false);
  const [deleteParam, setDeleteParam]=useState({name:'', id:''});
  const [editParam, setEditParam]=useState();
  const [searchKey, setSearchKey]=useState('');
 
  const router=useRouter();

  const getStudents=()=>{
     axios.get('/api/newStudentRegistration')
    .then(res=>{
      if(res){
        console.log("Reeeesss",res)
        setStudentsData(res?.data);
      }
    })
    .catch(error=>{
      console.log(error)
    })
  }

  useEffect(()=>{
   getStudents();
  },[]);

  const searchData=!searchKey?studentsData:studentsData?.filter((item:any)=>item?.name?.toLowerCase()?.includes(searchKey?.trim()?.toLowerCase()))

  return (
    <div className='w-full flex text-black flex-col gap-2' >
      <div className='flex items-center justify-between'>
         <h1 className='text-2xl font-semibold text-white'>Candidates</h1>
         <div className='flex items-center gap-5'>
              <SearchInput onChange={(value:string)=>setSearchKey(value)} value={searchKey}/>
               {/* <AddButton onClick={()=>setOpen(true)} title='Add Student'/>                      */}
         </div>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              {columns?.map(item=><th key={item.title} scope="col" className={`px-6 py-3`} style={{ width: item.width }}>{item.title}</th >)}
          </tr>
        </thead>
        <tbody>
          {searchData?.map((item:any)=>{
            return(
              <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4 cursor-pointer" onClick={()=>{
                   router.push(`/student/${item._id}`);
                }}>{item.name}</td>
                <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.phone}</td>
                   <td className="px-6 py-4">{item.gender}</td>
                <td className="px-6 py-4">{item.class}</td>
                <td className="px-6 py-4">{item.marks}</td>
              
                <td className="px-6 py-4">{item.school}</td>
                 <td className="px-6 py-4">{item.address}</td>
                <td className="px-6 py-4">{item.father_name}</td>
                 <td className="px-6 py-4">{item.mother_name}</td>
                  <td className="px-6 py-4">
                    <a href={item.marksSheet} className='cursor-pointer text-blue-600'>View Marksheet</a>
                    
                    </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <EditButton onClick={()=>{setIsEdit(true);
                    setEditParam(item);
                  }}/>
                  <DeleteButton onClick={()=>{
                    setIsDelete(true);
                    setDeleteParam({name:item?.name, id:item?._id});

                  }}/>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
       <DeleteStudent open={isDelete} setOpen={setIsDelete} deleteParam={deleteParam} getStudents={getStudents}/>
    </div>
  )
}





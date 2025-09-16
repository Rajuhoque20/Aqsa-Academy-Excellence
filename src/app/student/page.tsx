'use client'
import React, { useEffect, useState } from 'react'
import { SearchInput } from 'src/components/SearchInput';
const AddStudentModal= React.lazy(()=>import('./AddStudent'));
import { AddButton, DeleteButton, EditButton } from 'src/components/Button';
const DeleteStudent =React.lazy(()=>import('./DeleteStudent'));
import axios from 'axios';
import { useRouter } from "next/navigation";
import Loader from 'src/components/Loader/Loader';
type StudentDTO={
  name:string,
  email:string,
  gender:string,
  current_class:string,
  rollno:string,
  regno?:string,
  father_name?:string,
  mother_name?:string,
  dueFees?:string,
  monthly_fees:string,
  registration_fees:string,
  _id?:string,
  phone:string,
  address:string
}
type DeleteDTO={
  name:string,
  id:string|undefined
}

const columns=["Name","Gender", "Class", "Reg No","Roll No", "Monthly Fees", "Reg Fees", "Due Fees","Action",];

export default function Student() {
  const [open, setOpen]=useState<boolean>(false);
  const [studentsData, setStudentsData]=useState([]);
  const [isEdit, setIsEdit]=useState(false);
  const [isDelete, setIsDelete]=useState(false);
  const [deleteParam, setDeleteParam]=useState<DeleteDTO|null>(null);
  const [editParam, setEditParam]=useState<StudentDTO|null>(null);
  const [searchKey, setSearchKey]=useState('');
  const [loading, setLoading]=useState(true);
 
  const router=useRouter();

  const getStudents=()=>{
     axios.get('/api/students')
    .then(res=>{
      if(res){
        setStudentsData(res?.data);
        setLoading(false);
      }
    })
    .catch(error=>{
      console.log(error);
      setLoading(false);
    })
  }

  useEffect(()=>{
   getStudents();
  },[]);

  const searchData=!searchKey?studentsData:studentsData?.filter((item:StudentDTO)=>item?.name?.toLowerCase()?.includes(searchKey?.trim()?.toLowerCase()))

  return (
    <div className='w-full flex text-black flex-col gap-2' >
      <div className='flex items-center justify-between'>
         <h1 className='text-2xl font-semibold text-white'>Students</h1>
         <div className='flex items-center gap-5'>
              <SearchInput onChange={(value:string)=>setSearchKey(value)} value={searchKey}/>
               <AddButton onClick={()=>setOpen(true)} title='Add Student'/>                     
         </div>
      </div>
      
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              {columns?.map(item=><th key={item} scope="col" className="px-6 py-3">{item}</th >)}
          </tr>
        </thead>
        <tbody>
          {loading?
          <tr>
            <td colSpan={12}><Loader/></td>
          </tr>
          :searchData?.map((item:StudentDTO)=>{
            return(
              <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4 cursor-pointer" onClick={()=>{
                   router.push(`/student/${item._id}`);
                }}>{item.name}</td>
                <td className="px-6 py-4">{item.gender}</td>
                  <td className="px-6 py-4">{item.current_class}</td>
                <td className="px-6 py-4">{item.regno}</td>
                <td className="px-6 py-4">{item.rollno}</td>
              
                <td className="px-6 py-4">{item.monthly_fees}</td>
                 <td className="px-6 py-4">{item.registration_fees}</td>
                <td className="px-6 py-4">{item.dueFees}</td>
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
       <AddStudentModal open={open} type={"add"} setOpen={setOpen} getStudents={getStudents} editParam={null}/>
       <AddStudentModal open={isEdit} type='edit' setOpen={setIsEdit} getStudents={getStudents} editParam={editParam}/>
       <DeleteStudent open={isDelete} setOpen={setIsDelete} deleteParam={deleteParam} getStudents={getStudents}/>
    </div>
  )
}





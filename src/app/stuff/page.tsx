
'use client'
import React, { useEffect, useState } from 'react'
import { SearchInput } from 'src/components/SearchInput';
import { AddButton, DeleteButton, EditButton } from 'src/components/Button';
import axios from 'axios';
import { useRouter } from "next/navigation";
import Loader from 'src/components/Loader/Loader';
import { useDebounce } from 'src/components/customHooks/useDeboune';
import { FaHandPointRight } from 'react-icons/fa';
const AddStuffModal = React.lazy(()=>import('./AddStuff'));
const DeleteStuff = React.lazy(()=>import('./DeleteStuff'));

const columns=["Name","Gender", "Designation", "Phone","Monthly Salary", "Due Salary","Action",];
interface StuffDTO{
  name:string,
  gender:string,
  designation:string,
  phone:string,
  monthly_salary:string,
  due_salary:number,
  _id?:string,
  address?:string,
}
interface DeleteDTO{
  name:string,
  id?:string|undefined
}

export default function Staff() {
  const [open, setOpen]=useState<boolean>(false);
  const [stuffData, setStuffData]=useState([]);
  const [isEdit, setIsEdit]=useState(false);
  const [isDelete, setIsDelete]=useState(false);
  const [deleteParam, setDeleteParam]=useState<DeleteDTO|null>(null);
  const [editParam, setEditParam]=useState<StuffDTO|null>(null);
  const [searchKey, setSearchKey]=useState('');
  const [loading, setLoading]=useState(true);
  const [searchData,setSearchData]=useState([]);
   const {debounceFetch}=useDebounce(stuffData, setSearchData,'name');
  const router=useRouter();
  const getStuff=()=>{
     axios.get('/api/stuff')
    .then(res=>{
      if(res){
        setStuffData(res?.data);
        setSearchData(res?.data);
        setLoading(false);
      }
    })
    .catch(error=>{
      console.log(error)
      setLoading(false);
    })
  }

  useEffect(()=>{
   getStuff();
  },[]);

  const handleChange=(value:string)=>{
        setSearchKey(value);
        debounceFetch(value);
    };


  return (
    <div className='w-full flex text-black flex-col gap-2' >
      <div className='flex items-center justify-between'>
         <h1 className='text-2xl font-semibold text-white'>Support Staff</h1>
         <div className='flex items-center gap-5'>
              <SearchInput onChange={handleChange} value={searchKey}/>
               <AddButton onClick={()=>setOpen(true)} title={"Add staff"}/>                     
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
                      </tr>:
          
                      searchData.length===0?
                      <tr>
                        <td colSpan={12}>
                          <div className="flex items-center justify-center w-full text-center h-[5rem]">
                            <p>No data found!</p>
                        </div>
                        </td>
                      </tr>          
                      :
          searchData?.map((item:StuffDTO)=>{
            return(
              <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4 cursor-pointer flex items-center gap-3 font-semibold text-blue-300 hover:scale-110 transition hover:underline" onClick={()=>{
                   router.push(`/stuff/${item._id}`);
                }}>{item.name}
                 <FaHandPointRight size={20}/>
                </td>
                <td className="px-6 py-4">{item.gender}</td>
                  <td className="px-6 py-4">{item.designation}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{item.monthly_salary}</td>
              
                <td className="px-6 py-4">{item.due_salary|0}</td>
                 
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
       <AddStuffModal open={open} type={"add"} setOpen={setOpen} getStuff={getStuff} editParam={null}/>
       <AddStuffModal open={isEdit} type='edit' setOpen={setIsEdit} getStuff={getStuff} editParam={editParam}/>
       <DeleteStuff open={isDelete} setOpen={setIsDelete} deleteParam={deleteParam} getStuff={getStuff}/>
    </div>
  )
}





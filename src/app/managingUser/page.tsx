
'use client'
import React, { useEffect, useState } from 'react'
import { SearchInput } from 'src/components/SearchInput';
import { AddButton, DeleteButton, EditButton } from 'src/components/Button';
import axios from 'axios';
import { AddManagingUserModal } from './addManagingUser';
import { DeleteManagingUser } from './deleteManagingUser';


const columns=["Name","Gender", "email", "Phone","Role","Action",];

export default function ManagingUser() {
  const [open, setOpen]=useState<boolean>(false);
  const [managingUsersData, setmanagingUsersData]=useState([]);
  const [isEdit, setIsEdit]=useState(false);
  const [isDelete, setIsDelete]=useState(false);
  const [deleteParam, setDeleteParam]=useState({name:'', id:''});
  const [editParam, setEditParam]=useState();
    const [searchKey, setSearchKey]=useState('');

  const getManagingUsers=()=>{
     axios.get('/api/managingUser')
    .then(res=>{
      if(res){
        setmanagingUsersData(res?.data);
      }
    })
    .catch(error=>{
      console.log(error)
    })
  }

  useEffect(()=>{
   getManagingUsers();
  },[]);

  const searchData=!searchKey?managingUsersData:managingUsersData?.filter((item:any)=>item?.name?.toLowerCase()?.includes(searchKey?.trim()?.toLowerCase()))

  return (
    <div className='w-full flex text-black flex-col gap-2' >
      <div className='flex items-center justify-between'>
         <h1 className='text-2xl font-semibold text-white'>Managing Users</h1>
         <div className='flex items-center gap-5'>
              <SearchInput onChange={(value:string)=>setSearchKey(value)} value={searchKey}/>
               <AddButton onClick={()=>setOpen(true)} title={"Add Managing User"}/>                     
         </div>
      </div>
      
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              {columns?.map(item=><th key={item} scope="col" className="px-6 py-3">{item}</th >)}
          </tr>
        </thead>
        <tbody>
          {searchData?.map((item:any)=>{
            return(
              <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4 cursor-pointer" >{item.name}</td>
                <td className="px-6 py-4">{item.gender}</td>
                  <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{item.role}</td>                                          
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
       <AddManagingUserModal open={open} type={"add"} setOpen={setOpen} getManagingUsers={getManagingUsers} editParam={{}}/>
       <AddManagingUserModal open={isEdit} type='edit' setOpen={setIsEdit} getManagingUsers={getManagingUsers} editParam={editParam}/>
       <DeleteManagingUser open={isDelete} setOpen={setIsDelete} deleteParam={deleteParam} getManagingUsers={getManagingUsers}/>
    </div>
  )
}





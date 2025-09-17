'use client'
import React, { useEffect, useState } from 'react'
import { SearchInput } from 'src/components/SearchInput';

import { Button, DeleteButton, EditButton } from 'src/components/Button';
import { DeleteStudent } from './DeleteStudent';
import axios from 'axios';
import { ConfirmModal } from 'src/components/confirmModal/ConfirmModal';
import CheckBox from 'src/components/Checkbox/Checkbox';
import Notification from 'src/components/Notification/Notifcation';
import Loader from 'src/components/Loader/Loader';
import { useDebounce } from 'src/components/customHooks/useDeboune';

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

  interface SelectDTO{
    name:string,
  }
  type CandidateDTO={
    _id:string,
    name:string,
    email:string,
    phone:string,
    father_name?:string,
    mother_name?:string,
    address:string,
    marksSheet?:string,
    school:string,
    marks:string,
    class:string,
    gender?:string
  };
export default function Student() {
  const [open, setOpen]=useState<boolean>(false);
  const [candidatesData, setCandidatesData]=useState([]);
  const [isDelete, setIsDelete]=useState(false);
  const [isAllSelectModal, setIsAllSelectModal]=useState(false);
  const [deleteParam, setDeleteParam]=useState({name:'', id:''});
  const [selectParam, setSelectParam]=useState<null|SelectDTO>(null);
  const [searchKey, setSearchKey]=useState('');
  const [loading, setLoading]=useState(false);
  const [isAllSelected, setIsAllSelected]=useState(false);
  const [selectedCandidates, setSelectedCandidates]=useState<string[]>([]);
  const [searchData, setSearchData]=useState([]);
  const {debounceFetch}=useDebounce(candidatesData, setSearchData,'name');

  const getCandidates=()=>{
     axios.get('/api/newStudentRegistration')
    .then(res=>{
      if(res){
        setCandidatesData(res?.data);
        setSearchData(res?.data);
        setLoading(false);
      }
    })
    .catch(error=>{
      console.log(error);
      setLoading(false);
    })
  }

  useEffect(()=>{
   getCandidates();
  },[]);

  const handleChange=(value:string)=>{
        setSearchKey(value);
        debounceFetch(value);
    };
const handleSelect=async()=>{
  try{
    setLoading(true);
    const method='post';
    const url='/api/newStudentRegistration';
    await axios({method,url,data:{...selectParam, type:'SELECT'}});
    getCandidates();
     Notification.success("Candidate has registered as student!");
  }
  catch(error){
    Notification.error('Something went wrong!');
    console.log(error)
  }
  finally{
    setOpen(false);
    setLoading(false);
  }
  
}

const handleCheckedCandidates=(id:string, type:string)=>{
  if(type==='add'){
    setSelectedCandidates(prev=>prev.includes(id)?prev:[...prev,id]);
  }
  else{
    setSelectedCandidates(prev=>prev.filter(el=>el!==id));
  }
}

const registerAllSelectedCandidatesAsStudents=async()=>{
  const method='post';
  const url='/api/newStudentRegistration/register-as-students';
  const data=selectedCandidates;
  try{
    await axios({method, url, data});
    getCandidates();
    setSelectedCandidates([]);
    Notification.success("Selected candidates have registered as students!");
    setIsAllSelectModal(false);
    setIsAllSelected(false);
  }
  catch(error){
    console.log(error);
    Notification.error('Something went wrong!');
  }
}

  return (
    <div className='w-full flex text-black flex-col gap-2' >
      <div className='flex items-center justify-between'>
         <h1 className='text-2xl font-semibold text-white'>Candidates</h1>
         <div className='flex items-center gap-5'>
            {selectedCandidates.length>0&&<Button type='primary' title='Register as Students' onClick={()=>setIsAllSelectModal(true)}/>}
              <SearchInput onChange={handleChange} value={searchKey}/>
         </div>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              {columns?.map((item,index)=><th key={item.title} scope="col" className={`px-6 py-3`} style={{ width: item.width }}>
              
                {index===0?<div className='flex item-center gap-5'>
                  <CheckBox checked={isAllSelected} onChange={(e)=>{
                    setIsAllSelected(e.target.checked);
                    if(e.target.checked){
                      setSelectedCandidates(searchData?.map((item:CandidateDTO)=>item._id));
                    }
                    else{
                      setSelectedCandidates([]);
                    }
                    
                  }}/>
                  <p> {item.title}</p>
                </div>:
                <p>{item.title}</p>}
                </th >)}
          </tr>
        </thead>
        <tbody>
           {loading?
          <tr>
            <td colSpan={12}><Loader/></td>
          </tr>:
            searchData?.length>0?
          searchData?.map((item:CandidateDTO)=>{
            return(
              <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4 cursor-pointer" >
                  <div className='flex item-center gap-5'>
                    <CheckBox checked={selectedCandidates?.includes(item._id)} onChange={(e)=>{
                      if(e.target.checked){
                         handleCheckedCandidates(item?._id,'add');
                      }
                      else
                      {
                         handleCheckedCandidates(item?._id,'remove');
                      }
                     
                    }}/>
                    <p> {item.name}</p>
                  </div>
                 </td>
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
                  <EditButton onClick={()=>{
                    setSelectParam(item);
                    setOpen(true);
                  }}
                  title='Register'
                  />
                  <DeleteButton onClick={()=>{
                    setIsDelete(true);
                    setDeleteParam({name:item?.name, id:item?._id});

                  }}/>
                </td>
              </tr>
            )
          }):
          <tr>
            <td  colSpan={12} className="text-center py-4">
              <p>No Candidates found!</p>
            </td>
          </tr>
        }
        </tbody>
      </table>
      </div>
       <DeleteStudent open={isDelete} setOpen={setIsDelete} deleteParam={deleteParam} getCandidates={getCandidates}/>
       <ConfirmModal
       open={open||isAllSelectModal}
       setOpen={isAllSelectModal?setIsAllSelectModal:setOpen}
       onConfirm={isAllSelectModal?registerAllSelectedCandidatesAsStudents:handleSelect}
       title={"Register as Students"}
       loading={loading}
       >
        {isAllSelectModal
        ?
        <p>You are sure, you want to register  the seleted candidates as students,?</p>
        :
        <p>You are sure, you want to register the candidate, <b>{selectParam?.name}</b> as student?</p>}
       </ConfirmModal>
    </div>
  )
}







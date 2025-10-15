
'use client'
import React, { FormEvent, useState } from 'react'
const Modal=React.lazy(()=>import("src/components/modal/Modal"));
import { Button } from '../Button';
import axios from 'axios';
import Notification from '../Notification/Notifcation';
import { ErrorMessage } from 'src/utility/errorMessage';

type Props={
    open:boolean,
    setOpen:(val:boolean)=>void
}

export default function NewStudentRegistration  ({
    open,
    setOpen,
}:Props)  {
    const [loading, setLoading]=useState(false);

    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(loading) return;
        try{
            setLoading(true);
            const data=new FormData(e.currentTarget);
            const url=`/api/newStudentRegistration`;
            const method='post';
            const res=await axios({method, url, data});
            if(res){
                console.log("res",res)
                setOpen(false);
                Notification.success('You have registered successfully')
            }
        }
        catch(error){
          ErrorMessage(error);
        }
        finally{
            setLoading(false);
        }
    }
   
  return (
     <Modal
          width={window.innerWidth>768?'40vw':'95vw'}
          title={'Online Admission'}
          open={open}
          onCancel={()=>{setOpen(false)}}
          onOk={()=>{
            setOpen(false);  
          }}
          footer={false}
          >            
            <form className="flex flex-col gap-5"
            encType='multipart/form-data'
            onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700" htmlFor="name">Name</label>
                    <input required name="name" type="text" placeholder="Enter your name" className="text-gray-700 border-1 border-gray-400 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700" htmlFor="email">Email</label>
                    <input required name="email" type="email" placeholder="Enter your email" className="text-gray-700 border-1 border-gray-400 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700" htmlFor="phone">Phone</label>
                    <input required name="phone" type="text" placeholder="Enter your phone number" className="text-gray-700 border-1 border-gray-400 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="gender">Gender</label>
                    <select required name="gender"
                     className="text-gray-700 border-1 border-gray-500 px-5 py-2">
                        {['Select','Male','Female']?.map(item=>(
                            <option key={item} value={item==='Select'?'':item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700" htmlFor="father_name">Father&apos;s Name</label>
                    <input required name="father_name" type="text" placeholder="Enter your father's name" className="text-gray-700 border-1 border-gray-400 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700" htmlFor="mother_name">Mother&apos;s Name</label>
                    <input required name="mother_name" type="text" placeholder="Enter your mother's name" className="text-gray-700 border-1 border-gray-400 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700" htmlFor="address">Address</label>
                    <input required name="address" type="text" placeholder="Enter your address" className="text-gray-700 border-1 border-gray-400 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700" htmlFor="marks">Marks (percentage or CGPA)</label>
                    <input required name="marks" type="text" placeholder="Enter your marks" className="text-gray-700 border-1 border-gray-400 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700" htmlFor="school">School</label>
                    <input required name="school" type="text" placeholder="Enter your previous school" className="text-gray-700 border-1 border-gray-400 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700" htmlFor="class">Class (Current)</label>
                    <input required name="class" type="text" placeholder="Enter V,VII, XI etc" className="text-gray-700 border-1 border-gray-400 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700" htmlFor="markSheet">Uplaod Marksheet</label>
                    <input required name="markSheet" type="file" placeholder="Enter your name" className="text-gray-700 border-1 border-gray-400 px-5 py-2"/>
                </div>

                <div className="flex justify-center gap-5 item-center">
                    <button
                    disabled={loading}

                     className="bg-blue-600 px-5 py-2 text-white transition hover:scale-105 cursor-pointer rounded-md">{loading?'Submiting...':'Submit'}</button>
                    <Button type="secondary" title="Cancel" onClick={()=>setOpen(false)}/>
                </div>  

            </form>         
          </Modal>
  )
}

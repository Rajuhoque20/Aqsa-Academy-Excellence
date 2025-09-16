import axios from "axios";
import React, { Dispatch, FormEvent, SetStateAction } from "react";
import { Button } from "src/components/Button";
import Notification from "src/components/Notification/Notifcation";
const Modal=React.lazy(()=>import("src/components/modal/Modal"));

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
type Props={
    open:boolean,
    type:string,
    setOpen:Dispatch<SetStateAction<boolean>>,
    getStuff:()=>void,
    editParam:StuffDTO|null,
}

export default function AddStuffModal({
    open,
    type,
    setOpen,
    getStuff,
    editParam
}:Props
){
    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const form=e.currentTarget;
        const formData=new FormData(form);
        const data =  Object.fromEntries(formData.entries());
        const method=type==='add'?'post':'patch';
        const url=type==='add'?'/api/stuff':`/api/stuff?id=${editParam?._id}`;
        try{
            await axios({method, url, data});
            getStuff();
            setOpen(false);
            Notification.success(`Staff has been ${type==='add'?'added':'updated'}`)
         }
        catch(error){
            console.log(error);
            Notification.error('Something went wrong!');
        }     
    }
  return(
    <>
     <Modal
      width='40vw'
      title={type==='edit'?'Edit stuff':"Add stuff"}
      open={open}
      onCancel={()=>{setOpen(false)}}
      onOk={()=>{
        setOpen(false);  
      }}
      footer={false}
      >
       <div className="flex flex-col gap-10">
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}        
            >
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Name</label>
                    <input required name="name"
                     defaultValue={type === 'edit' ? editParam?.name : ''}
                     type="text" placeholder="Enter name" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="phone">Phone</label>
                    <input required name="phone"
                     defaultValue={type === 'edit' ? editParam?.phone : ''}
                     type="text" placeholder="Enter phone number" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="phone">Gender</label>
                    <select required name="gender"
                     defaultValue={type === 'edit' ? editParam?.gender : ''}
                     className="text-gray-700 border-1 border-gray-500 px-5 py-2">
                        {['Select','Male','Female']?.map(item=>(
                            <option key={item} value={item==='Select'?'':item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="designation">Designation</label>
                    <input required name="designation"
                     defaultValue={type === 'edit' ? editParam?.designation: ''}
                     type="text" placeholder="Enter designation" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="monthly_fees">Monthly Salary</label>
                    <input required name="monthly_salary"
                    defaultValue={type === 'edit' ? editParam?.monthly_salary : ''}
                     type="text" placeholder="Enter Monthly Fees" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>              
              
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="address">Address</label>
                    <input
                    defaultValue={type === 'edit' ? editParam?.address : ''}
                     required name="address" type="text" placeholder="Enter address" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                
                <div className="flex justify-center gap-5 item-center">
                    <button className="bg-blue-600 px-5 py-2 text-white transition hover:scale-105 cursor-pointer rounded-md">{type==='edit'?'Save':'Submit'}</button>
                    <Button type="secondary" title="Cancel" onClick={()=>setOpen(false)}/>
                </div>             
            </form>          
        </div>
      </Modal>
    </>
  )
}

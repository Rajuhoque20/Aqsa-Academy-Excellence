import axios from "axios";
import React, { Dispatch, FormEvent, SetStateAction } from "react";
import { Button } from "src/components/Button";
import Notification from "src/components/Notification/Notifcation";
const Modal=React.lazy(()=>import("src/components/modal/Modal"));
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
  address:string,
}
type Props={
    open:boolean,
    type:string,
    setOpen:Dispatch<SetStateAction<boolean>>,
    getStudents:()=>void,
    editParam:StudentDTO|null,
}

export default function AddStudentModal({
    open,
    type,
    setOpen,
    getStudents,
    editParam
}:Props
){
    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const form=e.currentTarget;
        const formData=new FormData(form);
        // const data = Object.fromEntries(formData.entries());
       const method=type==='add'?'post':'patch';
       const url=type==='add'?'/api/students':`/api/students?id=${editParam?._id}`;
       const data=formData;
       try{
            await axios({method, url,data});
            getStudents();
            setOpen(false)
            Notification.success(`Student has been ${type==='add'?'added':'updated'}`);
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
      title={type==='edit'?'Edit Student':"Add Student"}
      open={open}
      onCancel={()=>{setOpen(false)}}
      onOk={()=>{
        setOpen(false);  
      }}
      footer={false}
      >
       <div className="flex flex-col gap-10 ">
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}
            encType="multipart/form-data"
            
            >
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Name</label>
                    <input required name="name"
                     defaultValue={type === 'edit' ? editParam?.name : ''}
                     type="text" placeholder="Enter name" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="email">Email</label>
                    <input required name="email"
                     defaultValue={type === 'edit' ? editParam?.email: ''}
                     type="text" placeholder="Enter email" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
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
                    <label className="text-gray-700" htmlFor="current_class">Class (Current)</label>
                    <input required name="current_class"
                     defaultValue={type === 'edit' ? editParam?.current_class : ''}
                     type="text" placeholder="Enter V,VII, XI etc" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="monthly_fees">Monthly Fees</label>
                    <input required name="monthly_fees"
                    defaultValue={type === 'edit' ? editParam?.monthly_fees : ''}
                     type="text" placeholder="Enter Monthly Fees" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="registration_fees">Registration Fees</label>
                    <input required name="registration_fees" 
                     defaultValue={type === 'edit' ? editParam?.registration_fees : ''}
                    type="text" placeholder="Enter Registration Fees" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="father_name">Father&apos;s Name</label>
                    <input
                    defaultValue={type === 'edit' ? editParam?.father_name : ''}
                     required name="father_name" type="text" placeholder="Enter father's name" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="mother_name">Mother&apos;s Name</label>
                    <input required name="mother_name"
                    defaultValue={type === 'edit' ? editParam?.mother_name : ''}
                     type="text" placeholder="Enter mother's name" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="address">Address</label>
                    <input
                    defaultValue={type === 'edit' ? editParam?.address : ''}
                     required name="address" type="text" placeholder="Enter address" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="marksheet">Uplaod Marksheet</label>
                    <input name="marksheet" 
                    // defaultValue={type === 'edit' ? editParam?.marksheet : ''}
                     accept=".pdf,.jpg,.jpeg,.png" type="file" placeholder="Enter name" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
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

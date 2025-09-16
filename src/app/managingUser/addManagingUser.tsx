import axios from "axios";
import React, { Dispatch, FormEvent, SetStateAction } from "react";
import { Button } from "src/components/Button";
import Notification from "src/components/Notification/Notifcation";
const Modal=React.lazy(()=>import("src/components/modal/Modal"));
type ManagingUserDTO={
  name:string,
  email:string,
  phone:string,
  role:string,
  gender:string,
  _id?:string,
  address:string,
}
type Props={
    open:boolean,
    type:string,
    setOpen:Dispatch<SetStateAction<boolean>>,
    getManagingUsers:()=>void,
    editParam:ManagingUserDTO|null,
}

export default function AddManagingUserModal({
    open,
    type,
    setOpen,
    getManagingUsers,
    editParam
}:Props
){
    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const form=e.currentTarget;
        const formData=new FormData(form);
         const data =  Object.fromEntries(formData.entries());
         const method=type==='add'?'post':'patch';
         const url=type==='add'?'/api/managingUser':`/api/managingUser?id=${editParam?._id}`;
         try{
            await axios({method, url, data});
            getManagingUsers();
            setOpen(false);
            Notification.success(`Managing user has been ${type==='add'?'added':'updated'}.`);
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
      title={type==='edit'?'Edit Managing User':"Add Managing User"}
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
                    <label className="text-gray-700" htmlFor="role">Role</label>
                    <select required name="role"
                     defaultValue={type === 'edit' ? editParam?.role : ''}
                     className="text-gray-700 border-1 border-gray-500 px-5 py-2">
                        {['Admin','Super Admin','Manager']?.map(item=>(
                            <option key={item} value={item==='Select'?'':item}>{item}</option>
                        ))}
                    </select>
                    
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

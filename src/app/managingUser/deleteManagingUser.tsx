import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import Notification from "src/components/Notification/Notifcation";
const Modal=React.lazy(()=>import("src/components/modal/Modal"));
type DeleteDTO={
  name:string,
  id:string|undefined
}
type Props={
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
    deleteParam:DeleteDTO|null,
    getManagingUsers:()=>void,
}
export default function DeleteManagingUser(
    {
        open,
        setOpen,
        deleteParam,
        getManagingUsers,
    }:Props

){
    const deleteHandler=()=>{
        axios.delete(`/api/managingUser?id=${deleteParam?.id}`)  
                .then(res=>{
                    if(res){
                        Notification.success('Managing user has been deleted.')
                         getManagingUsers();
                         setOpen(false);
                    }
                })
                .catch(error=>{
                    console.log(error);
                    Notification.error('Something went wrong');
                })
    }
    return(
         <Modal
             width='40vw'
              title={'Delete Managing User'}
              open={open}
              onCancel={()=>{setOpen(false)}}
              onOk={()=>{
               deleteHandler(); 
              }}
              footer={true}
              >
                <span className="text-center">Are you sure, you want to delete the Managing User, <b>{deleteParam?.name}</b>?</span>
              </Modal>
    )
}
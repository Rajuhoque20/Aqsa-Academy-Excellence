import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import Notification from "src/components/Notification/Notifcation";
const Modal=React.lazy(()=>import("src/components/modal/Modal"));
interface DeleteDTO{
    name:string, 
    id?:string
}
type Props={
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
    deleteParam:DeleteDTO|null,
    getStuff:()=>void,
}
export default function DeleteStuff(
    {
        open,
        setOpen,
        deleteParam,
        getStuff,
    }:Props

){
    const deleteHandler=()=>{
        axios.delete(`/api/stuff?id=${deleteParam?.id}`)  
                .then(res=>{
                    if(res){
                         getStuff();
                         setOpen(false);
                         Notification.success('Staff has been deleted.')
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
              title={'Delete Stuff'}
              open={open}
              onCancel={()=>{setOpen(false)}}
              onOk={()=>{
               deleteHandler(); 
              }}
              footer={true}
              >
                <span className="text-center">Are you sure, you want to delete the stuff, <b>{deleteParam?.name}</b>?</span>
              </Modal>
    )
}
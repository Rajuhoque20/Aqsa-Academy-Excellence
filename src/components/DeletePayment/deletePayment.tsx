
import React, { Dispatch, SetStateAction } from "react";
const Modal=React.lazy(()=>import("src/components/modal/Modal"));
type DeleteDTO={
        name:string,
        id:string|undefined,
    }
type Props={
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
    deleteParam:DeleteDTO|null,
    deleteHandler:()=>void,
}
export default function DeletePayment(
    {
        open,
        setOpen,
        deleteParam,
        deleteHandler,
    }:Props

){
    
    return(
         <Modal
             width='40vw'
              title={'Delete Payment'}
              open={open}
              onCancel={()=>{setOpen(false)}}
              onOk={()=>{
               deleteHandler(); 
              }}
              footer={true}
              >
                <span className="text-center text-gray-800">Are you sure, you want to delete the payment for, <b>{deleteParam?.name}</b>?</span>
              </Modal>
    )
}
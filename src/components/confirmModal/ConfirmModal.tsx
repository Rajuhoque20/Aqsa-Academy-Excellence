
import React, { ReactNode } from "react";
const Modal=React.lazy(()=>import("src/components/modal/Modal"));

type Props={
    open:boolean,
    setOpen:(value:boolean)=>void,
    onConfirm:()=>void,
    children:ReactNode,
    title:string,
    loading:boolean,
}
export const ConfirmModal=(
    {
        open,
        setOpen,
        onConfirm,
        children,
        title,
        loading
    }:Props

)=>{
    return(
         <Modal
             width='40vw'
              title={title}
              open={open}
              onCancel={()=>{setOpen(false)}}
              onOk={onConfirm}
              footer={true}
              okButtonProps={{disabled:loading}}
              okText={loading?'Confirming...':'Confirm'}
              >
                {children}
        </Modal>
    )
}
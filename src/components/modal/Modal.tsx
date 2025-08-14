import React, { ReactNode } from 'react'
import { Button } from '../Button';
import { AiOutlineClose } from "react-icons/ai";

export const Modal = ({
        title="Add User",
        children,
        open,
        onCancel,
        onOk,
        width,
        footer=true,
}:{
        title:string,
        children:ReactNode,
        open:boolean,
          onCancel:()=>void,
        onOk:()=>void,
        width:string,
        footer:boolean,
}) => {
  return (
    open&&<div className='fixed w-screen h-screen left-0 top-0 bottom-0 right-0 flex items-center justify-center'>

        <div className='max-w-[80vw] max-h-[90vh] bg-gray-300 z-7 rounded-sm p-5 flex flex-col overflow-y-auto' style={{width:width?width:''}}>
            <div className='flex gap-20 items-center justify-between mb-10'>
                    <span></span>
                    <h1 className='font-bold text-2xl text-black'>{title}</h1>
                    <AiOutlineClose size={28} color="black" className='cursor-pointer' onClick={()=>{
                        onCancel();
                    }}/>                 
            </div>
            <section className='flex flex-col'>          
                {children}
            </section>
            {footer&&<section className='flex justify-end gap-5 mt-10'>
                <Button title='Confirm' onClick={onOk} type='primary'/>
                <Button title='Cancel' onClick={onCancel} type='secondary'/>
            </section>}
        </div>
        <div className='absolute inset-0 bg-black/30 backdrop-blur-[2px]' onClick={onCancel}></div>
    </div>
  )
}

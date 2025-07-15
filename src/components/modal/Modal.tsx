import React, { ReactNode } from 'react'
import { Button } from '../Button';

export const Modal = ({
        title="Add User",
        children,
        open,
        onCancel,
        onOk,
}:{
        title:string,
        children:ReactNode,
        open:boolean,
          onCancel:()=>void,
        onOk:()=>void,
}) => {
  return (
    <div className='fixed z-7 border-2 border-red-800 w-screen h-screen left-0 top-0 bottom-0 right-0 flex items-center justify-center'>
        <div className='max-w-[30vw] max-h-[70vh] bg-gray-300 rounded-sm p-5 flex flex-col'>
            <div className='flex gap-20 items-center justify-between'>
                    <span></span>
                    <h1 className='font-bold text-2xl'>{title}</h1>
                    <span className='cursor-pointer' onClick={()=>{
                        onCancel();
                    }}>Close</span>
            </div>
            <section>          
                {children}
            </section>
            <section>
                <Button title='Okk' onClick={()=>{console.log("asdf")}} type='primary'/>
                
            </section>
        </div>
    </div>
  )
}


import React, { FormEvent, useRef } from "react";
import { Button } from "src/components/Button";
import { usePaymentContext } from "src/Context/PaymentContent";
const Modal=React.lazy(()=>import("src/components/modal/Modal"));

type PaymentDTO={
    _id?:string,
    pay_month:string,
    monthly_fees:string,
    paid_amount:string,
    due_fees:string,
    pay_date:string,
}
type Props={
    open:boolean,
    type:string,
    setOpen:(val:boolean)=>void,
    editParam:PaymentDTO|null,
    handleSubmit:(e: FormEvent<HTMLFormElement>) => Promise<void>
}

export default function AddPayment({
    open,
    type,
    setOpen,
    editParam,
    handleSubmit
}:Props
){
  const {monthly_fees}=usePaymentContext();
  const dueFeesRef=useRef<HTMLInputElement |null>(null);
   
  return(
    <>
     <Modal
      width='40vw'
      title={type==='edit'?'Edit Payment':"Add Payment"}
      open={open}
      onCancel={()=>{setOpen(false)}}
      onOk={()=>{
        setOpen(false);  
      }}
      footer={false}
      >
       <div className="flex flex-col gap-10 ">
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}
           
            >
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="pay_month">Pay Month</label>
                    <input required name="pay_month"
                     defaultValue={type === 'edit' ? editParam?.pay_month : new Date().toISOString().slice(0, 7) }
                     type="month"  placeholder="Enter name" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="monthly_fees">Monthly Fees</label>
                    <input required name="monthly_fees"
                     defaultValue={type === 'edit' ? editParam?.monthly_fees: monthly_fees}
                     type="text" placeholder="Enter monthly fees" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="paid_amount">Paid Amount</label>
                    <input required name="paid_amount"
                    onChange={(e)=>{
                      const val=Number(e.target.value??0);
                      if(dueFeesRef.current){
                         dueFeesRef.current.value=String((monthly_fees??0)-val);
                      }                  
                    }}
                     defaultValue={type === 'edit' ? editParam?.paid_amount : ''}
                     type="text" placeholder="Enter Paid Amount" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="due_fees">Due Fees</label>
                     <input required name="due_fees"
                     ref={dueFeesRef}
                     defaultValue={type === 'edit' ? editParam?.due_fees : String(monthly_fees)}
                     type="text" placeholder="Enter Due Fees" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                    
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="pay_date">Pay Date</label>
                    <input required name="pay_date"
                     defaultValue={type === 'edit' ? editParam?.pay_date : new Date().toISOString().slice(0, 10)}
                     type="date" placeholder="Selet date" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
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

import axios from "axios";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { Button } from "src/components/Button";
import { Modal } from "src/components/modal/Modal";

type Props={
    studentId:string,
    open:boolean,
    type:string,
    setOpen:Dispatch<SetStateAction<boolean>>,
    getStudents:()=>void,
    editParam:any,
}

export const AddPayment=({
    studentId,
    open,
    type,
    setOpen,
    getStudents,
    editParam
}:Props
)=>{
    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const form=e.currentTarget;
        const formData=new FormData(form);
        const plainFormData = Object.fromEntries(formData.entries());
        console.log("formData",plainFormData);
        if(type==='add'){
             await axios.post('/api/studentPayment',{...plainFormData, studentId})
        .then(res=>{
            if(res){
                getStudents();
                setOpen(false)
            }
        })
        .catch(err=>{
            console.log(err)
        })
        }
        else{
           
            await axios.patch(`/api/studentPayment?id=${editParam?._id}`,{...plainFormData, studentId})
        .then(res=>{
            if(res){
                getStudents();
                setOpen(false)
            }
        })
        .catch(err=>{
            console.log(err)
        })
        }        
    }
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
                     defaultValue={type === 'edit' ? editParam?.pay_month : ''}
                     type="month"  placeholder="Enter name" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="monthly_fees">Monthly Fees</label>
                    <input required name="monthly_fees"
                     defaultValue={type === 'edit' ? editParam?.monthly_fees: ''}
                     type="text" placeholder="Enter monthly fees" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="paid_amount">Paid Amount</label>
                    <input required name="paid_amount"
                     defaultValue={type === 'edit' ? editParam?.paid_amount : ''}
                     type="text" placeholder="Enter Paid Amount" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="due_fees">Due Fees</label>
                     <input required name="due_fees"
                     defaultValue={type === 'edit' ? editParam?.due_fees : ''}
                     type="text" placeholder="Enter Due Fees" className="text-gray-700 border-1 border-gray-500 px-5 py-2"/>
                    
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="pay_date">Pay Date</label>
                    <input required name="pay_date"
                     defaultValue={type === 'edit' ? editParam?.pay_date : ''}
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

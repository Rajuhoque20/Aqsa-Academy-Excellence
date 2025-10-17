import axios from "axios";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { Button, DeleteButton, EditButton } from "src/components/Button";
import Notification from "../Notification/Notifcation";
import Loader from "../Loader/Loader";
import { usePDF } from "react-to-pdf";
import { HiddenInvoice } from "./downloadTemplate";
import CheckBox from "../Checkbox/Checkbox";
import { dateMonthString } from "src/utility/dateToMonth";
import { ConfirmModal } from "../confirmModal/ConfirmModal";
import { ErrorMessage } from "src/utility/errorMessage";
const AddPayment =React.lazy(()=>import("src/components/AddPayment/addPayment")); 
const DeletePayment =React.lazy(()=>import("src/components/DeletePayment/deletePayment"));
const columns=["Payment for","Monthly Fees",'Pay Date', "Paid Amount", "Due", "Action",];
type PaymentDTO={
    _id?:string,
    pay_month:string,
    monthly_fees:string,
    paid_amount:string,
    due_fees:string,
    pay_date:string,
}
type DeleteDTO={
        name:string,
        id:string|undefined,
    }


export default function PaymentDetails({ endPoint, idParam}:{idParam?:{[key:string]:string}, endPoint:string}){
  const [isEdit, setIsEdit]=useState(false);
    const [isDelete, setIsDelete]=useState(false);
    const [deleteParam, setDeleteParam]=useState<DeleteDTO|null>(null);
    const [editParam, setEditParam]=useState<PaymentDTO|null>(null);
    const [open, setOpen]=useState<boolean>(false);
    const [clearDueModal, setClearDueModal]=useState(false);
    const [paymentDatails, setPaymentDetails]=useState([]);
    const [loading, setLoading]=useState(true);
    const [downloadData,setDownloadData]=useState<PaymentDTO[]>([]);
   const { toPDF, targetRef } = usePDF({ filename: "payment.pdf" });

    
    let id='';
    if(idParam){
        id=Object.values(idParam)?.[0];
    }

    const getPayments=useCallback(()=>{
      axios.get(`/api/${endPoint}/${id}`)
      .then(res=>{
        if(res){
          setPaymentDetails(res?.data);
          setLoading(false);
        }
      })
      .catch(error=>{
        console.log(error);
        setLoading(false);
      })
    },[id, endPoint])

    useEffect(()=>{
       getPayments();
    },[getPayments])

    const deleteHandler=()=>{
            axios.delete(`/api/${endPoint}?id=${deleteParam?.id}`)  
            .then(res=>{
                if(res){
                  Notification.success('Payment has been deleted')
                  getPayments();
                  setIsDelete(false);
                }
            })
            .catch(error=>{
                console.log(error);
                Notification.error('Something went wrong!');
            })
        }
     const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            const form=e.currentTarget;
            const formData=new FormData(form);
            const plainFormData = Object.fromEntries(formData.entries());
            const method=open?'post':'patch';
            const url=open?`/api/${endPoint}`:`/api/${endPoint}?id=${editParam?._id}`;
            const data={...plainFormData, ...idParam}; 
            const message=`Payment has been ${open?'added':'updated'}`;        
            try{
                 await axios({method, url,data});
                 getPayments();
                setOpen(false);
                setIsEdit(false);
                Notification.success(message);
            }
            catch(err){
                console.log(err);
                Notification.error('Something went wrong!');
            }       
        }

  const handleCheckedCandidates=(item:PaymentDTO, type:string)=>{
  if(type==='add'){
    setDownloadData(prev=>prev.includes(item)?prev:[...prev,item]);
  }
  else{
    setDownloadData(prev=>prev.filter(el=>el._id!==item._id));
  }
}

const handleClearDues=async()=>{
  setLoading(true);
  const paymentIds=downloadData?.map(item=>item._id);
  const method='patch';
            const url=`/api/${endPoint}/${id}`;
            const data=paymentIds; 
            const message=`Dues have been cleared`;        
            try{
                 await axios({method, url,data});
                 getPayments();
                Notification.success(message);
            }
            catch(err){
                console.log(err);         
                ErrorMessage(err);
            }
            finally{
              setLoading(false);
              setClearDueModal(false);
               setDownloadData([]);
            }   
}

const totalDues = paymentDatails?.reduce(
  (total, item:PaymentDTO) => total + Number(item?.due_fees ?? 0),
  0
) ?? 0;

  return(
    <>
     <div className="flex items-center justify-between">
             <h2 className="text-xl mt-7 mb-3">Payment Details</h2>
              
              <div className="gap-5 items-center flex">
                 {downloadData?.length>0&&<Button type="primary" title="Clear Dues ❌" onClick={()=>setClearDueModal(true)}/>}
                {downloadData?.length>0&&<Button title="Download ⬇️" type="secondary"  onClick={() =>{
                setTimeout(() => {
                toPDF();
              }, 100);}}/>}
              <Button title="Add Payment" type="primary" onClick={()=>{setOpen(true)}}/>

              </div>
             
      </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  {columns?.map((item,index)=>{
                    return(
                       <th key={item}  scope="col" className={`px-6 py-3`}>
                      {index===0?
                        
                          <div className='flex item-center gap-5'>
                            <CheckBox checked={downloadData?.length>0&&downloadData.length===paymentDatails.length} onChange={(e)=>{
                              
                              if(e.target.checked){
                                setDownloadData(paymentDatails);
                              }
                              else{
                                setDownloadData([])
                              }
                              
                            }}/>
                            <p> {item}</p>
                          </div>
                          :
                      <p>{item}</p>
                          }
                   </th >)
                  }
                  )
                }
                    
              </tr>
            </thead>
            <tbody>
               {loading?
                        <tr>
                          <td colSpan={12}><Loader/></td>
                        </tr>:

                        paymentDatails.length===0?
                        <tr>
                          <td colSpan={12}>
                            <div className="flex items-center justify-center w-full text-center h-[5rem]">
                              <p>No data found!</p>
                          </div>
                          </td>
                        </tr>
                        
                        :
              paymentDatails?.map((item:PaymentDTO)=>{
                return(
                  <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

                    <td className="px-6 py-4 cursor-pointer" >
                      <div className='flex item-center gap-5'>
                          <CheckBox checked={downloadData?.includes(item)} onChange={(e)=>{
                            if(e.target.checked){
                                handleCheckedCandidates(item,'add');
                            }
                            else
                            {
                                handleCheckedCandidates(item,'remove');
                            }
                            
                          }}/>
                          <p>  {dateMonthString(item.pay_month)}</p>
                      </div>
                     </td>
                    <td className="px-6 py-4">{item.monthly_fees}</td>
                    <td className="px-6 py-4">{item.pay_date}</td>
                      <td className="px-6 py-4">{item.paid_amount}</td>
                   
                    <td className="px-6 py-4">{item.due_fees}</td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <EditButton onClick={()=>{setIsEdit(true);
                        setEditParam(item);
                      }}/>
                      <DeleteButton onClick={()=>{
                        setIsDelete(true);
                        setDeleteParam({name:item?.pay_month, id:item?._id});
    
                      }}/>
                     
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {open&&<AddPayment open={open} type={"add"}  setOpen={setOpen} handleSubmit={handleSubmit} editParam={null}/>}
          {isEdit&&<AddPayment open={isEdit} type='edit' setOpen={setIsEdit} handleSubmit={handleSubmit} editParam={editParam}/>}
          <DeletePayment open={isDelete} setOpen={setIsDelete} deleteParam={deleteParam} deleteHandler={deleteHandler}/>
            <HiddenInvoice targetRef={targetRef} data={downloadData} totalDues={totalDues}/>
          <ConfirmModal
          title="Clear Dues"
          open={clearDueModal}
          onConfirm={handleClearDues}
          setOpen={setClearDueModal}
          loading={loading}
          >
            <p className="text-gray-800 self-center">You are sure, you want to clear dues for  the seleted months?</p>

          </ConfirmModal>
        </>
  )
}
'use client'

import axios from "axios";
import { useEffect, useState, use } from "react";
import { Button, DeleteButton, EditButton } from "src/components/Button";
import { AddPayment } from "./addPayment";
import { DeletePayment } from "./deletePayment";

const dateMonthString=(input:string)=>{
  // const input = "2025-07";
const [year, month] = input.split("-");
const date = new Date(`${year}-${month}-01`);
const result = `${year}/${date.toLocaleString("en-US", { month: "long" })}`;
return result;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // ✅ unwrap params

  const [studentDetails, setStudentDetails] = useState({});
  console.log("studentDetails",studentDetails)

  useEffect(() => {
    axios.get(`/api/students/${id}`)
      .then(res => {
        if (res?.data) {
          setStudentDetails(res.data);
        }
      })
      .catch(error => {
        console.error("Error fetching student:", error);
      });
  }, [id]);

  return <div>
         <h1 className="text-2xl"> Student Details</h1>
         <h2 className="text-xl mt-7 mb-3">Personal Details</h2>
         <div className="grid grid-cols-3 border-gray-400 border-1 p-5 rounded-md gap-3">
          <div>
             <span> name:</span>
             <span>{studentDetails?.name}</span>
          </div>
           <div>
             <span> Email:</span>
             <span>{studentDetails?.email}</span>
          </div>
           <div>
             <span> Phone:</span>
             <span>{studentDetails?.phone}</span>
          </div>
           <div>
             <span> Adress:</span>
             <span>{studentDetails?.address}</span>
          </div>

           <div>
             <span> Father's Name:</span>
             <span>{studentDetails?.father_name}</span>
          </div>

           <div>
             <span> Mother's Name:</span>
             <span>{studentDetails?.mother_name}</span>
          </div>    


         </div>

         
          <PaymentDetails studentId={id}/>
   </div>;
}

const 
PaymentDetails=({studentId}:{studentId:string})=>{
  const [isEdit, setIsEdit]=useState(false);
    const [isDelete, setIsDelete]=useState(false);
    const [deleteParam, setDeleteParam]=useState({name:'', id:''});
    const [editParam, setEditParam]=useState();
    const [open, setOpen]=useState<boolean>(false);
    const [paymentDatails, setPaymentDetails]=useState([]);

    const getStudentPayments=()=>{
      axios.get(`/api/studentPayment/${studentId}`)
      .then(res=>{
        if(res){
          setPaymentDetails(res?.data);
        }
      })
      .catch(error=>{
        console.log(error)
      })
    }

    useEffect(()=>{
       getStudentPayments();
    },[])

  const columns=["Payment for","Monthly Fees",'Pay Date', "Paid Amount", "Due", "Action",];
  return(
    <>
     <div className="flex items-center justify-between">
             <h2 className="text-xl mt-7 mb-3">Payment Details</h2>
             <Button title="Add Payment" type="primary" onClick={()=>{setOpen(true)}}/>
      </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  {columns?.map(item=><th key={item} scope="col" className="px-6 py-3">{item}</th >)}
              </tr>
            </thead>
            <tbody>
              {paymentDatails?.map((item:any)=>{
                return(
                  <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <td className="px-6 py-4 cursor-pointer" >{dateMonthString(item.pay_month)}</td>
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
          <AddPayment open={open} type={"add"} studentId={studentId} setOpen={setOpen} getStudents={getStudentPayments} editParam={{}}/>
          <AddPayment open={isEdit} type='edit' studentId={studentId} setOpen={setIsEdit} getStudents={getStudentPayments} editParam={editParam}/>
          <DeletePayment open={isDelete} setOpen={setIsDelete} deleteParam={deleteParam} getStudents={getStudentPayments}/>
        </>
  )
}

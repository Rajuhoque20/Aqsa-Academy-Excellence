'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { PaymentContextProvider } from "src/Context/PaymentContent";
 const PaymentDetails =React.lazy(()=>import("src/components/paymentDetails/PaymentDetails"));

type StudentDTO={
    _id?:string,
    pay_month:string,
    monthly_fees:string,
    paid_amount:string,
    due_fees:string,
    pay_date:string,
    name:string,
    gender:string,
    address:string,
    email:string,
    phone:string,
    father_name:string,
    mother_name:string
}



export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // ✅ unwrap params
  const [studentDetails, setStudentDetails] = useState<StudentDTO>();
  const router=useRouter();
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

  return (
      <div>
        <div className="flex items-center gap-3">
            <FaArrowLeft className="cursor-pointer" size={30} onClick={()=>router.back()}/>
            <h1 className="text-2xl"> Student&apos;s Details</h1>
        </div>   
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
            <span> Father&apos;s Name:</span>
            <span>{studentDetails?.father_name}</span>
          </div>
          <div>
            <span> Mother&apos;s Name:</span>
            <span>{studentDetails?.mother_name}</span>
          </div>    
        </div> 
        <PaymentContextProvider monthly_fees={Number(studentDetails?.monthly_fees??0)}>   
        <PaymentDetails idParam={{studentId:id}} endPoint="studentPayment"/>
        </PaymentContextProvider> 
      </div>
   );
}


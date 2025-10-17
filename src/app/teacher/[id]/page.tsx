'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { PaymentContextProvider } from "src/Context/PaymentContent";
 const PaymentDetails=React.lazy(()=>import("src/components/paymentDetails/PaymentDetails"))

type TeacherDTO={
    _id?:string,
    pay_month:string,
    monthly_salary:string,
    paid_amount:string,
    dueFees:string,
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
  const router=useRouter();

  const [teacherDetails, setTeacherDetails] = useState<TeacherDTO|null>(null);
  useEffect(() => {
    axios.get(`/api/teacher/${id}`)
      .then(res => {
        if (res?.data) {
          setTeacherDetails(res.data);
        }
      })
      .catch(error => {
        console.error("Error fetching student:", error);
      });
  }, [id]);

  console.log("teacherDetails",teacherDetails)
  return (
      <div>
        <div className="flex items-center gap-3">
           <FaArrowLeft className="cursor-pointer" size={30} onClick={()=>router.back()}/>
            <h1 className="text-2xl"> Teacher&apos;s Details</h1>
        </div>           
        <h2 className="text-xl mt-7 mb-3">Personal Details</h2>
        <div className="grid grid-cols-3 border-gray-400 border-1 p-5 rounded-md gap-3">
          <div>
            <span> name:</span>
            <span>{teacherDetails?.name}</span>
          </div>
          <div>
            <span> Email:</span>
            <span>{teacherDetails?.email}</span>
          </div>
          <div>
            <span> Phone:</span>
            <span>{teacherDetails?.phone}</span>
          </div>
          <div>
            <span> Adress:</span>
            <span>{teacherDetails?.address}</span>
          </div>
          <div>
            <span> Father&apos;s Name:</span>
            <span>{teacherDetails?.father_name}</span>
          </div>
          <div>
            <span> Mother&apos;s Name:</span>
            <span>{teacherDetails?.mother_name}</span>
          </div>    
        </div> 
        <PaymentContextProvider monthly_fees={Number(teacherDetails?.monthly_salary??0)}>
          <PaymentDetails idParam={{teacherId:id}} endPoint="teacherPayment"/>
        </PaymentContextProvider>         
      </div>
   );
}



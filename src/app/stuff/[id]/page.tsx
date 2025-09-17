'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use } from "react";
import { FaArrowLeft } from "react-icons/fa";
const PaymentDetails = React.lazy(()=>import("src/components/paymentDetails/PaymentDetails"));

type StuffDTO={
  name:string,
  phone:string,
  email:string,
  address:string,
  father_name?:string,
  mother_name?:string,
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // ✅ unwrap params
  const router=useRouter();
  const [studentDetails, setStudentDetails] = useState<StuffDTO|null>(null);

  useEffect(() => {
    axios.get(`/api/stuff/${id}`)
      .then(res => {
        if (res?.data) {
          setStudentDetails(res.data);
        }
      })
      .catch(error => {
        console.error("Error fetching Stuff:", error);
      });
  }, [id]);

  return (
  <div>
    <div className="flex items-center gap-3">
        <FaArrowLeft className="cursor-pointer" size={30} onClick={()=>router.back()}/>
        <h1 className="text-2xl"> Staff&apos;s Details</h1>
    </div>  
    <h1 className="text-2xl"> Stuff Details</h1>
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
    <PaymentDetails idParam={{stuffId:id}} endPoint="stuffPayment"/>
   </div>
   );
}



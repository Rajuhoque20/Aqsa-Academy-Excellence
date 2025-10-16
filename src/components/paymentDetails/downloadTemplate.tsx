import Image from "next/image";
import React from "react";
import { instituteInfo } from "src/constant";
import { dateMonthString } from "src/utility/dateToMonth";
type PaymentDTO={
    _id?:string,
    pay_month:string,
    monthly_fees:string,
    paid_amount:string,
    due_fees:string,
    pay_date:string,
}
type Props= {
     targetRef: React.RefObject<HTMLDivElement> ,
     data:PaymentDTO[],
     totalDues:number,
    }
export function HiddenInvoice({ targetRef, data, totalDues }: 
   Props) {
  return (
    <div ref={targetRef} 
    style={{
  position: "absolute",
  top: "-9999px",  // way above viewport
}} className="text-black flex flex-col w-[60rem]" >
          <div className="flex gap-3 p-10 items-center justify-between">
            <div className="flex gap-3 items-center">
                <div className="relative w-[5rem] h-[5rem]">
                  <Image src={instituteInfo.logo} alt={instituteInfo.name} fill={true} className="rounded-full"/>
                </div>
              
                <div className="flex flex-col">
                  <h1 className="text-3xl p-0 m-0">{instituteInfo.name}</h1>
                  <p>{instituteInfo.suit}</p>
                </div>
            </div>

            <div>
              <p>Phone: <span style={{color:"darkBlue"}}>{instituteInfo.phone}</span></p>
              <p>Email: <span style={{color:"darkBlue"}}>{instituteInfo.email}</span></p>
              <p>Website Link: <span style={{color:"darkBlue"}}>{instituteInfo.websiteURL}</span></p>
            </div>
          </div>
          <hr className="h-[2px] w-full mb-7" style={{background:'gray',}}/>
          <h1 className="text-2xl mx-10" style={{fontWeight:700}}>Payment Invoice</h1>
          <div className="p-10 pt-5 flex flex-wrap gap-7">
              
              {data?.map((item)=>{
                return(
                    <div key={item._id}>
                        <h2  style={{fontWeight:600}}>Payment for: <span>{dateMonthString(item.pay_month)}</span></h2>
                        <p>Monthly Fees: <span>{item.monthly_fees}</span></p>
                        <p>Paid Amount: <span>{item.paid_amount}</span></p>
                        <p>Due Fees: <span>{item.due_fees}</span></p>
                        <p>Payment Date: <span>{item.pay_date}</span></p>
                    </div>
                )
              })}
              
          </div>
          <h2 className="text-xl mb-2 mx-10">Total Payable Amount: <span className="font-semibold">{totalDues}</span></h2>
    </div>
  );
}
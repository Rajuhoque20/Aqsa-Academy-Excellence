import React from "react";
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
     data:PaymentDTO[]
    }
export function HiddenInvoice({ targetRef, data }: 
   Props) {
  return (
    <div ref={targetRef} 
    style={{
  position: "absolute",
  top: "-9999px",  // way above viewport
  left: 0,
}} className="text-black p-10 flex flex-col">
      <h1 className="text-xl" style={{fontWeight:700}}>Payment Invoice</h1>
      {data?.map((item)=>{
        return(
            <div key={item._id} className="mt-5">
                <h2  style={{fontWeight:600}}>Payment for: <span>{dateMonthString(item.pay_month)}</span></h2>
                <p>Monthly Fees: <span>{item.monthly_fees}</span></p>
                <p>Paid Amount: <span>{item.paid_amount}</span></p>
                <p>Due Fees: <span>{item.due_fees}</span></p>
                <p>Payment Date: <span>{item.pay_date}</span></p>
            </div>
        )
      })}
    </div>
  );
}
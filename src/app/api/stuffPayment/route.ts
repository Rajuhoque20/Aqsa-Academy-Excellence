
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongoose";
import StuffPayment from "../../../../models/stuffPayment";


export async function POST(request: NextRequest) {
    const data= await request.json();
    const  {stuffId, pay_month, pay_date, due_fees, paid_amount, monthly_fees}=data;
    if(!stuffId||!pay_month||!pay_date||!due_fees||!paid_amount||!monthly_fees){
        return NextResponse.json(
        { message: `Missing required fields` },
        { status: 400 }
    );
    }
  try {
    await connectToDatabase();
    await StuffPayment.create({
     stuffId, pay_month, pay_date, due_fees, paid_amount,monthly_fees
    });

    return NextResponse.json(
      {
        message: "Suff Payment has been added",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding Stuff payment:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request:NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
   
    if(!id){
        return NextResponse.json({message:"Id is required!"},{status:400})
    }
    try{
        await connectToDatabase();
        const stuffPayment=await StuffPayment.findOne({_id:id});
        if(!stuffPayment){
            return NextResponse.json({message:"Payment not found!",},{status:404})
        };
        await StuffPayment.deleteOne({_id:id});
        return NextResponse.json({message:"Payment has been deleted!",},{status:202})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message:"Failed to delete!"},{status:500})
    }
    
}

export async function PATCH(request:NextRequest){
    const searchParams=request.nextUrl.searchParams;
    const id=searchParams.get('id');
    try{
            await connectToDatabase();
              const {stuffId, pay_month, pay_date, due_fees, paid_amount}= await request.json();
                if(!stuffId||!pay_month||!pay_date||!due_fees||!paid_amount){
                    return NextResponse.json(
                    { message: `Missing required fields` },
                    { status: 400 }
                );
                }
            const checkStudent=await StuffPayment.findOne({_id:id});
            if(!checkStudent){
                return NextResponse.json({message:"Payment not found!"},{status:404}) 
            }
            await StuffPayment.findByIdAndUpdate(id,{stuffId, pay_month, pay_date, due_fees, paid_amount});
            return NextResponse.json({message:"Stuff Details has been updated!"},{status:201})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message:"Internal server error!"},{status:500})
    }
}

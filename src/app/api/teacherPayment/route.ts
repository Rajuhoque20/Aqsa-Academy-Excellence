
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongoose";
import TeacherPayment from "../../../../models/teacherPayment";


export async function POST(request: NextRequest) {
    const data= await request.json();
    const  {teacherId, pay_month, pay_date, due_fees, paid_amount, monthly_fees}=data;
    if(!teacherId||!pay_month||!pay_date||!due_fees||!paid_amount||!monthly_fees){
        return NextResponse.json(
        { message: `Missing required fields` },
        { status: 400 }
    );
    }
  try {
    await connectToDatabase();
    await TeacherPayment.create({
     teacherId, pay_month, pay_date, due_fees, paid_amount,monthly_fees
    });

    return NextResponse.json(
      {
        message: "Student Payment has been added",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding student:", error);
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
        const teacherPayment=await TeacherPayment.findOne({_id:id});
        if(!teacherPayment){
            return NextResponse.json({message:"Payment not found!",},{status:404})
        };
        await TeacherPayment.deleteOne({_id:id});
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
              const {teacherId, pay_month, pay_date, due_fees, paid_amount}= await request.json();
                if(!teacherId||!pay_month||!pay_date||!due_fees||!paid_amount){
                    return NextResponse.json(
                    { message: `Missing required fields` },
                    { status: 400 }
                );
                }
            const checkStudent=await TeacherPayment.findOne({_id:id});
            if(!checkStudent){
                return NextResponse.json({message:"Payment not found!"},{status:404}) 
            }
            await TeacherPayment.findByIdAndUpdate(id,{teacherId, pay_month, pay_date, due_fees, paid_amount});
            return NextResponse.json({message:"Student Details has been updated!"},{status:201})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message:"Internal server error!"},{status:500})
    }
}

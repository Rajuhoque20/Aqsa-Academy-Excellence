import { NextRequest, NextResponse } from "next/server";
import StudentPayment from "../../../../../models/studentPayment";
import { connectToDatabase } from "../../../../../lib/mongoose";

export async function GET(req:NextRequest, {params}:{params:{id:string}}) {
  try {
    await connectToDatabase();
    const studentpayments = await StudentPayment.find({studentId:params.id});
    return NextResponse.json(studentpayments, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch student payments' }, { status: 500 });
  }
}
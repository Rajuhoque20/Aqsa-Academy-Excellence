import { NextRequest, NextResponse } from "next/server";
import TeacherPayment from "../../../../../models/teacherPayment";
import { connectToDatabase } from "../../../../../lib/mongoose";

export async function GET(req:NextRequest, {params}:{params:{id:string}}) {
  try {
    await connectToDatabase();
    const teacherpayments = await TeacherPayment.find({teacherId:params.id});
    return NextResponse.json(teacherpayments, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch Teacher payments' }, { status: 500 });
  }
}
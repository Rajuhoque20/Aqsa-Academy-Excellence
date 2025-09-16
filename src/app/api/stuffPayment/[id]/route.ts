import { NextRequest, NextResponse } from "next/server";
import StuffPayment from "../../../../../models/stuffPayment";
import { connectToDatabase } from "../../../../../lib/mongoose";

export async function GET(req:NextRequest, {params}:{params:{id:string}}) {
  try {
    await connectToDatabase();
    const stuffpayments = await StuffPayment.find({stuffId:params?.id});
    return NextResponse.json(stuffpayments, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch Stuff payments' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import StuffPayment from "../../../../../models/stuffPayment";
import { connectToDatabase } from "../../../../../lib/mongoose";

export async function GET(req:NextRequest, context:unknown) {
  try {
    await connectToDatabase();
    const { id } = await (context as { params: { id: string } }).params;
    const stuffpayments = await StuffPayment.find({stuffId:id});
    return NextResponse.json(stuffpayments, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch Stuff payments' }, { status: 500 });
  }
}
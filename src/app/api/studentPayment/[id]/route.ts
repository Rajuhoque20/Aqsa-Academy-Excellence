import { NextRequest, NextResponse } from "next/server";
import StudentPayment from "../../../../../models/studentPayment";
import { connectToDatabase } from "../../../../../lib/mongoose";

export async function GET(req:NextRequest, context:unknown) {
  try {
    await connectToDatabase();
    const { id } = await (context as { params: { id: string } }).params;
    const studentpayments = await StudentPayment.find({studentId:id});
    return NextResponse.json(studentpayments, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch student payments' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();

    const paymentIds: string[] = await req.json();

    if (!paymentIds || paymentIds.length === 0) {
      return NextResponse.json(
        { message: "Missing required fields!" },
        { status: 400 }
      );
    }

    // Fetch only the payments that match IDs and have due_fees >= 0
     const payments = await StudentPayment.find({
      _id: { $in: paymentIds },
      due_fees: { $gt: 0 },
    });

    if (payments.length === 0) {
      return NextResponse.json(
        { message:  "No matching payments found or dues are already cleared." },
        { status: 404 }
      );
    }

    // Update dues in parallel
    await Promise.all(
      payments.map((payment) =>
        StudentPayment.findByIdAndUpdate(payment._id, { due_fees: 0, paid_amount:payment.monthly_fees })
      )
    );

    return NextResponse.json({
      message: "Student dues cleared successfully",
      updatedCount: payments.length,
    });
  } catch (error) {
    console.error("Error clearing student dues:", error);
    return NextResponse.json(
      { message: "Failed to clear student dues" },
      { status: 500 }
    );
  }
}

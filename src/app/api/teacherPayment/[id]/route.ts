import { NextRequest, NextResponse } from "next/server";
import TeacherPayment from "../../../../../models/teacherPayment";
import { connectToDatabase } from "../../../../../lib/mongoose";

export async function GET(req:NextRequest, context:unknown) {
  try {
    await connectToDatabase();
      const { id } = await (context as { params: { id: string } }).params;
    const teacherpayments = await TeacherPayment.find({teacherId:id});
    return NextResponse.json(teacherpayments, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch Teacher payments' }, { status: 500 });
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
     const payments = await TeacherPayment.find({
      _id: { $in: paymentIds },
      due_fees: { $gt: 0 },
    });

    console.log("payments",payments)
    if (payments.length === 0) {
      return NextResponse.json(
        { message: "No matching payments found or dues are already cleared." },
        { status: 404 }
      );
    }

    // Update dues in parallel
    await Promise.all(
      payments.map((payment) =>
        TeacherPayment.findByIdAndUpdate(payment._id, { due_fees: 0,paid_amount:payment.monthly_fees })
      )
    );

    return NextResponse.json({
      message: "Teacher's dues cleared successfully",
      updatedCount: payments.length,
    });
  } catch (error) {
    console.error("Error clearing teacher's dues:", error);
    return NextResponse.json(
      { message: "Failed to clear Teacher's dues" },
      { status: 500 }
    );
  }
}

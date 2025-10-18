
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/mongoose";
import Students from "../../../../../models/students";
import StudentPayment from "../../../../../models/studentPayment";


export async function GET() {
  try {
    await connectToDatabase();

    const currentDate = new Date();
    const pay_month = currentDate.toISOString().slice(0, 7); // e.g. "2025-10"
    const pay_date = currentDate.toISOString().split("T")[0];

    // 📝 Step 1: Get existing student IDs who already have payments for this month
    const existingPayments = await StudentPayment.find({ pay_month }).select("studentId");
    const existingStudentIds = existingPayments.map((p) => p.studentId.toString());

    // 📝 Step 2: Get only students without a payment for this month
    const students = await Students.find({
      _id: { $nin: existingStudentIds },
    });

    if (students.length === 0) {
      return NextResponse.json({
        message: `✅ All student payments for ${pay_month} are already generated.`,
        count: 0,
      });
    }

    // 📝 Step 3: Prepare payment docs
    const payments = students.map((s) => ({
      studentId: s._id,
      pay_month,
      pay_date,
      due_fees: s.monthly_fees,
      paid_amount: 0,
      monthly_fees: s.monthly_fees,
    }));

    // 📝 Step 4: Insert only new payments
    await StudentPayment.insertMany(payments);

    return NextResponse.json({
      message: `✅ ${payments.length} student payments generated for ${pay_month}`,
      count: payments.length,
    });
  } catch (error) {
    console.error("❌ Error generating student payments:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/mongoose";
import TeacherPayment from "../../../../../models/teacherPayment";
import Teacher from "../../../../../models/teacher";


export async function GET() {
  try {
    await connectToDatabase();

    const currentDate = new Date();
    const pay_month = currentDate.toISOString().slice(0, 7); // e.g., "2025-11"
    // const pay_date = currentDate.toISOString().split("T")[0];

    // 📝 Step 1: find teacher IDs who already have payments for current month
    const existing = await TeacherPayment.find({ pay_month }).select("teacherId");
    const existingTeacherIds = existing.map((p) => p.teacherId);

    // 📝 Step 2: find only teachers who DON'T have payments yet
    const teachers = await Teacher.find({
      _id: { $nin: existingTeacherIds },
    });

    if (teachers.length === 0) {
      return NextResponse.json({
        message: "No new teacher payments to generate ✅",
        count: 0,
      });
    }

    // 📝 Step 3: build payment documents
    const payments = teachers.map((t) => ({
      teacherId: t._id,
      pay_month,
      pay_date:'',
      due_fees: t.monthly_fees,
      paid_amount: 0,
      monthly_fees: t.monthly_fees,
    }));

    await TeacherPayment.insertMany(payments);

    return NextResponse.json({
      message: `✅ Generated ${payments.length} teacher payments for ${pay_month}`,
      count: payments.length,
    });
  } catch (error) {
    console.error("❌ Error generating teacher payments:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


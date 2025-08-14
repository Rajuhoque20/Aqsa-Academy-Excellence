import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/mongoose";
import Students from "../../../../../models/students";
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const student = await Students.findById(params.id);

    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const dueFees = 0;

    return NextResponse.json({
      ...student.toObject(),
      marksheet_url: student.marksheet ? `${baseUrl}${student.marksheet}` : null,
      dueFees,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch student" }, { status: 500 });
  }
}

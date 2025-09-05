import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/mongoose";
import Teacher from "../../../../../models/teacher";
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const teacher = await Teacher.findById(params.id);

    if (!teacher) {
      return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
    }

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const dueFees = 0;

    return NextResponse.json({
      ...teacher.toObject(),
      marksheet_url: teacher.marksheet ? `${baseUrl}${teacher.marksheet}` : null,
      dueFees,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch teacher" }, { status: 500 });
  }
}

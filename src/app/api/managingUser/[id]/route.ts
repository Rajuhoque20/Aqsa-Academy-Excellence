import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/mongoose";
import ManagingUser from "../../../../../models/managingUser";
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const managingUser = await ManagingUser.findById(params.id);

    if (!managingUser) {
      return NextResponse.json({ message: "managing user not found" }, { status: 404 });
    }

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const dueFees = 0;

    return NextResponse.json({
      ...managingUser.toObject(),
      marksheet_url: managingUser.marksheet ? `${baseUrl}${managingUser.marksheet}` : null,
      dueFees,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch managing user" }, { status: 500 });
  }
}

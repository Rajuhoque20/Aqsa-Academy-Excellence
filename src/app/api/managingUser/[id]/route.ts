import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/mongoose";
import ManagingUser from "../../../../../models/managingUser";

export async function GET(
  req: NextRequest,
context: unknown
) {
  const { id } = (context as { params: { id: string } }).params;

  await connectToDatabase();

  const managingUser = await ManagingUser.findById(id);

  if (!managingUser) {
    return NextResponse.json({ message: "managing user not found" }, { status: 404 });
  }

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  return NextResponse.json({
    ...managingUser.toObject(),
    marksheet_url: managingUser.marksheet ? `${baseUrl}${managingUser.marksheet}` : null,
    dueFees: 0,
  });
}

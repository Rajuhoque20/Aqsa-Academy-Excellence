import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/mongoose";
import Stuff from "../../../../../models/stuff";
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const stuff = await Stuff.findById(params.id);

    if (!stuff) {
      return NextResponse.json({ message: "stuff not found" }, { status: 404 });
    }

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const dueFees = 0;

    return NextResponse.json({
      ...stuff.toObject(),
      marksheet_url: stuff.marksheet ? `${baseUrl}${stuff.marksheet}` : null,
      dueFees,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch stuff" }, { status: 500 });
  }
}

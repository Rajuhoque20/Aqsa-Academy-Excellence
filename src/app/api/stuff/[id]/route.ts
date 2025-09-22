import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/mongoose";
import Stuff from "../../../../../models/stuff";
export async function GET(req: NextRequest, context:unknown) {
  try {
    await connectToDatabase();
     const { id } = await (context as { params: { id: string } }).params;
    const stuff = await Stuff.findById(id);

    if (!stuff) {
      return NextResponse.json({ message: "stuff not found" }, { status: 404 });
    }
    return NextResponse.json({
      ...stuff.toObject(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch stuff" }, { status: 500 });
  }
}

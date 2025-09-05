
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";
import { connectToDatabase } from "../../../../lib/mongoose";
import Topper from "../../../../models/topper";

const requiredFields = [
      "name",
      "description",
      "marks",
      "class",
    ];

const getFormData = async (request: NextRequest, formData:any) => {
  return {
    name: formData.get("name")?.toString(),
    description: formData.get("description")?.toString(),
    marks: formData.get("marks")?.toString(),
     class: formData.get("class")?.toString(),
};
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await request.formData();
   const topperData:any=await getFormData(request, formData);
    const missingFields = requiredFields.filter((field) => !topperData[field]);
    if (missingFields.length > 0) {
    return NextResponse.json(
        { message: `Missing fields: ${missingFields.join(", ")}` },
        { status: 400 }
    );
    }
    // Extract file and form fields
    // Save file to /public/uploads
     let fileUrl=''
    if(formData.get("image")){
     const file = formData.get("image") as File;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true }); // ensure uploads folder exists

    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadsDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);
     fileUrl = `/uploads/${fileName}`; // This is what you'll save in DB

    }
   
    await Topper.create({
      ...topperData,
      image: fileUrl, // Store relative path
    });

    return NextResponse.json(
      {
        message: "Topper has been added",    
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding Topper:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const topper = await Topper.find();
    const formatted = topper.map(top => {
      return {
      ...top.toObject(),
      image: top.image
    }});
    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch Topper' }, { status: 500 });
  }
}

export async function DELETE(request:NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    if(!id){
        return NextResponse.json({message:"Id is required!"},{status:400})
    }
    try{
        await connectToDatabase();
        const topper=await Topper.findOne({_id:id});
        if(!topper){
            return NextResponse.json({message:"Topper not found!",},{status:404})
        };
        await Topper.deleteOne({_id:id});
        return NextResponse.json({message:"Topper has been deleted!",},{status:202})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message:"Failed to delete!"},{status:500})
    }
}

export async function PATCH(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  try {
    await connectToDatabase();

    const formData = await request.formData();
    const topperData: any = await getFormData(request, formData);

    const missingFields = requiredFields.filter(
      (field) => !topperData[field]
    );
    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const checkTopper = await Topper.findById(id);
    if (!checkTopper) {
      return NextResponse.json(
        { message: "Topper not found!" },
        { status: 404 }
      );
    }

    const file = formData.get("image") as File | null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload dir
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // ✅ Delete the old image if it exists
      if (checkTopper.image) {
        const oldImagePath = path.join(process.cwd(), "public", checkTopper.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Save new file
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);

      // Store relative path in DB
      topperData.image = `/uploads/${fileName}`;
    }

    await Topper.findByIdAndUpdate(id, { ...topperData });

    return NextResponse.json(
      { message: "Topper Details have been updated!" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}

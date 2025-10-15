
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { connectToDatabase } from "../../../../lib/mongoose";
import Event from "../../../../models/events";
import { supabase } from "../../../../lib/superbase";

interface EventData {
  title: string;
  description: string;
  date: string;
}

const requiredFields:(keyof EventData)[]  = [
      "title",
      "description",
      "date",
    ];

const getFormData = async (request: NextRequest, formData:FormData) => {
  return {
    title: formData.get("title")?.toString(),
    description: formData.get("description")?.toString(),
    date: formData.get("date")?.toString(),
};
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await request.formData();
   const eventData=await getFormData(request, formData);
    const missingFields = requiredFields.filter((field) => !eventData[field]);
    if (missingFields.length > 0) {
    return NextResponse.json(
        { message: `Missing fields: ${missingFields.join(", ")}` },
        { status: 400 }
    );
    }
    // Extract file and form fields
     const titleMatch = await Event.findOne({ title:eventData?.title });
    if (titleMatch) {
      return NextResponse.json({ message: "Title already exists!" }, { status: 409 });
    }

    let fileUrl='';
         const file = formData.get("image") as File;
           if(formData.get("image")){
             const fileName = `${Date.now()}_${file.name}`;
            const { error } = await supabase.storage
             .from("aqsa_upload") // bucket name
             .upload(fileName, file, {
               cacheControl: "3600",
               upsert: false,
             });
       
             const { data: signed } = await supabase.storage
             .from("aqsa_upload")
             .createSignedUrl(fileName, 60 * 60 * 24 * 365); // 1 year
            fileUrl = signed?.signedUrl||'';
           if (error) throw error;
           }
    await Event.create({
      ...eventData,
      image: fileUrl, // Store relative path
    });

    //  const file = formData.get("image") as File | null;
        
    //         let fileName;
    //         if (file && file.size > 0) {
    //           const bytes = await file.arrayBuffer();
    //           const buffer = Buffer.from(bytes);
        
    //           // Upload dir
    //           const uploadDir = path.join(process.cwd(), "public", "uploads");
    //           if (!fs.existsSync(uploadDir)) {
    //             fs.mkdirSync(uploadDir, { recursive: true });
    //           }
        
        
    //           // Save new file
    //            fileName = `${Date.now()}_${file.name}`;
    //           const filePath = path.join(uploadDir, fileName);
    //           fs.writeFileSync(filePath, buffer);
        
    //         }
        
    //         const updatedData=fileName?{...eventData, image:`/uploads/${fileName}`,
    //        }:eventData
        
    //     await Event.create(updatedData);

    return NextResponse.json(
      {
        message: "Event has been added",    
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding student:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const event = await Event.find();
    const formatted = event.map(student => {
      return {
      ...student.toObject(),
      image: student.image
    }});
    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch event' }, { status: 500 });
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
        const event=await Event.findOne({_id:id});
        if(!event){
            return NextResponse.json({message:"Event not found!",},{status:404})
        };
        await Event.deleteOne({_id:id});
        return NextResponse.json({message:"Event has been deleted!",},{status:202})
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
    const eventData = await getFormData(request, formData);

    const missingFields = requiredFields.filter(
      (field) => !eventData[field]
    );
    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const checkEvent = await Event.findById(id);
    if (!checkEvent) {
      return NextResponse.json(
        { message: "Event not found!" },
        { status: 404 }
      );
    }

    const file = formData.get("image") as File | null;

    let fileName;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload dir
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // ✅ Delete the old image if it exists
      if (checkEvent.image) {
        const oldImagePath = path.join(process.cwd(), "public", checkEvent.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Save new file
       fileName = `${Date.now()}_${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);

      // Store relative path in DB
      // eventData['image'] = `/uploads/${fileName}`;
    }

    const updatedData=fileName?{...eventData, image:`/uploads/${fileName}`}:eventData;
    await Event.findByIdAndUpdate(id, updatedData);

    return NextResponse.json(
      { message: "Event Details have been updated!" },
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


import { NextRequest, NextResponse } from "next/server";
// import { mkdir } from "fs/promises";
import path from "path";
import fs from "fs";
import { connectToDatabase } from "../../../../lib/mongoose";
import Notice from "../../../../models/notice";
import { supabase } from "../../../../lib/superbase";

const requiredFields:(keyof NoticeDTO)[] = [
      "title",
      "date",
    ];

 type NoticeDTO= {
  title:string,
  date:string,
 }  

const getFormData = async (request: NextRequest, formData:FormData) => {
  return {
    title: formData.get("title")?.toString(),
    date: formData.get("date")?.toString(),
};
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await request.formData();
   const NoticeData=await getFormData(request, formData);
    const missingFields = requiredFields.filter((field) => !NoticeData[field]);
    if (missingFields.length > 0) {
    return NextResponse.json(
        { message: `Missing fields: ${missingFields.join(", ")}` },
        { status: 400 }
    );
    }
    // Extract file and form fields
     const titleMatch = await Notice.findOne({ title:NoticeData?.title });
    if (titleMatch) {
      return NextResponse.json({ message: "Title already exists!" }, { status: 409 });
    }

    // Save file to /public/uploads
      const file = formData.get("file") as File;
    // const uploadsDir = path.join(process.cwd(), "public", "uploads");
    // await mkdir(uploadsDir, { recursive: true }); // ensure uploads folder exists

    let fileUrl='';
    if(file?.name){
      const fileName = `${Date.now()}_${file.name}`;
    // const filePath = path.join(uploadsDir, fileName);
    // const buffer = Buffer.from(await file.arrayBuffer());
    // await writeFile(filePath, buffer);
    //  fileUrl = `/uploads/${fileName}`;

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
    
    await Notice.create({
      ...NoticeData,
      file: fileUrl, // Store relative path
    });

    return NextResponse.json(
      {
        message: "Notice has been added",    
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding Notice:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const notice = await Notice.find();
    const formatted = notice.map(notice => {
      return {
      ...notice.toObject(),
      file: notice.file
    }});
    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch notice' }, { status: 500 });
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
        const notice=await Notice.findOne({_id:id});
        if(!notice){
            return NextResponse.json({message:"Notice not found!",},{status:404})
        };
        await Notice.deleteOne({_id:id});
        return NextResponse.json({message:"Notice has been deleted!",},{status:202})
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
    const NoticeData = await getFormData(request, formData);

    const missingFields = requiredFields.filter(
      (field) => !NoticeData[field]
    );
    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const checkNotice = await Notice.findById(id);
    if (!checkNotice) {
      return NextResponse.json(
        { message: "Notice not found!" },
        { status: 404 }
      );
    }

    const file = formData.get("file") as File | null;
    let fileName;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload dir
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // ✅ Delete the old file if it exists
      if (checkNotice.file) {
        const oldfilePath = path.join(process.cwd(), "public", checkNotice.file);
        if (fs.existsSync(oldfilePath)) {
          fs.unlinkSync(oldfilePath);
        }
      }

      // Save new file
       fileName = `${Date.now()}_${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);

      // Store relative path in DB
    }

    const updatedData=fileName?{...NoticeData}:{...NoticeData, file:`/uploads/${fileName}`}
    await Notice.findByIdAndUpdate(id, updatedData);

    return NextResponse.json(
      { message: "Notice Details have been updated!" },
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

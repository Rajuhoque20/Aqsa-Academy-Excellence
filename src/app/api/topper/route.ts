
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { connectToDatabase } from "../../../../lib/mongoose";
import Topper from "../../../../models/topper";
import { supabase } from "../../../../lib/superbase";
// import { supabase } from "../../../../lib/superbase";

type TopperDTO={
    "name":string,
    "description":string,
    "marks":string,
    "class":string,
}
const requiredFields:(keyof TopperDTO)[] = [
      "name",
      "description",
      "marks",
      "class",
    ];

const getFormData = async (request: NextRequest, formData:FormData) => {
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
   const topperData=await getFormData(request, formData);
    const missingFields = requiredFields.filter((field) => !topperData[field]);
    if (missingFields.length > 0) {
    return NextResponse.json(
        { message: `Missing fields: ${missingFields.join(", ")}` },
        { status: 400 }
    );
    }


    //superbase
   
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
    await Topper.create({
      ...topperData,
      image: fileUrl, // Store relative path
    });


    //Local uploads

    //  const file = formData.get("image") as File | null;
    
    //     let fileName;
    //     if (file && file.size > 0) {
    //       const bytes = await file.arrayBuffer();
    //       const buffer = Buffer.from(bytes);
    
    //       // Upload dir
    //       const uploadDir = path.join(process.cwd(), "public", "uploads");
    //       if (!fs.existsSync(uploadDir)) {
    //         fs.mkdirSync(uploadDir, { recursive: true });
    //       }
    
    //        fileName = `${Date.now()}_${file.name}`;
    //       const filePath = path.join(uploadDir, fileName);
    //       fs.writeFileSync(filePath, buffer);
    
    //     }
    
    //     const updatedData=fileName?{...topperData, image:`/uploads/${fileName}`,
    //    }:topperData
    
    // await Topper.create(updatedData);


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
    const topperData = await getFormData(request, formData);

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
      if (checkTopper.image) {
        const oldImagePath = path.join(process.cwd(), "public", checkTopper.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Save new file
       fileName = `${Date.now()}_${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);

      // Store relative path in DB
      // topperData.image = `/uploads/${fileName}`;
    }
     const updatedData=fileName?{...topperData, image:`/uploads/${fileName}`}:topperData;
    await Topper.findByIdAndUpdate(id,updatedData);

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

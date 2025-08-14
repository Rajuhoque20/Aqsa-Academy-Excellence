// app/api/students/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { connectToDatabase } from "../../../../lib/mongoose";
import Students from "../../../../models/students";
import StudentPayment from "../../../../models/studentPayment";

const requiredFields = [
      "name",
      "email",
      "current_class",
      "address",
      "father_name",
      "mother_name",
      "gender",
      "phone",
      "monthly_fees",
      "registration_fees",
    ];

const getFormData = async (request: NextRequest, formData:any) => {
  return {
    name: formData.get("name")?.toString(),
    email: formData.get("email")?.toString(),
    current_class: formData.get("current_class")?.toString(),
    address: formData.get("address")?.toString(),
    father_name: formData.get("father_name")?.toString(),
    mother_name: formData.get("mother_name")?.toString(),
    phone: formData.get("phone")?.toString(),
    gender: formData.get("gender")?.toString(),
    monthly_fees: formData.get("monthly_fees")?.toString(),
    registration_fees: formData.get("registration_fees")?.toString(),
  };
};

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await request.formData();
   const studentData:any=await getFormData(request, formData);
    const missingFields = requiredFields.filter((field) => !studentData[field]);
    console.log("studentData", studentData,missingFields)
    if (missingFields.length > 0) {
    return NextResponse.json(
        { message: `Missing fields: ${missingFields.join(", ")}` },
        { status: 400 }
    );
    }
    // Extract file and form fields
    const file = formData.get("marksheet") as File;
     const emailMatch = await Students.findOne({ email:studentData?.email });
    if (emailMatch) {
      return NextResponse.json({ message: "Email already exists!" }, { status: 409 });
    }

    // Generate regno
    const students = await Students.find({ current_class:studentData?.current_class });
    const year = new Date().getFullYear();
    let regno = `${studentData?.current_class}${year}`;
    regno += students?.length > 0 ? (students.length>9?students.length + 1:`0${students.length + 1}`) : '01';
    const rollno=students?.length > 0?students?.length+1:1;

    // Save file to /public/uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true }); // ensure uploads folder exists

    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadsDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${fileName}`; // This is what you'll save in DB

    // Save to MongoDB
    await Students.create({
      regno,
      rollno,
      ...studentData,
      marksheet: fileUrl, // Store relative path
    });

    return NextResponse.json(
      {
        message: "Student has been added",
        marksheetUrl: fileUrl,
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
    const students = await Students.find();
    const payments= await StudentPayment.find().lean();

    // Construct full file URL if needed
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    
    const formatted = students.map(student => {
       const dueFees=payments.filter((item)=>item.studentId===student._id.toString()).reduce((tot,item)=>Number(item.due_fees)+tot, 0)
      return {
      ...student.toObject(),
      marksheet_url: student.marksheet
        ? `${baseUrl}${student.marksheet}`
        : null,
    dueFees
    }});

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch students' }, { status: 500 });
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
        const student=await Students.findOne({_id:id});
        if(!student){
            return NextResponse.json({message:"Student not found!",},{status:404})
        };
        await Students.deleteOne({_id:id});
        return NextResponse.json({message:"Student has been deleted!",},{status:202})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message:"Failed to delete!"},{status:500})
    }
    
}

export async function PATCH(request:NextRequest){
    const searchParams=request.nextUrl.searchParams;
    const id=searchParams.get('id');
    try{
            await connectToDatabase();
             const formData = await request.formData();
            const studentData: any = await getFormData(request, formData);
                const missingFields = requiredFields.filter((field) => !studentData[field]);
                if (missingFields.length > 0) {
                return NextResponse.json(
                    { message: `Missing fields: ${missingFields.join(", ")}` },
                    { status: 400 }
                );
            }
            const checkStudent=await Students.findOne({_id:id});
            if(!checkStudent){
                return NextResponse.json({message:"Student not found!"},{status:404}) 
            }
            console.log("studentData", studentData)
            await Students.findByIdAndUpdate(id,{...studentData});
            return NextResponse.json({message:"Student Details has been updated!"},{status:201})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message:"Internal server error!"},{status:500})
    }
}

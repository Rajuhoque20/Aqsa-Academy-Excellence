
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongoose";
import Teacher from "../../../../models/teacher";
import TeacherPayment from "../../../../models/teacherPayment";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await request.json();
  console.log("formData", formData)
    if (!formData.name||!formData.email||!formData.phone||!formData.address||!formData.monthly_salary) {
    return NextResponse.json(
        { message: 'Missing required fields'},
        { status: 400 }
    );
    }
     const emailMatch = await Teacher.findOne({ email:formData?.email });
    if (emailMatch) {
      return NextResponse.json({ message: "Email already exists!" }, { status: 409 });
    }

    await Teacher.create(formData);

    return NextResponse.json(
      {
        message: "A teacher has been added",
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
    const teachers = await Teacher.find();
    const teacherPayment=await TeacherPayment.find().lean();
    const formatted = teachers.map(teacher => {
       const due_salary=teacherPayment.filter((item)=>item.teacherId===teacher._id.toString()).reduce((tot,item)=>Number(item.due_fees)+tot, 0)
      return {
      ...teacher.toObject(),
    due_salary
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
        const student=await Teacher.findOne({_id:id});
        if(!student){
            return NextResponse.json({message:"Teacher not found!",},{status:404})
        };
        await Teacher.deleteOne({_id:id});
        return NextResponse.json({message:"Teacher has been deleted!",},{status:202})
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
             const formData = await request.json();
            if (!formData.name||!formData.email||!formData.phone||!formData.address||!formData.monthly_salary) {
            return NextResponse.json(
                { message: 'Missing required fields'},
                { status: 400 }
            );
            }
            const checkTeacher=await Teacher.findOne({_id:id});
            if(!checkTeacher){
                return NextResponse.json({message:"Student not found!"},{status:404}) 
            }
            await Teacher.findByIdAndUpdate(id,formData);
            return NextResponse.json({message:"Student Details has been updated!"},{status:201})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message:"Internal server error!"},{status:500})
    }
}

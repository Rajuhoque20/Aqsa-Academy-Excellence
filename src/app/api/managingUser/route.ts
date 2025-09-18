
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongoose";
import ManagingUser from "../../../../models/managingUser";
 import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await request.json();
    if (!formData.name||!formData.email||!formData.phone||!formData.address||!formData.role) {
    return NextResponse.json(
        { message: 'Missing required fields'},
        { status: 400 }
    );
    }
     const emailMatch = await ManagingUser.findOne({ email:formData?.email });
    if (emailMatch) {
      return NextResponse.json({ message: "Email already exists!" }, { status: 409 });
    }

    const password=formData.name?.split(' ')[0]+'123@';
    const hashedPassword = await bcrypt.hash(password, 10);
    const data={...formData, username:formData.email, password:hashedPassword}

    await ManagingUser.create(data);

    return NextResponse.json(
      {
        message: "A Managing User has been added",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding Managing User:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectToDatabase();
    const managingUsers = await ManagingUser.find();
    return NextResponse.json(managingUsers, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch Managing Users' }, { status: 500 });
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
        const managingUser=await ManagingUser.findOne({_id:id});
        if(!managingUser){
            return NextResponse.json({message:"Managing User not found!",},{status:404})
        };
        await ManagingUser.deleteOne({_id:id});
        return NextResponse.json({message:"Managing User has been deleted!",},{status:202})
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
            if (!formData.name||!formData.email||!formData.phone||!formData.address||!formData.role) {
            return NextResponse.json(
                { message: 'Missing required fields'},
                { status: 400 }
            );
            }
            const checkManagingUser=await ManagingUser.findOne({_id:id});
            if(!checkManagingUser){
                return NextResponse.json({message:"Managing User not found!"},{status:404}) 
            }
            await ManagingUser.findByIdAndUpdate(id,formData);
            return NextResponse.json({message:"Managing User Details has been updated!"},{status:201})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message:"Internal server error!"},{status:500})
    }
}


import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongoose";
import Stuff from "../../../../models/stuff";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await request.json();
    if (!formData.name||!formData.designation||!formData.phone||!formData.address||!formData.monthly_salary) {
    return NextResponse.json(
        { message: 'Missing required fields'},
        { status: 400 }
    );
    }
     const nameMatch = await Stuff.findOne({ name:formData?.name });
    if (nameMatch) {
      return NextResponse.json({ message: "Name already exists!" }, { status: 409 });
    }

    await Stuff.create(formData);

    return NextResponse.json(
      {
        message: "A stuff has been added",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding stuff:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectToDatabase();
    const stuff = await Stuff.find();
    return NextResponse.json(stuff, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch stuff' }, { status: 500 });
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
        const stuff=await Stuff.findOne({_id:id});
        if(!stuff){
            return NextResponse.json({message:"Stuff not found!",},{status:404})
        };
        await Stuff.deleteOne({_id:id});
        return NextResponse.json({message:"Stuff has been deleted!",},{status:202})
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
            if (!formData.name||!formData.designation||!formData.phone||!formData.address||!formData.monthly_salary) {
            return NextResponse.json(
                { message: 'Missing required fields'},
                { status: 400 }
            );
            }
            const checkStuff=await Stuff.findOne({_id:id});
            if(!checkStuff){
                return NextResponse.json({message:"Stuff not found!"},{status:404}) 
            }
            await Stuff.findByIdAndUpdate(id,formData);
            return NextResponse.json({message:"Stuff Details has been updated!"},{status:201})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message:"Internal server error!"},{status:500})
    }
}

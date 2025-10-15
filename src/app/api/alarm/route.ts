
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongoose";
import Alarm from "../../../../models/alarm";


export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await request.json();
    if (!formData.time||!formData.type) {
    return NextResponse.json(
        { message: 'Missing required fields'},
        { status: 400 }
    );
    }
     const timeMatch = await Alarm.findOne({ time:formData?.time });
    if (timeMatch) {
      return NextResponse.json({ message: "this is already sheduled!" }, { status: 409 });
    }
    await Alarm.create(formData);

    return NextResponse.json(
      {
        message: "An alarm has been added",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding alarm:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectToDatabase();
    const alarms = await Alarm.find();
    return NextResponse.json(alarms, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch alarms' }, { status: 500 });
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
        const alarm=await Alarm.findOne({_id:id});
        if(!alarm){
            return NextResponse.json({message:"Alarm not found!",},{status:404})
        };
        await Alarm.deleteOne({_id:id});
        return NextResponse.json({message:"Alarm has been deleted!",},{status:202})
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
            if (!formData.time||!formData.type) {
            return NextResponse.json(
                { message: 'Missing required fields'},
                { status: 400 }
            );
            }
            const checkAlarm=await Alarm.findOne({_id:id});
            if(!checkAlarm){
                return NextResponse.json({message:"Alarm not found!"},{status:404}) 
            }
            await Alarm.findByIdAndUpdate(id,formData);
            return NextResponse.json({message:"Alarm has been updated!"},{status:201})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message:"Internal server error!"},{status:500})
    }
}

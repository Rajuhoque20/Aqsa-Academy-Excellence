import { NextRequest, NextResponse } from "next/server";
import Users from "../../../../models/users";
import { connectToDatabase } from "../../../../lib/mongoose";

export async function POST(request:NextRequest){
    const {username, password}= await request.json();
    if(!username|| !password)
    {
        return NextResponse.json({message:"Missing Required fields!", type:"error",},{status:400})
    }
    try{
         await connectToDatabase();
        const user= await Users.findOne({username});
    if(!user){
        return NextResponse.json({message:"User not found!", type:"error",},{status:404})
    }
   
    const data={
        username,
        name:user?.name,
        email:user?.email,
        role:user?.role,
        token:"token"
    }
     return NextResponse.json({message:"Logged in successfully", type:"success",data},{status:200})

    }
    catch(err){
        console.log(err);
      
    }
    
}
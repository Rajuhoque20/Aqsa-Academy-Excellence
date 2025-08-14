import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongoose"
import Users from "../../../../models/users";

export async function POST(request:NextRequest){
    try{
       await connectToDatabase();
       const {name, email, username, password, role}= await request.json();
       await Users.create({name, email, username, password, role});
       return NextResponse.json({message:'New user has been created'},{status:201})
    }
    catch(err){
        console.log(err)
    }
}
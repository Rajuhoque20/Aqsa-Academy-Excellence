import { NextRequest, NextResponse } from "next/server";
import NewStudentRegistration from "../../../../models/newStudentRegistration";
import path from "path";
import { mkdir, writeFile } from "fs/promises";
import { connectToDatabase } from "../../../../lib/mongoose";


type RegData={
    name:string,
    email:string,
    phone:string,
    class:string,
    address:string,
    marks:string,
    school:string,
    father_name?:string,
    mother_name?:string,
}

function getFormData( formData:FormData){
    return{
        name:formData.get('name')?.toString()||'',
        email:formData.get('email')?.toString()||'',
        phone:formData.get('phone')?.toString()||'',
        class:formData.get('class')?.toString()||'',
        address:formData.get('address')?.toString()||'',
        school:formData.get('school')?.toString()||'',
        father_name:formData.get('father_name')?.toString()||'',
        mother_name:formData.get('mother_name')?.toString()||'',
        marks:formData.get('marks')?.toString()||'',
        gender:formData.get('gender')?.toString()||'',
    }
}

const requiredFields=["name", "email", "phone", "marks", "address", "class", "school", "marks"];

export async function POST(req:NextRequest){
   try{
            await connectToDatabase();
            const formData=await req.formData();
            const regData:RegData=getFormData(formData);
            const missingFields=requiredFields?.filter(fields=>!regData[fields as keyof typeof regData]);
            if(missingFields.length>0){
                return NextResponse.json({
                    message:`Missing Required fileds ${missingFields.join(' ')}`
                },
                {
                    status:400
                }
            )
            }
            const emailMatch=await NewStudentRegistration.findOne({email:regData?.email});
            if(emailMatch){
                return NextResponse.json({
                    message:"Email already exist!",
                },
            {
                status:409
            })
            };
            const file=formData.get('markSheet') as File;
            const uploadDir=path.join(process.cwd(),'public','uploads');
            await mkdir(uploadDir, {recursive:true});
            let fileUrl='';
            if(file.name){
                const fileName=`${Date.now()}_${file.name}`;
                const filePath=path.join(uploadDir, fileName);
                const buffer=Buffer.from(await file.arrayBuffer());
                await writeFile(filePath, buffer);
                fileUrl=`/uploads/${fileName}`;
            }
            console.log("fileUrl",fileUrl)
            await NewStudentRegistration.create({
                ...regData,
                marksSheet:fileUrl,
            });
            return NextResponse.json({
                message:"New Student registration done successfully",
            },
        {
            status:201
        })
   }
   catch(error){
    console.log(error);
     return NextResponse.json({
        message:"New Student registration done successfully",
    },
    {
        status:500
    })
   }

}

export async function GET() {
    try{
        await connectToDatabase();
        const data=await NewStudentRegistration.find();
        return NextResponse.json(data,{status:200});
    }
    catch(error){
        console.log(error);
    } 
}
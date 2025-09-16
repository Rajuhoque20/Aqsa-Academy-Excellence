import { NextRequest, NextResponse } from "next/server";
import NewStudentRegistration from "../../../../models/newStudentRegistration";
import path from "path";
import { mkdir, writeFile } from "fs/promises";
import { connectToDatabase } from "../../../../lib/mongoose";
import Students from "../../../../models/students";


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
    type?:string,
    gender?:string,
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
            const contentType = req.headers.get("content-type") || "";

            if (contentType.includes("application/json")) {
                const regData=await req.json();
                
            if(regData?.type==='SELECT'){
                const emailMatch=await Students.findOne({email:regData?.email});
                if(emailMatch){
                    return NextResponse.json({message:'Email already registered as a student'},{status:409})
                }
                const students = await Students.find({ current_class:regData?.class });
                const year = new Date().getFullYear();
                let regno = `${regData?.class}${year}`;
                regno += students?.length > 0 ? (students.length>9?students.length + 1:`0${students.length + 1}`) : '01';
                const rollno=students?.length > 0?students?.length+1:1;

                // Save file to /public/uploads
                const data={
                    "name":regData?.name,
                    "email":regData?.email,
                    "current_class":regData?.class,
                    "address":regData?.address,
                    "father_name":regData?.father_name,
                    "mother_name":regData?.mother_name,
                    "gender":regData?.gender,
                    "phone":regData?.phone,
                    "monthly_fees":4000,
                    "registration_fees":10000,
                }
                await Students.create({
                regno,
                rollno,
                ...data,
               markSheet:regData?.marksSheet, // Store relative path
                });
                await NewStudentRegistration.findByIdAndDelete({_id:regData?._id});

                return NextResponse.json(
                {
                    message: "The candidate has been registered as a student.",
                },
                { status: 201 }
                );

            }
            }
            else{
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

            
                 const [candiateEmailMatch, studentEmailMatch]=await Promise.all([NewStudentRegistration.findOne({email:regData?.email}),Students.findOne({email:regData?.email})]);
                    if(candiateEmailMatch||studentEmailMatch){
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
           
   }
   catch(error){
    console.log(error);
     return NextResponse.json({
        message:"Something went wrong!",
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
        data.sort((a,b)=>b.marks-a.marks);
        return NextResponse.json(data,
            {status:200});
    }
    catch(error){
        console.log(error);
    } 
};

export async function DELETE(req:NextRequest) {
    try{
        await connectToDatabase();
        const searchParam=req.nextUrl.searchParams;
        const id=searchParam.get('id');
        const checkCandidate=await NewStudentRegistration.findOne({_id:id});
        if(!checkCandidate){
            return NextResponse.json({message:"Candidate does not exist!"},{status:404})
        };
        await NewStudentRegistration.findByIdAndDelete({_id:id});
        return NextResponse.json({message:"Candidate has been deleted!"},{status:200})
    }
    catch(error){
        console.log(error)
    }
    
}


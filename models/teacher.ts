import mongoose, { model, models } from "mongoose";
const teacherSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    monthly_salary:{
        type:String,
        required:true,
    },
});
teacherSchema.index({email:1},{unique:true})

const Teacher=models.Teacher||model("Teacher",teacherSchema);
export default Teacher;
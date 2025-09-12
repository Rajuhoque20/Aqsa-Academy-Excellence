import mongoose, { model, models } from "mongoose";

const newStudentRegSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        required:true,
    },
    school:{
        type:String,
        required:true,
    },
    father_name:{
        type:String,
    },
    mother_name:{
        type:String,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    class:{
        type:String,
        required:true,
    },
    marks:{
        type:String,
        required:true,
    },
    marksSheet:{
        type:String,
    }

}, {timestamps:true});

const NewStudentRegistration=models.NewStudentRegistration||model("NewStudentRegistration",newStudentRegSchema);
export default NewStudentRegistration;
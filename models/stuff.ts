import mongoose, { model, models } from "mongoose";
const stuffSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    designation:{
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

const Stuff=models.Stuff||model("Stuff",stuffSchema);
export default Stuff;
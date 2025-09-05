import mongoose, { model, models } from "mongoose";
const managingUserSchema=new mongoose.Schema({
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
    role:{
        type:String,
        required:true,
    },
});

const ManagingUser=models.ManagingUser||model("ManagingUser",managingUserSchema);
export default ManagingUser;
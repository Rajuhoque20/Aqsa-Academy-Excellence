import mongoose, { model, models } from "mongoose";
const topperSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    marks:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:''
    },
    class:{
        type:String,
        required:true,
    },
});

const Topper=models.Topper||model("Topper",topperSchema);
export default Topper;
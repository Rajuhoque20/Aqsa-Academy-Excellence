import mongoose, { model, models } from "mongoose";
const noticeSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    
    file:{
        type:String,
        default:''
    },
    date:{
        type:String,
        required:true,
    },
});

const Notice=models.Notice||model("Notice",noticeSchema);
export default Notice;
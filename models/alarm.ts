import mongoose, { model, models } from "mongoose";
const alarmSchema=new mongoose.Schema({
    time:{
        type:String,
        required:true,
        unique:true,
    },
    type:{
        type:String,
        required:true,
    },
});

const Alarm=models.Alarm||model("Alarm",alarmSchema);
export default Alarm;
import mongoose, { model, models } from "mongoose";
const eventSchema=new mongoose.Schema({
    title:{
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
    date:{
        type:String,
        required:true,
    },
});

const Event=models.Event||model("Event",eventSchema);
export default Event;
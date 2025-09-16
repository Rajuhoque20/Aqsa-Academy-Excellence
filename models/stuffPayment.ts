import mongoose, { model, models } from "mongoose";

const stuffSchema=new mongoose.Schema({
    stuffId:{
        type:String,
        required:true,
    },
    pay_month:{
        type:String,
        required:true,
    },
    monthly_fees:{
        type:String,
        required:true,
    },
    paid_amount:{
        type:String,
        required:true,
    },
    due_fees:{
        type:String,
        required:true,
    },
    pay_date:{
        type:String,
        required:true,
    }

},{
    timestamps:true
})

const StuffPayment=models.StuffPayment||model("StuffPayment",stuffSchema);
export default StuffPayment;
import mongoose, { model, models } from "mongoose";

const teacherPaymentSchema=new mongoose.Schema({
    teacherId:{
        type:String,
        required:true,
    },
    pay_month:{
        type:String,
        required:true,
        unique:true,
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
});



const TeacherPayment=models.TeacherPayment||model("TeacherPayment",teacherPaymentSchema);
export default TeacherPayment;
import mongoose, { model, models } from "mongoose";

const teacherSchema=new mongoose.Schema({
    teacherId:{
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

const TeacherPayment=models.TeacherPayment||model("TeacherPayment",teacherSchema);
export default TeacherPayment;
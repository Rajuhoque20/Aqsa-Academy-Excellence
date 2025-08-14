import mongoose, { model, models } from "mongoose";

const studentSchema=new mongoose.Schema({
    studentId:{
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

const StudentPayment=models.StudentPayment||model("StudentPayment",studentSchema);
export default StudentPayment;
import mongoose, { model, models } from "mongoose";


const studentPaymentSchema=new mongoose.Schema({
    studentId:{
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
})



const StudentPayment=models.StudentPayment||model("StudentPayment",studentPaymentSchema);
export default StudentPayment;
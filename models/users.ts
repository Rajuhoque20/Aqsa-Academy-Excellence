import mongoose, { InferSchemaType, model, Model, models } from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    }
},
{
    timestamps:true
});
 type UserDoc = InferSchemaType<typeof userSchema>;
const Users:Model<UserDoc>= (models.User as Model<UserDoc>) ||model<UserDoc>('User', userSchema);
export default Users;
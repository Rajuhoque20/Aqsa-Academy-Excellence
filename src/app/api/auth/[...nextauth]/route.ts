

import NextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials"
import { connectToDatabase } from "../../../../../lib/mongoose";
import Users from "../../../../../models/users";
import bcrypt from 'bcryptjs';
export const authOptions={
    providers:[
        CredentialsProvider({
            name:'credentails',
            credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" },
            },
            async authorize(credentials){
            const {password, username}=credentials;
            console.log("credentials",credentials)
            try{
                await connectToDatabase();
                const user=await Users.findOne({username});
                if(!user){
                    return null;
                }
                // const passwordMatch=await bcrypt.compare(user.password, password);
                // if(!passwordMatch){
                //     return null;
                // }
                 return user;
               
            }
             catch(err){
                    console.log(err)
                    return null;
                }
        }
        }),  
    ],
     session:{
            strategy:'jwt',
        },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        sign:'login'
    }
};

const handler=NextAuth(authOptions);

export  {handler as POST, handler as GET};
import connect from "@/dbConfig/dbConfig";
import User from "@/models/User"
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs"

connect()

export async function POST(request:NextRequest) {
    try {
        const data = await request.json()
        const {username,email,password} = data
        const user = await User.findOne({email})
        if (user) {
            return NextResponse.json({
                status:400,
                message:"Email is already taken",
                data:{},
    
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const registration = new User({
              username: username,
              email: email,
              password: hashedPassword,
            });
           const user = await registration.save();
           return NextResponse.json({
            status:201,
            message:"User Register Successfully",
            data:{user},

        })
        }
    } catch (error) {
        return NextResponse.json({
            status:400,
            message:"Error while creating user",
            data:String(error),

        })
    }
}


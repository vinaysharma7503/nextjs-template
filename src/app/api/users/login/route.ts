import connect from "@/dbConfig/dbConfig";
import User from "@/models/User"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const { email, password } = data
        const user: any = await User.findOne({ email })
        console.log(user,'user')
        if (!user) {
            return NextResponse.json({
                status: 404,
                message: "User not found",
                data: {},

            })
        } else {
            const isMatched = await bcrypt.compare(password, user?.password);
            if (isMatched) {
                const tokenData = {
                    _id:user?._id,
                    email:user?.email,
                    username:user?.username
                }
                const token = await jwt.sign(tokenData,process.env.JWT_SECRET!,{expiresIn:"1d"})
                // return NextResponse.json({
                //     status: 200,
                //     message: "User login sucessfully",
                //     data: {
                //         user,
                //         token
                //     },
    
                // })
                const response:any = NextResponse.json({
                    status: 200,
                    message: "User login sucessfully",
                })
                response?.cookies.set("token",token,{httpOnly:true})
                return response
            }else{
                return NextResponse.json({
                    status: 400,
                    message: "Invalid email or password",
                    data: {},
    
                })
            }
        } 
        } catch (error) {
            return NextResponse.json({
                status: 400,
                message: "Error while Login user",
                data: String(error),

            })
        }
    }
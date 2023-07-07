import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response:any = NextResponse.json({
            status: 200,
            message: "Logout sucessfully",
        })
        response?.cookies.set("token","",{httpOnly:true,expires:new Date(0)})
        return response
    } catch (error) {
        return NextResponse.json({
            status: 400,
            message: "Error while Logout user",
            data: String(error),

        })
    }
}
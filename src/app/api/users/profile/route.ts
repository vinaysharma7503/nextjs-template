import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/User";
import connect from "@/dbConfig/dbConfig";

connect()

export async function GET(request: NextRequest) {
    try {
        const userData = await getDataFromToken(request)
        const user = await User.findOne({_id:userData?._id}).select("-password");
        if(user){
            return NextResponse.json({
                status:200,
                message:"User Found",
                data:{user}
            },{status:200})
        }else{
            return NextResponse.json({
                status:401,
                message:"User Not Found",
                data:{}
            },{status:401})
        }
    } catch (error:any) {
        return NextResponse.json({
            status:400,
            message:error?.message,
            data:{}
        },{status:400})
    }
}
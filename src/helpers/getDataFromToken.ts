import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken =(request:NextRequest)=>{
    try {
      const token =  request?.cookies.get("token")?.value || ""
       let decodeToken:any =  jwt.verify(token,process.env.JWT_SECRET!)
       return decodeToken
    } catch (error:any) {
        throw new Error(error?.message)
    }
}
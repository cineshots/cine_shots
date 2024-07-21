import { NextRequest, NextResponse } from "next/server";
import  dbConnect  from "@/config/dbConfig";
import { User } from "@/model";
import jwt from "jsonwebtoken";

dbConnect();


export async function POST(request){
    try {
        const reqBody = await request.json();
        const {name, password} = reqBody;
        
        //check if user exists
        const user = await User.findOne({username : name})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        
        //check if password is correct
        if(user?.password !== password){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        const tokenData = {
            id: user?._id,
            name  : user?.username
        }

        // Create a token with expiration of 1 day
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})

        // Create a JSON response indicating successful login
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        }, {status: 200})

        // Set the token as an HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}
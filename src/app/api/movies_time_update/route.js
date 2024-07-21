import { NextRequest, NextResponse } from "next/server";
import  dbConnect  from "@/config/dbConfig";
import { Movie} from "@/model";
import jwt from "jsonwebtoken";

dbConnect();


export async function POST(request){
    try {
        const reqBody = await request.json();
        const {time, id} = reqBody;

        if(!time || !id ) return NextResponse.json({error: "Enter timestamp first"}, {status: 400})
        
        //check if user exists
        const movie = await Movie.findOneAndUpdate({_id : id}, {$set : {time_stamp : time}})
        if(!movie) return NextResponse.json({ error: "Something went wrong", success: false}, {status: 500})
        return NextResponse.json({ message: "Movie timestamp updated success", success: true}, {status: 200})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}
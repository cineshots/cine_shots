import { NextRequest, NextResponse } from "next/server";
import  dbConnect  from "@/config/dbConfig";
import { Movie} from "@/model";
import jwt from "jsonwebtoken";

dbConnect();


export async function POST(request){
    try {
        const reqBody = await request.json();
        const { id} = reqBody;

        if( !id ) return NextResponse.json({error: "Provide movie id"}, {status: 400})
        //check if user exists
        const movie = await Movie.findOneAndDelete({_id : id})
        console.log(movie)
        if(!movie) return NextResponse.json({ error: "Something went wrong", success: false}, {status: 500})
        return NextResponse.json({ message: "Movie deleted success", success: true}, {status: 200})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}
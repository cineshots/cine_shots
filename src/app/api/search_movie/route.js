import { NextRequest, NextResponse } from "next/server";
import  dbConnect  from "@/config/dbConfig";
import { Movie} from "@/model";

dbConnect();


export async function POST(request){
    try {
        const reqBody = await request.json();
        const {name} = reqBody;

        if(!name ) return NextResponse.json({error: "Enter Movie Name first"}, {status: 400})
      
        //check if user exists
        const movie = await Movie.find({ name: { $regex: new RegExp(name, 'i') } });
        if(!movie) return NextResponse.json({ error: "Something went wrong", success: false}, {status: 500})
        return NextResponse.json({ items : movie}, {status: 200})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}
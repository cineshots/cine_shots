import { NextRequest, NextResponse } from "next/server";
import  dbConnect  from "@/config/dbConfig";
import { Movie} from "@/model";

dbConnect();


export async function POST(request){
    try {
        const reqBody = await request.json();
        const {status, id} = reqBody;

        if(!id ) return NextResponse.json({error: "Enter Movie Id first"}, {status: 400})
        if (status < 0 || status > 2) {
                return NextResponse.json({ error: "Status should be between 0 and 2" }, { status: 400 });
        }
              
        
        //check if user exists
        const movie = await Movie.findOneAndUpdate({_id : id}, {$set : {status}})
        if(!movie) return NextResponse.json({ error: "Something went wrong", success: false}, {status: 500})
        return NextResponse.json({ message: "Movie Status updated success", success: true}, {status: 200})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}
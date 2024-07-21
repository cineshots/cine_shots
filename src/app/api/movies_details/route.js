import {  NextResponse } from "next/server";
import  dbConnect  from "@/config/dbConfig";
import { Movie} from "@/model";


dbConnect();


export async function POST(request){
    try {
        const reqBody = await request.json();
        const { id } = reqBody;
       
        // Query MongoDB with pagination parameters
        const movies = await Movie.findOne({ _id : id});
        return NextResponse.json({ items: movies}, { status: 200 });

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}
import { NextRequest, NextResponse } from "next/server";
import  dbConnect  from "@/config/dbConfig";
import { Movie} from "@/model";
import jwt from "jsonwebtoken";

dbConnect();


export async function POST(request){
    try {
        const reqBody = await request.json();
        const {image, name, genres, category} = reqBody;

        if(!image || !name || !genres || !category) return NextResponse.json({error: "Enter all details first"}, {status: 400})
        
        //check if user exists
        const movie = await Movie.findOne({name})
        if(movie){
            return NextResponse.json({error: "Movie already exist"}, {status: 400})
        }
        
        const movieDetails = new Movie({
            banner : image,
            name : name, 
            Genres : genres,
            uploader_name : "v",
            category
        })
        const createMovieDetails = await movieDetails.save();
        if(!createMovieDetails) return NextResponse.json({ error: "Something went wrong", success: false}, {status: 500})
        
        return NextResponse.json({ message: "Movie detail created success", success: true}, {status: 201})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}
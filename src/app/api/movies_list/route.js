import {  NextResponse } from "next/server";
import  dbConnect  from "@/config/dbConfig";
import { Movie} from "@/model";


dbConnect();


export async function POST(request){
    try {
        const reqBody = await request.json();
        const { page = 1, activeTab, category } = reqBody;
        const limit = 20; // Limit for pagination
        const skip = (page - 1) * limit;

        // Query MongoDB with pagination parameters
        const [count, movies] = await Promise.all([Movie.countDocuments({status: activeTab, category}), Movie.find({ status: activeTab, category }).skip(skip).limit(limit).exec()]);
        const totalPages = Math.ceil(count / limit); // Calculate total pages

        // Calculate range of data being shown
        const startRange = skip + 1;
        const endRange = skip + movies.length;

        return NextResponse.json({ items: movies, page, totalPages, range: `${startRange}-${endRange}` }, { status: 200 });

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}
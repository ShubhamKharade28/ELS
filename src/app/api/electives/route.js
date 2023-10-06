
import connectDB from "@/utils/db/db.config";
import { NextResponse } from "next/server";
import Elective from "@/utils/models/elective";

export async function GET(req){
    try{
        await connectDB();
        
        const data = await Elective.find();

        return NextResponse.json(data);

    }catch(error){
        console.log(error);
        return NextResponse.json({
            error: 'INTERNAL_SERVER_ERROR'
        }, { status: 404});
    }
}
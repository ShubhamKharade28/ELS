
import { connectDB, closeDB } from "@/utils/db/db.config";
import { NextResponse } from "next/server";
import Elective from "@/utils/models/elective";

export async function GET(){
    try{
        await connectDB();
        let data = await Elective.find({});
        data = await data.toArray();
        
        await closeDB();
        return NextResponse.json(data);

    }catch(error){
        console.log(error);
        await closeDB();
        return NextResponse.json({
            error: 'INTERNAL_SERVER_ERROR'
        }, { status: 500});
    }
}
import { NextResponse } from "next/server";

import { connectDB, closeDB } from "@/utils/db/db.config";
import Elective from "@/utils/models/elective";

export async function GET(request, {params}){
    try {
        let adminId = params.id;
        
        await connectDB();
        let electives = await Elective.find({
            adminId
        });
        electives = await electives.toArray();

        await closeDB();
        return NextResponse.json(electives);
    } catch (error) {
        console.log(error);
        await closeDB();
        return NextResponse.json({
            error: 'Internal server error'
        });
    }
}
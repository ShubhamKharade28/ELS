
import { NextResponse } from "next/server";

import Admin from "@/utils/models/admin";
import { connectDB, closeDB } from "@/utils/db/db.config";

export async function GET(){
    try {
        
        await connectDB();
        const data = Admin.find();
        // console.log(data);
        await closeDB();
        return NextResponse.json({
            data
        });
    }catch(err){
        await closeDB();
        return NextResponse.json({
            result: false
        })
    }
}
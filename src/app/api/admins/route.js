import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { connectionStr } from "@/utils/db/db.config";
import Admin from "@/utils/models/admin";

export async function GET(){
    try {
        await mongoose.connect(connectionStr);
        
        const data = await Admin.find();
        // console.log(data);
        
        return NextResponse.json({
            data
        });
    }catch(err){
        return NextResponse.json({
            result: false
        })
    }
}
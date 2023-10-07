
import client from "@/utils/db/db.config";
import { NextResponse } from "next/server";
import Elective from "@/utils/models/elective";

export async function GET(){
    try{
        await client.connect();
        let data = await Elective.find({});
        data = await data.toArray();
        
        await client.close();
        return NextResponse.json(data);

    }catch(error){
        console.log(error);
        await client.close();
        return NextResponse.json({
            error: 'INTERNAL_SERVER_ERROR'
        }, { status: 500});
    }
}

import { NextResponse } from "next/server";

import client from "@/utils/db/db.config";
import Elective from "@/utils/models/elective";
import { ObjectId } from "mongodb";

export async function GET(req, {params}){
    try{

        await client.connect();
        const id = params.id;
        console.log('electiveId', id);

        let elective = await Elective.findOne({
            _id: new ObjectId(id),
        });

        console.log('elective',elective);

        if(!elective){
            client.close();
            return NextResponse.json({
                error: 'Data not found',
            });
        }

        
        return NextResponse.json(elective);
    }catch(error){
        console.log(error);
        return NextResponse.json({
            error: 'Internal Server Error',
        });
    }
}
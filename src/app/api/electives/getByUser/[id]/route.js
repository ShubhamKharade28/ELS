import { NextResponse } from "next/server";

import client from "@/utils/db/db.config";
import Elective from "@/utils/models/elective";

export async function GET(request, {params}){
    try {
        let adminId = params.id;

        await client.connect();
        let electives = await Elective.find({
            adminId
        });
        electives = await electives.toArray();

        await client.close();
        return NextResponse.json(electives);
    } catch (error) {
        console.log(error);
        client.close();
        return NextResponse.json({
            error: 'Internal server error'
        });
    }
}
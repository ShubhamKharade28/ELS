
import { NextResponse } from "next/server";

import client from "@/utils/db/db.config";
import Elective from "@/utils/models/elective";

export async function GET(request, {params}){
    try {
        let admin_name = params.name;

        await client.connect();

        let electives = await Elective.find({
            admin_name,
        });

        console.log(electives);

        return NextResponse.json(electives);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: 'Internal server error'
        });
    }
}

import { NextResponse } from "next/server";

import client from "@/utils/db/db.config";
import Elective from "@/utils/models/elective";
import { ObjectId } from "mongodb";

export async function GET(req, {params}){
    try{

        await client.connect();
        const id = params.id;

        let elective = await Elective.findOne({
            _id: new ObjectId(id),
        });

        if(!elective){
            client.close();
            return NextResponse.json({
                error: 'Data not found',
            });
        }

        return NextResponse.json({
            title: elective.title,
            subjects: elective.subjects,
            count: elective.count,
            maxLimit: elective.maxLimit,
            students: elective.students.map((student) => {
                delete student._id;
                return student;
            }),
        });
    }catch(error){
        return NextResponse.json({
            error: 'Internal Server Error',
        });
    }
}
import client from "@/utils/db/db.config";
import { NextResponse } from "next/server";
import Elective from "@/utils/models/elective";

export async function POST(req){
    try{
        req = await req.json();
        if(!req.title || !req.admin_name || !req.subjects){
            return NextResponse.json({
                error: 'INVALID_CREDENTIALS'
            }, { status: 422 });
        }

        if(req.subjects.length == 0){
            return NextResponse.json({
                error: 'EMPTY_SUBJECT_LIST',
            }, { status: 422 });
        }

        await client.connect();

        const subjects = req.subjects;
        let subjectList = [];
        
        subjects.forEach(subject => {
            subjectList.push({
                name: subject,
                count: 0,
                students: []
            });
        });

        let newElective = {
            name: req.title,
            admin_name: req.admin_name,
            subjects: subjectList,
            students: req.students,
            count: 0,
        };
        
        let res = await Elective.insertOne(newElective);

        return NextResponse.json(res);

    }catch(error){
        console.log(error);
        return NextResponse.json({
            error: 'INTERNAL_SERVER_ERROR'
        }, { status: 404});
    }
}
import client from "@/utils/db/db.config";
import { NextResponse } from "next/server";
import Elective from "@/utils/models/elective";

export async function POST(req){
    try{
        req = await req.json();
        console.log(req);
        if(!req.title || !req.adminId || !req.subjects){
            return NextResponse.json({
                error: 'INVALID_CREDENTIALS'
            }, { status: 422 });
        }

        if(req.subjects.length == 0){
            return NextResponse.json({
                error: 'EMPTY_SUBJECT_LIST',
            }, { status: 422 });
        }

        const subjects = req.subjects;
        let subjectList = [];
        
        subjects.forEach(subject => {
            subjectList.push({
                name: subject,
                count: 0,
                students: []
            });
        });

        let maxLimit = Math.floor(req.students.length / subjects.length) + 1;

        let newElective = {
            title: req.title,
            adminId: req.adminId,
            subjects: subjectList,
            students: req.students,
            count: 0,
            maxLimit: maxLimit,
        };

        await client.connect();
        
        let res = await Elective.insertOne(newElective);
        client.close();
        return NextResponse.json(res);

    }catch(error){
        console.log(error);
        client.close();
        return NextResponse.json({
            error: 'INTERNAL_SERVER_ERROR'
        }, { status: 404});
    }
}
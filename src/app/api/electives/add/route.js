import mongoose from "mongoose";
import { connectionStr } from "@/utils/db/db.config";
import { NextResponse } from "next/server";
import Elective from "@/utils/models/elective";

export async function POST(req){
    try{
        req = await req.json();
        if(!req.name || !req.admin_name || !req.subjects){
            return NextResponse.json({
                error: 'INVALID_CREDENTIALS'
            }, { status: 422 });
        }

        if(req.subjects.length == 0){
            return NextResponse.json({
                error: 'EMPTY_SUBJECT_LIST',
            }, { status: 422 });
        }

        await mongoose.connect(connectionStr);

        const subjects = req.subjects;
        let subjectList = [];
        
        subjects.forEach(subject => {
            subjectList.push({
                name: subject,
                count: 0,
                students: []
            });
        });

        let newElective = new Elective({
            name: req.name,
            admin_name: req.admin_name,
            subjects: subjectList,
        });
        
        let res = await newElective.save();

        return NextResponse.json(res);

    }catch(error){
        console.log(error);
        return NextResponse.json({
            error: 'INTERNAL_SERVER_ERROR'
        }, { status: 404});
    }
}
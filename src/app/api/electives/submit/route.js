import { NextResponse } from "next/server";

import client from '@/utils/db/db.config';
import Elective from "@/utils/models/elective";
import { ObjectId } from "mongodb";

function updateSubjectCount(id,subjectName){
    let filter = {
        _id: new ObjectId(id),
        'students': {
            $elemMatch: {
                name: subjectName,
            }
        }
    };
    
    let update = {
        $inc: {
            'subjects.$.count': 1,
        }
    };
    let updateRes = Elective.findOneAndUpdate(filter,update);
    return updateRes;
}

function updateElective(id,studentName,prn,subjectName){
    let filter = {
        _id: new ObjectId(id),
        'students': {
            $elemMatch: {
                name: { $regex: studentName, options: 'i'},
                prn: prn,
            }
        }
    };
    let update = {
        $set: {
            'students.$.elective': subjectName,
        },
        $inc: {
            count: 1,
        },
    }
    let student = Elective.findOneAndUpdate(filter,update);
    if(student){
        updateSubjectCount(id,subjectName);
    }
    return student;
}

export async function POST(req){
    try {
        req = await req.json();
        const id = req.electiveId;
        const studentName = req.studentName;
        const subjectName = req.subjectName;
        const prn = req.prn;
        
        await client.connect();

        let res = updateElective(id, studentName, prn, subjectName);
        console.log(res);
        return NextResponse.json({
            success: true,
        });
    }catch(error){
        console.log(error);
        return NextResponse.json({
            error: 'Internal server error',
            success: false,
        })
    }
}

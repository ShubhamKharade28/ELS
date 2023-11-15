import { NextResponse } from "next/server";

import { connectDB, closeDB } from '@/utils/db/db.config';
import Elective from "@/utils/models/elective";
import { ObjectId } from "mongodb";

function updateSubjectCount(id,subjectName){
    // Search subject to update it's count
    let filter = {
        _id: new ObjectId(id),
        'students': {
            $elemMatch: {
                name: subjectName,
            }
        }
    };
    
    // Increase count by 1
    let update = {
        $inc: {
            'subjects.$.count': 1,
        }
    };
    let updateRes = Elective.findOneAndUpdate(filter,update);
    return updateRes;
}

function updateElective(id,studentName,prn,subjectName){
    // Search student with name and prn
    let filter = {
        _id: new ObjectId(id),
        'students': {
            $elemMatch: {
                name: { $regex: studentName, options: 'i'},
                prn: prn,
            }
        }
    };
    // Set elective to given subject name and increase count of that subject
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
        // update subject count thorough helper function
        updateSubjectCount(id,subjectName);
    }
    return student;
}

export async function POST(req){
    try {
        // Get query parameters
        req = await req.json();
        const id = req.electiveId;
        const studentName = req.studentName;
        const subjectName = req.subjectName;
        const prn = req.prn;
        
        await connectDB();

        // Update elective through helper function
        let res = updateElective(id, studentName, prn, subjectName);

        await closeDB();

        return NextResponse.json({
            success: true,
        });
    }catch(error){
        console.log(error);
        await closeDB();
        return NextResponse.json({
            error: 'Internal server error',
            success: false,
        })
    }
}

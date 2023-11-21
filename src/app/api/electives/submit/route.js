import { NextResponse } from "next/server";

import { connectDB, closeDB } from '@/utils/db/db.config';
import Elective from "@/utils/models/elective";
import { ObjectId } from "mongodb";



export async function POST(req){
    try {
        // Get query parameters
        req = await req.json();
        const electiveId = req.electiveId;
        const studentName = req.studentName;
        const subjectName = req.subjectName;
        const prn = req.studentPrn;
        
        let db = await connectDB();
        // let cnt = 0;
        // while(!db.isConnected && cnt < 10){
        //     db = await connectDB();
        // }

        // Find elective by ID
        const elective = await Elective.findOne({ _id: new ObjectId(electiveId)});

        if(!elective){
            throw new Error('Elective not found');
        }

        
        const subject = elective.subjects.find((s) => s.name === subjectName);

        if(!subject){
            throw new Error('Subject not found in the elective');
        }

        // Check if the subject has reached the maximum limit
        if(subject.count >= elective.maxLimit){
            throw new Error('Subject has reached the max limit');
        }

        const student = elective.students.find((stu) => stu.prn && stu.prn === prn);

        if(!student){
            console.log(req.prn);
            throw new Error('Non-existing PRN');
        }

        // Check if the student with given prn has already submitted the form
        console.log(req);
        console.log('students', elective.students);
        if(student.elective !== "-"){
            return NextResponse.json({
                success: false,
                error: 'The student has already submitted the form',
            });
        }

        // Check if student has entered his name correctly
        const nameFrags = studentName.split(' ');
        let fragMatched = 0;
        let dbStudentName = student.name;
        dbStudentName = dbStudentName.toLowerCase();
        nameFrags.forEach(frag => {
            frag = frag.toLowerCase();
            if(dbStudentName.includes(frag)){
                fragMatched++;
            }
        });

        if(fragMatched < 2){
            return NextResponse.json({
                success: false,
                error: 'Invalid name or PRN',
            });
        }

        const setElectiveResult = await Elective.updateOne(
            {
                _id: new ObjectId(electiveId),
                'students.name': { $regex: studentName, $options: 'i'},
                'students.prn': prn,
            },
            {
                $set: {
                    'students.$.elective': subjectName,
                },
            }
        );

        let incCountResult;
        if(setElectiveResult.acknowledged){
            incCountResult = await Elective.updateOne(
                {
                    _id: new ObjectId(electiveId),
                    'subjects.name': subjectName,
                },
                {
                    $inc: {
                        count: 1,// Increment the count of students in the elective
                        'subjects.$.count': 1, // Increment the count of the selected subject
                    },
                }
            );
        }

        let res = setElectiveResult.acknowledged && incCountResult.acknowledged;

        console.log(setElectiveResult);
        console.log(incCountResult);

        await closeDB();    

        return NextResponse.json({
            success: res,
        });
    }catch(error){
        console.log(error);
        await closeDB();
        return NextResponse.json({
            error: 'Internal server error',
            success: false,
            errMsg: error,
        })
    }
}

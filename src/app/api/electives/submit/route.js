import { NextResponse } from "next/server";

import client from '@/utils/db/db.config';
import Elective from "@/utils/models/elective";
import { ObjectId } from "mongodb";

export async function POST(req){
    try {
        req = await req.json();
        const id = req.electiveId;
        
        await client.connect();
        let studentExist = await Elective.find({
            _id: new ObjectId(id),
            'students': [
                {
                    name: {
                        $regex: req.studentName, $options: 'i'
                    },
                    prn: req.studentPrn,
                }
            ]
        });

        studentExist = await studentExist.toArray();

        console.log(studentExist);

        if(studentExist.length == 0){
            client.close();
            return NextResponse.json({
                error: 'Invalid credentials'
            })
        }

        const newStudent = {
            name: req.studentName,
            prn: req.studentPrn,
        }

        const filter = {
            _id: new ObjectId(id),
            "subjects.name": req.subjectName,
        };

        const arrayFilters = [
            {
                "subject.name": req.subjectName
            }
        ];

        const options = { new: true, arrayFilters};

        const update = {
            $push: {
                "subjects.$[subject].students": newStudent
            },
            $inc: {
                "subjects.$[subject].count" : 1
            }
        };

        let updateElective = await Elective.findOneAndUpdate(
            filter,
            update,
            options,
        )

        client.close();

        return NextResponse.json(updateElective);
    }catch(error){
        console.log(error);
        return NextResponse.json({
            error: 'Internal server error'
        })
    }
}
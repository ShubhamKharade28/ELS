import { NextResponse } from "next/server";

import client from '@/utils/db/db.config';
import Elective from "@/utils/models/elective";
import { ObjectId } from "mongodb";

export async function POST(req){
    try {
        req = await req.json();
        const id = req.electiveId;
        
        await client.connect();
        let studentExist = await Elective.findOne({
            _id: new ObjectId(id),
            'students': {
                $elemMatch: {
                    name: {
                        $regex: req.studentName, $options: 'i'
                    },
                    prn: req.studentPrn,
                }
            }
        });


        if(!studentExist){
            client.close();
            return NextResponse.json({
                error: 'Invalid credentials',
                success: false,
            })
        }

        const newStudent = {
            name: req.studentName,
            prn: req.studentPrn,
        }

        let studentEnrolled = await Elective.findOne({
            _id: new ObjectId(id),
            'subjects': {
                $elemMatch: {
                    'students': {
                        $elemMatch: {
                            prn: req.studentPrn,
                        }
                    }
                }
            }
        });

        if(studentEnrolled){
            client.close();
            return NextResponse.json({
                success: false,
                error: 'Student already enrolled'
            });
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
            },
            $inc: {
                "count": 1
            }
        };

        let updateElective = await Elective.findOneAndUpdate(
            filter,
            update,
            options,
        );

        
        if(!updateElective){
            client.close();
            return NextResponse.json({
                error: 'Uknown error while submitting response',
                success: false,
            })
        }


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

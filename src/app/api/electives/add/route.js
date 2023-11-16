import { connectDB, closeDB } from "@/utils/db/db.config";
import { NextResponse } from "next/server";
import Elective from "@/utils/models/elective";

export async function POST(req){
    try{
        req = await req.json();
        console.log(req);
        if(!req.title || !req.adminId || !req.subjects){
            return NextResponse.json({
                error: 'SERVER Error : Invalid credentials'
            }, { status: 422 });
        }
        
        if(req.subjects.length == 0){
            return NextResponse.json({
                error: 'SERVER Error : Empty subject list',
            }, { status: 422 });
        }

        const subjects = req.subjects;
        let subjectList = [];
        
        subjects.forEach(subject => {
            subjectList.push({
                name: subject,
                count: 0,
            });
        });

        let students = [{ name: String, prn: String, elective: String}];
        req.students.forEach(element => {
            let student = {
                name: element.name,
                prn: toString(element.prn),
                elective: "-"
            }
            students.push(student);
        });

        let maxLimit = Math.floor(req.students.length / subjects.length) + (req.students.length % subjects.length);

        let newElective = {
            title: req.title,
            adminId: req.adminId,
            subjects: subjectList,
            students: students,
            count: 0,
            maxLimit: maxLimit,
        };

        await connectDB();
        
        let res = await Elective.insertOne(newElective);

        await closeDB();
        return NextResponse.json(res);

    }catch(error){
        console.log(error);
        closeDB();
        return NextResponse.json({
            error: 'Server Error : Network Connection Error',
        }, { status: 404});
    }
}
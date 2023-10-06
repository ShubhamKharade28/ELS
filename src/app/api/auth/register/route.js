import mongoose from "mongoose";
import Admin from "@/utils/models/admin";
import { connectionStr } from "@/utils/db/db.config";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req){
    try {
        req = await req.json();
        await mongoose.connect(connectionStr);

        if(!req.name || !req.email || !req.password){
            return NextResponse.json({
                error: 'INVALID_CREDENTIALS'
            });
        }

        let exist = await Admin.findOne({ email: req.email});
        if(exist){
            return NextResponse.json({
                error: 'EXISTING_EMAIL'
            });
        }

        const hashedPass = await bcrypt.hash(req.password, 10);

        const newAdmin = new Admin({
            name: req.name,
            email: req.email,
            password: hashedPass,
        });

        await newAdmin.save();
        return NextResponse.json(newAdmin);
    }
    catch(error){
        return NextResponse.json({
            error:error
        });
    }
}
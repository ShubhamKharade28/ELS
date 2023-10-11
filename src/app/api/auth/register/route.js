
import Admin from "@/utils/models/admin";
import client from "@/utils/db/db.config";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req){
    try {
        req = await req.json();
        await client.connect();

        if(!req.name || !req.email || !req.password){
            client.close();
            return NextResponse.json({
                error: 'INVALID_CREDENTIALS'
            });
        }

        let exist = await Admin.findOne({ email: req.email});
        if(exist){
            client.close();
            return NextResponse.json({
                error: 'EXISTING_EMAIL'
            });
        }

        const hashedPass = await bcrypt.hash(req.password, 10);

        const newAdmin = {
            name: req.name,
            email: req.email,
            password: hashedPass,
        };

        const res = await Admin.insertOne(newAdmin);
        client.close();
        return NextResponse.json({
            acknoledged: res.acknowledged,
            adminId: res.insertedId,
        });
    }
    catch(error){
        client.close();
        return NextResponse.json({
            error:error
        });
    }
}